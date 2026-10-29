import * as React from 'react';

import { Combobox, type ComboboxOption } from '@/components/ui/combobox';

export interface NewsBookOption {
    id: number;
    title: string;
    volume: number;
    publisher?: { id: number; name: string } | null;
    msrp?: number | string | null;
}

interface NewsBookSelectProps {
    id?: string;
    value: string | number;
    onChange: (value: string) => void;
    books: NewsBookOption[];
    placeholder?: string;
    /** Label opsi "kosong". Kosongkan untuk menyembunyikan opsi ini. */
    emptyOptionLabel?: string;
    disabled?: boolean;
    className?: string;
    'aria-invalid'?: boolean;
}

/** Batas opsi yang dirender sekaligus. Katalog bisa ribuan baris. */
const RENDER_LIMIT = 50;

const buildBookLabel = (book: NewsBookOption): string => {
    const publisher = book.publisher?.name ? ` (${book.publisher.name})` : '';
    const price = book.msrp ? ` - Rp ${Number(book.msrp).toLocaleString('id-ID')}` : '';

    return `${book.title} Vol ${book.volume}${publisher}${price}`;
};

/**
 * Picker buku untuk form berita (menggantikan `<select>` native berisi seluruh
 * katalog). Filtering dilakukan di sisi klien memakai prop `books` yang sudah
 * dikirim controller, jadi tidak perlu endpoint async baru.
 */
export function NewsBookSelect({
    id,
    value,
    onChange,
    books,
    placeholder = 'Pilih buku dari katalog',
    emptyOptionLabel,
    disabled = false,
    className,
    'aria-invalid': ariaInvalid,
}: NewsBookSelectProps) {
    const [query, setQuery] = React.useState('');

    const options = React.useMemo<ComboboxOption[]>(() => {
        const needle = query.trim().toLowerCase();

        return books
            .filter((book) => {
                if (needle === '') return true;

                return `${book.title} ${book.volume} ${book.publisher?.name ?? ''}`
                    .toLowerCase()
                    .includes(needle);
            })
            .slice(0, RENDER_LIMIT)
            .map((book) => ({ value: String(book.id), label: buildBookLabel(book) }));
    }, [books, query]);

    // Label pilihan aktif dihitung dari `books`, supaya tetap tampil walau hasil
    // filter saat ini tidak memuat buku yang sedang terpilih.
    const selectedLabel = React.useMemo(() => {
        if (value === '' || value === undefined || value === null) return null;

        const selected = books.find((book) => String(book.id) === String(value));

        return selected ? buildBookLabel(selected) : null;
    }, [books, value]);

    const hint = React.useMemo(() => {
        if (books.length <= RENDER_LIMIT || query.trim() !== '') return undefined;

        return `Menampilkan ${RENDER_LIMIT} dari ${books.length} buku — ketik untuk menyaring.`;
    }, [books.length, query]);

    return (
        <Combobox
            id={id}
            value={value === '' || value === undefined || value === null ? '' : String(value)}
            onChange={onChange}
            options={options}
            query={query}
            onQueryChange={setQuery}
            selectedLabel={selectedLabel}
            placeholder={placeholder}
            searchPlaceholder="Cari judul buku, volume, atau penerbit..."
            emptyOptionLabel={emptyOptionLabel}
            emptyMessage="Buku tidak ditemukan."
            hint={hint}
            disabled={disabled}
            aria-invalid={ariaInvalid}
            className={className}
        />
    );
}
