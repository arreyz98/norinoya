import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface FilterComboboxOption {
    value: string;
    label: string;
}

interface FilterComboboxProps {
    value: string;
    selectedLabel?: string | null;
    allLabel: string;
    placeholder: string;
    type: 'series' | 'publisher';
    onChange: (value: string) => void;
    className?: string;
}

export default function FilterCombobox({
    value,
    selectedLabel,
    allLabel,
    placeholder,
    type,
    onChange,
    className,
}: FilterComboboxProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState<FilterComboboxOption[]>([]);
    const [labels, setLabels] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (selectedLabel && value && value !== 'all') {
            setLabels((prev) => (prev[value] === selectedLabel ? prev : { ...prev, [value]: selectedLabel }));
        }
    }, [selectedLabel, value]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const term = query.trim();
        const controller = new AbortController();
        abortRef.current?.abort();
        abortRef.current = controller;

        const timer = window.setTimeout(
            () => {
                setLoading(true);

                const url = new URL(route('admin.books.filter-options'), window.location.origin);
                url.searchParams.set('type', type);

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
                    .then((payload: { data?: FilterComboboxOption[] }) => {
                        const items = Array.isArray(payload.data) ? payload.data : [];

                        setOptions(items);
                        setLabels((prev) => {
                            const next = { ...prev };

                            for (const item of items) {
                                next[item.value] = item.label;
                            }

                            return next;
                        });
                    })
                    .catch(() => undefined)
                    .finally(() => {
                        if (!controller.signal.aborted) {
                            setLoading(false);
                        }
                    });
            },
            term === '' ? 0 : 300,
        );

        return () => {
            window.clearTimeout(timer);
            controller.abort();
        };
    }, [open, query, type]);

    const close = () => {
        setOpen(false);
        setQuery('');
    };

    const activeLabel = value && value !== 'all' ? (labels[value] ?? selectedLabel ?? placeholder) : allLabel;

    return (
        <Popover
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);

                if (!nextOpen) {
                    setQuery('');
                }
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'h-9 w-full cursor-pointer justify-between px-3 text-xs font-medium sm:w-[190px]',
                        (!value || value === 'all') && 'text-muted-foreground',
                        className,
                    )}
                >
                    <span className="truncate">{activeLabel}</span>
                    <ChevronsUpDown className="ml-2 size-3.5 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
                <Command shouldFilter={false}>
                    <CommandInput placeholder={placeholder} value={query} onValueChange={setQuery} />

                    <CommandList>
                        {loading ? (
                            <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
                                <Loader2 className="size-3.5 animate-spin" />
                                <span>Memuat...</span>
                            </div>
                        ) : (
                            <>
                                {options.length === 0 && (
                                    <div className="py-4 text-center text-xs text-muted-foreground">
                                        Tidak ada hasil.
                                    </div>
                                )}

                                <CommandItem
                                    value="all"
                                    onSelect={() => {
                                        onChange('all');
                                        close();
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 size-3.5',
                                            !value || value === 'all' ? 'opacity-100' : 'opacity-0',
                                        )}
                                    />
                                    <span>{allLabel}</span>
                                </CommandItem>

                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => {
                                            onChange(option.value);
                                            close();
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 size-3.5',
                                                value === option.value ? 'opacity-100' : 'opacity-0',
                                            )}
                                        />
                                        <span className="truncate">{option.label}</span>
                                    </CommandItem>
                                ))}
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
