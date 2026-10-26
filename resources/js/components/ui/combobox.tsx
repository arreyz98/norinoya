import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
    value: string;
    label: string;
}

export interface ComboboxProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: ComboboxOption[];
    query: string;
    onQueryChange: (query: string) => void;
    /** Label pilihan aktif bila tidak ada di dalam `options` (mis. hasil async). */
    selectedLabel?: string | null;
    /** Dipanggil setiap popover dibuka/ditutup, untuk memicu fetch di mode async. */
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    /** Label untuk opsi "kosong". Kosongkan untuk menyembunyikan opsi ini. */
    emptyOptionLabel?: string;
    emptyMessage?: string;
    loading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
    /** Teks bantuan di bawah daftar, mis. "Menampilkan 50 dari 300". */
    hint?: string;
    disabled?: boolean;
    className?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    'aria-describedby'?: string;
}

// cmdk mengabaikan item dengan value kosong, jadi opsi "kosong" butuh value sentinel.
const EMPTY_OPTION_VALUE = '__none__';

/**
 * Combobox single-select tanpa logika data.
 *
 * Filtering sepenuhnya milik pemanggil (`options` sudah terfilter + `query`
 * dikendalikan dari luar) supaya komponen ini bisa dipakai untuk daftar lokal
 * maupun hasil pencarian async tanpa menduplikasi logika.
 */
export function Combobox({
    id,
    value,
    onChange,
    options,
    query,
    onQueryChange,
    selectedLabel: selectedLabelProp,
    onOpenChange: onOpenChangeProp,
    placeholder = 'Pilih opsi',
    searchPlaceholder = 'Cari...',
    emptyOptionLabel,
    emptyMessage = 'Tidak ada hasil ditemukan.',
    loading = false,
    hasMore = false,
    onLoadMore,
    hint,
    disabled = false,
    className,
    'aria-invalid': ariaInvalid,
    'aria-required': ariaRequired,
    'aria-describedby': ariaDescribedBy,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            onQueryChange('');
        }

        onOpenChangeProp?.(nextOpen);
    };

    const handleSelect = (nextValue: string) => {
        onChange(nextValue);
        handleOpenChange(false);
    };

    const selectedLabel = React.useMemo(() => {
        if (selectedLabelProp) {
            return selectedLabelProp;
        }

        const selected = options.find((option) => option.value === value);

        if (selected) {
            return selected.label;
        }

        return value === '' && emptyOptionLabel ? emptyOptionLabel : null;
    }, [emptyOptionLabel, options, selectedLabelProp, value]);

    // Opsi "kosong" hanya muncul saat pencarian masih kosong, supaya Enter
    // setelah mengetik tidak mungkin tanpa sengaja mengosongkan pilihan.
    const showEmptyOption = Boolean(emptyOptionLabel) && query.trim() === '';

    // Spinner penuh hanya untuk pemuatan pertama; saat "muat lebih banyak"
    // daftar lama tetap tampil agar tidak berkedip.
    const showInitialLoading = loading && options.length === 0;

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-invalid={ariaInvalid}
                    aria-required={ariaRequired}
                    aria-describedby={ariaDescribedBy}
                    disabled={disabled}
                    className={cn(
                        'h-10 w-full justify-between px-3 py-2 font-normal aria-invalid:border-destructive',
                        className,
                    )}
                >
                    <span className={cn('truncate', selectedLabel === null && 'text-muted-foreground')}>
                        {selectedLabel ?? placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-48 p-0">
                <Command shouldFilter={false}>
                    <CommandInput placeholder={searchPlaceholder} value={query} onValueChange={onQueryChange} />

                    <CommandList>
                        {showInitialLoading ? (
                            <div className="text-muted-foreground flex items-center justify-center gap-2 py-4 text-sm">
                                <Loader2 className="size-4 animate-spin" />
                                <span>Memuat...</span>
                            </div>
                        ) : (
                            <>
                                {options.length === 0 && (
                                    <div className="text-muted-foreground py-4 text-center text-sm">{emptyMessage}</div>
                                )}

                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => handleSelect(option.value)}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 size-4',
                                                value === option.value ? 'opacity-100' : 'opacity-0',
                                            )}
                                        />
                                        <span className="truncate">{option.label}</span>
                                    </CommandItem>
                                ))}

                                {/* Ditaruh paling bawah supaya Enter tanpa navigasi
                                    memilih opsi pertama, bukan mengosongkan pilihan. */}
                                {showEmptyOption && (
                                    <CommandItem value={EMPTY_OPTION_VALUE} onSelect={() => handleSelect('')}>
                                        <Check
                                            className={cn('mr-2 size-4', value === '' ? 'opacity-100' : 'opacity-0')}
                                        />
                                        <span className="text-muted-foreground">{emptyOptionLabel}</span>
                                    </CommandItem>
                                )}
                            </>
                        )}
                    </CommandList>

                    {loading && options.length > 0 && (
                        <div className="text-muted-foreground flex items-center justify-center gap-2 border-t px-3 py-2 text-xs">
                            <Loader2 className="size-3.5 animate-spin" />
                            <span>Memuat...</span>
                        </div>
                    )}

                    {!loading && hasMore && onLoadMore && (
                        <div className="border-t p-1">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-full"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={onLoadMore}
                            >
                                Muat lebih banyak
                            </Button>
                        </div>
                    )}

                    {!loading && hint && <p className="text-muted-foreground border-t px-3 py-2 text-xs">{hint}</p>}
                </Command>
            </PopoverContent>
        </Popover>
    );
}
