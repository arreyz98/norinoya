import { cn } from '@/lib/utils';

import { FieldError } from './FieldError';
import FilterOptionsCombobox from './FilterOptionsCombobox';
import type { ValidationErrors } from './panduan-form-utils';

export interface BookPickerProps {
    /** Prefix id HTML, mis. `nodes.0`. Dipakai untuk `htmlFor` + `aria-describedby`. */
    idPrefix: string;
    seriesId: string;
    bookId: string;
    /** Label series dari server (mode edit) agar trigger terisi sebelum popover dibuka. */
    seriesLabel?: string | null;
    bookLabel?: string | null;
    bookVolume?: string | null;
    onSeriesChange: (value: string) => void;
    onBookChange: (value: string) => void;
    disabled?: boolean;
    errors?: ValidationErrors;
    className?: string;
}

/**
 * Pemilih buku dua tahap: Series dulu, lalu Volume di dalam series tersebut.
 *
 * Buku tanpa series tidak bisa dipilih (keputusan produk). Node lama yang
 * bukunya belum punya series tetap menampilkan buku lamanya + peringatan, dan
 * `book_id` tidak disentuh sampai user memilih series baru.
 *
 * Komponen ini stateless: seluruh pilihan hidup di state form supaya aman
 * terhadap `key={nodeIndex}` (index bergeser saat node dihapus).
 */
export default function BookPicker({
    idPrefix,
    seriesId,
    bookId,
    seriesLabel,
    bookLabel,
    bookVolume,
    onSeriesChange,
    onBookChange,
    disabled = false,
    errors = {},
    className,
}: BookPickerProps) {
    const seriesFieldId = `${idPrefix}.book_series_id`;
    const bookFieldId = `${idPrefix}.book_id`;
    const bookError = errors[bookFieldId];

    const hasSeries = seriesId !== '';
    const isLegacyBook = !hasSeries && bookId !== '';

    return (
        <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}>
            <div className="space-y-1.5">
                <label htmlFor={seriesFieldId} className="block text-xs font-medium text-neutral-700 dark:text-slate-300">
                    Series
                </label>

                <FilterOptionsCombobox
                    id={seriesFieldId}
                    type="series"
                    value={seriesId}
                    selectedLabel={seriesLabel ?? null}
                    placeholder="Pilih series"
                    searchPlaceholder="Cari series..."
                    emptyMessage="Series tidak ditemukan."
                    onChange={onSeriesChange}
                    disabled={disabled}
                />
            </div>

            <div className="space-y-1.5">
                <label htmlFor={bookFieldId} className="block text-xs font-medium text-neutral-700 dark:text-slate-300">
                    Volume
                </label>

                <FilterOptionsCombobox
                    id={bookFieldId}
                    type="book"
                    seriesId={seriesId}
                    value={bookId}
                    selectedLabel={bookVolume ? `Vol. ${bookVolume}` : (bookLabel ?? null)}
                    placeholder={hasSeries ? 'Pilih volume' : 'Pilih series dulu'}
                    searchPlaceholder="Cari volume..."
                    emptyOptionLabel="Tanpa buku"
                    emptyMessage={hasSeries ? 'Volume tidak ditemukan.' : 'Pilih series dulu.'}
                    onChange={onBookChange}
                    disabled={disabled || !hasSeries}
                    aria-invalid={Boolean(bookError)}
                    aria-describedby={bookError ? `${bookFieldId}-error` : undefined}
                />

                <FieldError field={bookFieldId} errors={errors} />

                {isLegacyBook && (
                    <p className="text-[11px] leading-relaxed text-amber-600 dark:text-amber-400">
                        Buku node ini belum punya series. Pilih series untuk menggantinya — buku lama akan dilepas.
                    </p>
                )}
            </div>
        </div>
    );
}
