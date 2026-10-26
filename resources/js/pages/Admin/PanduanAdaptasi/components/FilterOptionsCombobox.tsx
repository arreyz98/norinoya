import { useCallback, useEffect, useRef, useState } from 'react';

import { Combobox, type ComboboxOption } from '@/components/ui/combobox';

/** Jumlah baris per request (di bawah batas maksimal `limit` di server). */
const PAGE_SIZE = 50;

/** Samakan dengan batas validasi server (`q` => max:100). */
const MAX_QUERY_LENGTH = 100;

interface FilterOptionsPayload {
    data?: ComboboxOption[];
    has_more?: boolean;
}

export interface FilterOptionsComboboxProps {
    /** `series` untuk daftar series, `book` untuk daftar volume. */
    type: 'series' | 'book';
    /** Hanya dipakai saat `type="book"`: batasi hasil ke series ini. */
    seriesId?: string;
    id?: string;
    value: string;
    onChange: (value: string) => void;
    /** Label awal untuk `value` (mis. data dari server di mode edit). */
    selectedLabel?: string | null;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyOptionLabel?: string;
    emptyMessage?: string;
    disabled?: boolean;
    className?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    'aria-describedby'?: string;
}

/**
 * Combobox async generik di atas `admin.books.filter-options`.
 *
 * Semua logika paging ada di sini: debounce 300 ms, abort request lama,
 * akumulasi halaman lewat `offset`, dan tombol "Muat lebih banyak" (dirender
 * oleh `<Combobox>`).
 */
export default function FilterOptionsCombobox({
    type,
    seriesId = '',
    id,
    value,
    onChange,
    selectedLabel,
    placeholder = 'Pilih opsi',
    searchPlaceholder = 'Cari...',
    emptyOptionLabel,
    emptyMessage = 'Tidak ada hasil ditemukan.',
    disabled = false,
    className,
    'aria-invalid': ariaInvalid,
    'aria-required': ariaRequired,
    'aria-describedby': ariaDescribedBy,
}: FilterOptionsComboboxProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [labels, setLabels] = useState<Record<string, string>>(() => (value !== '' && selectedLabel ? { [value]: selectedLabel } : {}));
    const [results, setResults] = useState<ComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const abortRef = useRef<AbortController | null>(null);

    const mergeLabels = useCallback((items: ComboboxOption[]) => {
        setLabels((previous) => {
            let changed = false;
            const next = { ...previous };

            for (const item of items) {
                if (next[item.value] !== item.label) {
                    next[item.value] = item.label;
                    changed = true;
                }
            }

            return changed ? next : previous;
        });
    }, []);

    // Label dari server hanya mengisi value yang belum dikenal. Jangan menimpa
    // label hasil pilihan user (mis. `book_label` lama setelah ganti volume).
    useEffect(() => {
        if (value === '' || !selectedLabel) {
            return;
        }

        setLabels((previous) => (previous[value] !== undefined ? previous : { ...previous, [value]: selectedLabel }));
    }, [selectedLabel, value]);

    // Series/tipe berganti → hasil lama tidak relevan. Abort request yang masih
    // jalan supaya volume dari series sebelumnya tidak sempat tampil.
    useEffect(() => {
        abortRef.current?.abort();
        setResults([]);
        setHasMore(false);
        setLoading(false);
    }, [seriesId, type]);

    const loadPage = useCallback(
        (term: string, offset: number) => {
            abortRef.current?.abort();

            const controller = new AbortController();
            abortRef.current = controller;
            setLoading(true);

            const url = new URL(route('admin.books.filter-options'), window.location.origin);
            url.searchParams.set('type', type);
            url.searchParams.set('limit', String(PAGE_SIZE));
            url.searchParams.set('offset', String(offset));

            if (type === 'book' && seriesId !== '') {
                url.searchParams.set('series_id', seriesId);
            }

            if (term !== '') {
                url.searchParams.set('q', term);
            }

            fetch(url.toString(), {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                signal: controller.signal,
            })
                .then((response) => (response.ok ? response.json() : { data: [] }))
                .then((payload: FilterOptionsPayload) => {
                    const items = Array.isArray(payload.data) ? payload.data : [];

                    setResults((previous) => (offset === 0 ? items : [...previous, ...items]));
                    setHasMore(Boolean(payload.has_more));
                    mergeLabels(items);
                })
                // Abort juga masuk ke `catch`; jangan sentuh state supaya daftar
                // tidak berkedip kosong setiap kali user mengetik.
                .catch(() => undefined)
                .finally(() => {
                    // `abortRef.current === controller` sekaligus menangani popover
                    // ditutup saat request masih jalan, sehingga spinner tidak macet.
                    if (abortRef.current === controller) {
                        setLoading(false);
                    }
                });
        },
        [mergeLabels, seriesId, type],
    );

    useEffect(() => {
        if (!open || disabled) {
            return;
        }

        const term = query.trim().slice(0, MAX_QUERY_LENGTH);
        // Selalu mulai dari offset 0: series/tipe bisa berubah sejak halaman
        // terakhir diambil, jadi offset lama tidak lagi valid.
        const timer = window.setTimeout(() => loadPage(term, 0), term === '' ? 0 : 300);

        return () => {
            window.clearTimeout(timer);
            abortRef.current?.abort();
        };
    }, [disabled, loadPage, open, query, seriesId, type]);

    const handleLoadMore = () => {
        if (loading) {
            return;
        }

        loadPage(query.trim().slice(0, MAX_QUERY_LENGTH), results.length);
    };

    return (
        <Combobox
            id={id}
            value={value}
            onChange={onChange}
            options={results}
            query={query}
            onQueryChange={setQuery}
            onOpenChange={setOpen}
            selectedLabel={value === '' ? null : (labels[value] ?? null)}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            emptyOptionLabel={emptyOptionLabel}
            emptyMessage={emptyMessage}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            disabled={disabled}
            className={className}
            aria-invalid={ariaInvalid}
            aria-required={ariaRequired}
            aria-describedby={ariaDescribedBy}
        />
    );
}
