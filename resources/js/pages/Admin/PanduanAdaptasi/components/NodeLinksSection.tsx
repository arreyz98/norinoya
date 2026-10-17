import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { FieldError } from './FieldError';
import type { EnumOption, PanduanFormLink } from './panduan-form-types';
import type { ValidationErrors } from './panduan-form-utils';

interface NodeLinksSectionProps {
    nodeIndex: number;
    links: PanduanFormLink[];
    linkCategories: EnumOption[];
    linkStatuses: EnumOption[];
    errors: ValidationErrors;
    addLink: () => void;
    removeLink: (linkIndex: number) => void;
    updateLink: (linkIndex: number, field: keyof PanduanFormLink, value: string) => void;
}

const MAX_LINKS = 20;

const fieldClass =
    'bg-white! border-neutral-300! text-neutral-900 focus-visible:border-emerald-600 focus-visible:ring-1 focus-visible:ring-emerald-600 dark:bg-[#090b0f]! dark:border-[#1f2633]! dark:text-white dark:focus-visible:border-emerald-500 dark:focus-visible:ring-emerald-500';

const selectClass =
    'bg-white! border-neutral-300! text-neutral-900 focus-visible:border-emerald-600 focus-visible:ring-1 focus-visible:ring-emerald-600 dark:bg-[#13171f]! dark:border-[#1f2633]! dark:text-white dark:focus-visible:border-emerald-500 dark:focus-visible:ring-emerald-500';

const addBtnClass =
    'inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-all hover:border-emerald-600 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:border-emerald-600 dark:hover:bg-emerald-900/60';

const linkDeleteClass =
    'inline-flex h-[39px] w-[39px] items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 transition-all hover:border-rose-600 hover:bg-rose-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 dark:border-rose-800/40 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:border-rose-600 dark:hover:bg-rose-600 dark:hover:text-white';

export default function NodeLinksSection({
    nodeIndex,
    links,
    linkCategories,
    linkStatuses,
    errors,
    addLink,
    removeLink,
    updateLink,
}: NodeLinksSectionProps) {
    const [linkToDelete, setLinkToDelete] = useState<number | null>(null);

    return (
        <section className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5 dark:border-[#1f2633] dark:bg-[#0f1219]/70">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="h-3.5 w-1.5 rounded-full bg-emerald-500" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-slate-300">
                        Link ({links.length})
                    </h3>
                </div>
                <button
                    type="button"
                    onClick={addLink}
                    disabled={links.length >= MAX_LINKS}
                    className={addBtnClass}
                >
                    <Plus className="size-3.5" />
                    Tambah Link
                </button>
            </div>

            {links.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center dark:border-slate-800 dark:bg-[#090b0f]/50">
                    <p className="text-xs text-neutral-500 dark:text-slate-400">
                        Belum ada link untuk node ini.
                    </p>
                </div>
            ) : (
                links.map((link, linkIndex) => (
                    <div
                        key={linkIndex}
                        className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-[#1f2633] dark:bg-[#090b0f]"
                    >
                        <FieldError field={`nodes.${nodeIndex}.links.${linkIndex}.id`} errors={errors} />

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.links.${linkIndex}.category`}
                                    className="block text-xs font-medium text-neutral-700 dark:text-slate-300"
                                >
                                    Kategori
                                </label>
                                <Select
                                    value={link.category}
                                    onValueChange={(value) => updateLink(linkIndex, 'category', value)}
                                >
                                    <SelectTrigger
                                        id={`nodes.${nodeIndex}.links.${linkIndex}.category`}
                                        className={selectClass}
                                    >
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {linkCategories.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldError
                                    field={`nodes.${nodeIndex}.links.${linkIndex}.category`}
                                    errors={errors}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.links.${linkIndex}.platform_name`}
                                    className="block text-xs font-medium text-neutral-700 dark:text-slate-300"
                                >
                                    Nama Platform
                                </label>
                                <Input
                                    id={`nodes.${nodeIndex}.links.${linkIndex}.platform_name`}
                                    value={link.platform_name}
                                    onChange={(event) =>
                                        updateLink(linkIndex, 'platform_name', event.target.value)
                                    }
                                    placeholder="Netflix Indonesia"
                                    className={fieldClass}
                                />
                                <FieldError
                                    field={`nodes.${nodeIndex}.links.${linkIndex}.platform_name`}
                                    errors={errors}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.links.${linkIndex}.title`}
                                    className="block text-xs font-medium text-neutral-700 dark:text-slate-300"
                                >
                                    Judul Link <span className="font-normal text-neutral-400 dark:text-slate-500">(opsional)</span>
                                </label>
                                <Input
                                    id={`nodes.${nodeIndex}.links.${linkIndex}.title`}
                                    value={link.title ?? ''}
                                    onChange={(event) => updateLink(linkIndex, 'title', event.target.value)}
                                    placeholder="Ani-One Asia"
                                    className={fieldClass}
                                />
                                <FieldError
                                    field={`nodes.${nodeIndex}.links.${linkIndex}.title`}
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4 sm:flex-row sm:items-end dark:border-[#1f2633]/50">
                            <div className="w-full space-y-1.5 sm:w-48 sm:shrink-0">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.links.${linkIndex}.status`}
                                    className="block text-xs font-medium text-neutral-700 dark:text-slate-300"
                                >
                                    Akses
                                </label>
                                <Select
                                    value={link.status}
                                    onValueChange={(value) => updateLink(linkIndex, 'status', value)}
                                >
                                    <SelectTrigger
                                        id={`nodes.${nodeIndex}.links.${linkIndex}.status`}
                                        className={selectClass}
                                    >
                                        <SelectValue placeholder="Pilih akses" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {linkStatuses.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldError
                                    field={`nodes.${nodeIndex}.links.${linkIndex}.status`}
                                    errors={errors}
                                />
                            </div>

                            <div className="flex-1 space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.links.${linkIndex}.url`}
                                    className="block text-xs font-medium text-neutral-700 dark:text-slate-300"
                                >
                                    URL
                                </label>
                                <Input
                                    id={`nodes.${nodeIndex}.links.${linkIndex}.url`}
                                    type="url"
                                    value={link.url}
                                    onChange={(event) => updateLink(linkIndex, 'url', event.target.value)}
                                    placeholder="https://..."
                                    className={fieldClass}
                                />
                                <FieldError
                                    field={`nodes.${nodeIndex}.links.${linkIndex}.url`}
                                    errors={errors}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => setLinkToDelete(linkIndex)}
                                aria-label="Hapus link"
                                className={linkDeleteClass}
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    </div>
                ))
            )}

            <FieldError field={`nodes.${nodeIndex}.links`} errors={errors} />

            <AlertDialog
                open={linkToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setLinkToDelete(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus link ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Link akan dihapus dari node. Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => {
                                if (linkToDelete !== null) {
                                    removeLink(linkToDelete);
                                }

                                setLinkToDelete(null);
                            }}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
