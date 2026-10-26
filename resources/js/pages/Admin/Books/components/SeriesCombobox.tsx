import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Combobox, type ComboboxOption } from '@/components/ui/combobox';

import { type Option } from './book-form-types';

/**
 * Batas jumlah opsi yang dirender sekaligus di mode inline. Series di atas
 * angka ini tetap bisa dicari, hanya saja daftarnya dipotong agar DOM tidak
 * menampung ratusan node.
 */
const INLINE_RENDER_LIMIT = 50;

/** Jumlah baris per request di mode async. */
const ASYNC_PAGE_SIZE = 50;

interface FilterOptionsPayload {
    data?: ComboboxOption[];
    has_more?: boolean;
}

export interface SeriesComboboxProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    /** Daftar series dari server. Kosong berarti server memilih mode async. */
    options: Option[];
    mode: 'inline' | 'async';
    /** Series yang sedang terpilih (dipakai agar label tampil sebelum fetch). */
    selectedSeries?: { id: number; title: string } | null;
    placeholder?: string;
    className?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    'aria-describedby'?: string;
}

const toOption = (series: Option): ComboboxOption => ({
    value: String(series.id),
    label: series.title || series.name || String(series.id),
});

/**
 * Combobox series dengan dua mode:
 * - `inline`: seluruh series sudah ada di props, filter dilakukan di browser (instan).
 * - `async`: server tidak mengirim daftar, pencarian dilakukan ke endpoint.
 *
 * Mode ditentukan backend lewat `seriesMode`, jadi saat jumlah series melewati
 * batas, form otomatis pindah ke pencarian async tanpa perubahan kode.
 */
export default function SeriesCombobox({
    id,
    value,
    onChange,
    options,
    mode,
    selectedSeries,
    placeholder = 'Pilih series',
    className,
    'aria-invalid': ariaInvalid,
    'aria-required': ariaRequired,
    'aria-describedby': ariaDescribedBy,
}: SeriesComboboxProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [labels, setLabels] = useState<Record<string, string>>(() => {
        const seed: Record<string, string> = {};

        for (const series of options) {
            seed[String(series.id)] = series.title || series.name || String(series.id);
        }

        if (selectedSeries) {
            seed[String(selectedSeries.id)] = selectedSeries.title;
        }

        return seed;
    });
    const [results, setResults] = useState<ComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const abortRef = useRef<AbortController | null>(null);

    const inlineOptions = useMemo(() => options.map(toOption), [options]);

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

    // Label untuk opsi inline + series terpilih, supaya mode edit/duplikat
    // tidak pernah menampilkan id mentah sebelum popover dibuka.
    useEffect(() => {
        if (mode === 'inline') {
            mergeLabels(inlineOptions);
        }
    }, [inlineOptions, mergeLabels, mode]);

    useEffect(() => {
        if (!selectedSeries) {
            return;
        }

        mergeLabels([{ value: String(selectedSeries.id), label: selectedSeries.title }]);
    }, [mergeLabels, selectedSeries]);

    const loadPage = useCallback(
        (term: string, offset: number) => {
            abortRef.current?.abort();

            const controller = new AbortController();
            abortRef.current = controller;
            setLoading(true);

            const url = new URL(route('admin.books.filter-options'), window.location.origin);
            url.searchParams.set('type', 'series');
            url.searchParams.set('limit', String(ASYNC_PAGE_SIZE));
            url.searchParams.set('offset', String(offset));

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
                .catch(() => undefined)
                .finally(() => {
                    if (!controller.signal.aborted) {
                        setLoading(false);
                    }
                });
        },
        [mergeLabels],
    );

    useEffect(() => {
        if (mode !== 'async' || !open) {
            return;
        }

        const term = query.trim();
        const timer = window.setTimeout(() => loadPage(term, 0), term === '' ? 0 : 300);

        return () => {
            window.clearTimeout(timer);
            abortRef.current?.abort();
        };
    }, [loadPage, mode, open, query]);

    const handleLoadMore = () => {
        loadPage(query.trim(), results.length);
    };

    const term = query.trim().toLowerCase();

    const filteredInline = useMemo(
        () => (term === '' ? inlineOptions : inlineOptions.filter((option) => option.label.toLowerCase().includes(term))),
        [inlineOptions, term],
    );

    const visibleOptions = mode === 'inline' ? filteredInline.slice(0, INLINE_RENDER_LIMIT) : results;

    const hint =
        mode === 'inline' && filteredInline.length > INLINE_RENDER_LIMIT
            ? `Menampilkan ${INLINE_RENDER_LIMIT} dari ${filteredInline.length} series — persempit pencarian.`
            : undefined;

    return (
        <Combobox
            id={id}
            value={value}
            onChange={onChange}
            options={visibleOptions}
            query={query}
            onQueryChange={setQuery}
            onOpenChange={setOpen}
            selectedLabel={value === '' ? null : (labels[value] ?? null)}
            emptyOptionLabel="Tidak ada"
            searchPlaceholder="Cari series..."
            placeholder={placeholder}
            loading={mode === 'async' && loading}
            hasMore={mode === 'async' && hasMore}
            onLoadMore={mode === 'async' ? handleLoadMore : undefined}
            hint={hint}
            className={className}
            aria-invalid={ariaInvalid}
            aria-required={ariaRequired}
            aria-describedby={ariaDescribedBy}
        />
    );
}
