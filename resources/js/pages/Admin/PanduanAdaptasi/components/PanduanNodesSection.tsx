import { GitBranch, Plus, Tag, Trash2, X } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import BookPicker from './BookPicker';
import { FieldError } from './FieldError';
import NodeLinksSection from './NodeLinksSection';
import type { EnumOption, PanduanFormLink, PanduanFormNode } from './panduan-form-types';
import type { ValidationErrors } from './panduan-form-utils';

interface PanduanNodesSectionProps {
    nodes: PanduanFormNode[];
    linkCategories: EnumOption[];
    linkStatuses: EnumOption[];
    errors: ValidationErrors;
    addNode: () => void;
    removeNode: (nodeIndex: number) => void;
    updateNode: (nodeIndex: number, field: keyof PanduanFormNode, value: unknown) => void;
    changeNodeSeries: (nodeIndex: number, value: string) => void;
    addLink: (nodeIndex: number) => void;
    removeLink: (nodeIndex: number, linkIndex: number) => void;
    updateLink: (nodeIndex: number, linkIndex: number, field: keyof PanduanFormLink, value: string) => void;
    addTag: (nodeIndex: number) => void;
    removeTag: (nodeIndex: number, tagIndex: number) => void;
    updateTag: (nodeIndex: number, tagIndex: number, field: 'label' | 'tone', value: string) => void;
}

const MAX_NODES = 50;
const MAX_TAGS = 5;

const fieldClass =
    'bg-white! border-neutral-300! text-neutral-900 focus-visible:border-emerald-600 focus-visible:ring-1 focus-visible:ring-emerald-600 dark:bg-[#090b0f]! dark:border-[#1f2633]! dark:text-white dark:focus-visible:border-emerald-500 dark:focus-visible:ring-emerald-500';

const selectClass =
    'bg-white! border-neutral-300! text-neutral-900 focus-visible:border-emerald-600 focus-visible:ring-1 focus-visible:ring-emerald-600 dark:bg-[#13171f]! dark:border-[#1f2633]! dark:text-white dark:focus-visible:border-emerald-500 dark:focus-visible:ring-emerald-500';

const addBtnClass =
    'inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-all hover:border-emerald-600 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:border-emerald-600 dark:hover:bg-emerald-900/60';

const deleteBtnClass =
    'inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 transition-all hover:border-rose-600 hover:bg-rose-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 dark:border-rose-800/40 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:border-rose-600 dark:hover:bg-rose-600 dark:hover:text-white';

const subSectionClass =
    'space-y-3.5 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5 dark:border-[#1f2633] dark:bg-[#0f1219]/70';

const subHeadingClass =
    'text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-slate-300';

export default function PanduanNodesSection({
    nodes,
    linkCategories,
    linkStatuses,
    errors,
    addNode,
    removeNode,
    updateNode,
    changeNodeSeries,
    addLink,
    removeLink,
    updateLink,
    addTag,
    removeTag,
    updateTag,
}: PanduanNodesSectionProps) {
    const [nodeToDelete, setNodeToDelete] = useState<number | null>(null);

    return (
        <div className="space-y-5">
            <FieldError field="nodes" errors={errors} />

            {nodes.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-8 text-center dark:border-slate-800 dark:bg-[#090b0f]/50">
                    <GitBranch className="mx-auto mb-2 size-8 text-neutral-400 dark:text-slate-600" />
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                        Belum ada node timeline
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-slate-400">
                        Tambahkan node pertama untuk memulai menyusun adaptasi.
                    </p>
                </div>
            ) : (
                nodes.map((node, nodeIndex) => (
                <div
                    key={nodeIndex}
                    className="relative space-y-6 overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 shadow-xl sm:p-7 dark:border-[#1f2633] dark:bg-[#13171f]"
                >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500/80 via-emerald-400/40 to-transparent" />

                    {/* Card top bar */}
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-[#1f2633]/80">
                        <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                                {nodeIndex + 1}
                            </div>
                            <div>
                                <h2 className="text-base font-semibold tracking-wide text-neutral-900 dark:text-white">
                                    Node {nodeIndex + 1}
                                </h2>
                                <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-slate-400">
                                    Konfigurasi data tayang, sumber adaptasi, dan pranala streaming
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setNodeToDelete(nodeIndex)}
                            aria-label={`Hapus node ${nodeIndex + 1}`}
                            className={deleteBtnClass}
                        >
                            <Trash2 className="size-4" />
                            <span className="hidden sm:inline">Hapus</span>
                        </button>
                    </div>

                    {/* General node inputs */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.title`}
                                    className="block text-xs font-medium text-neutral-700 dark:text-slate-300"
                                >
                                    Judul Node <span className="text-rose-500 dark:text-rose-400">*</span>
                                </label>
                                <Input
                                    id={`nodes.${nodeIndex}.title`}
                                    value={node.title}
                                    onChange={(event) => updateNode(nodeIndex, 'title', event.target.value)}
                                    placeholder="Musim 1: Permulaan Ziarah & Pengembaraan Utara"
                                    className={fieldClass}
                                />
                                <FieldError field={`nodes.${nodeIndex}.title`} errors={errors} />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.studio`}
                                    className="block text-xs font-medium text-neutral-700 dark:text-slate-300"
                                >
                                    Nama Studio <span className="font-normal text-neutral-400 dark:text-slate-500">(opsional)</span>
                                </label>
                                <Input
                                    id={`nodes.${nodeIndex}.studio`}
                                    value={node.studio ?? ''}
                                    onChange={(event) => updateNode(nodeIndex, 'studio', event.target.value)}
                                    placeholder="Studio Madhouse"
                                    className={fieldClass}
                                />
                                <FieldError field={`nodes.${nodeIndex}.studio`} errors={errors} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
                            <BookPicker
                                className="md:col-span-2"
                                idPrefix={`nodes.${nodeIndex}`}
                                seriesId={node.book_series_id}
                                seriesLabel={node.book_series_label ?? null}
                                bookId={node.book_id}
                                bookLabel={node.book_label ?? null}
                                bookVolume={node.book_volume}
                                onSeriesChange={(value) => changeNodeSeries(nodeIndex, value)}
                                onBookChange={(value) => updateNode(nodeIndex, 'book_id', value)}
                                errors={errors}
                            />

                            <div className="md:pt-5">
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 transition-colors dark:border-[#1f2633] dark:bg-[#090b0f]">
                                    <Checkbox
                                        checked={node.is_upcoming}
                                        onCheckedChange={(checked) =>
                                            updateNode(nodeIndex, 'is_upcoming', checked === true)
                                        }
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-neutral-800 dark:text-slate-200">
                                            Segera Hadir (node belum tayang)
                                        </span>
                                        <span className="text-[10px] text-neutral-500 dark:text-slate-500">
                                            Tampilkan label penanda countdown di kartu publik
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.description`}
                                    className="block text-xs font-medium text-neutral-700 dark:text-slate-300"
                                >
                                    Deskripsi
                                </label>
                                <span className="text-[11px] text-neutral-400 dark:text-slate-500">
                                    Mendukung ringkasan sinopsis dan pengantar arc
                                </span>
                            </div>
                            <Textarea
                                id={`nodes.${nodeIndex}.description`}
                                rows={3}
                                value={node.description ?? ''}
                                onChange={(event) => updateNode(nodeIndex, 'description', event.target.value)}
                                placeholder="Deskripsi singkat node ini..."
                                className={`${fieldClass} resize-y leading-relaxed`}
                            />
                            <FieldError field={`nodes.${nodeIndex}.description`} errors={errors} />
                        </div>
                    </div>

                    {/* Adaptasi Buku */}
                    <section className={subSectionClass}>
                        <div className="flex items-center gap-2">
                            <span className="h-3.5 w-1.5 rounded-full bg-emerald-500" />
                            <h3 className={subHeadingClass}>Adaptasi Buku</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.adaptation_label`}
                                    className="block text-xs font-medium text-neutral-600 dark:text-slate-400"
                                >
                                    Label
                                </label>
                                <Input
                                    id={`nodes.${nodeIndex}.adaptation_label`}
                                    value={node.adaptation_label ?? ''}
                                    onChange={(event) =>
                                        updateNode(nodeIndex, 'adaptation_label', event.target.value)
                                    }
                                    placeholder="Adaptasi Buku"
                                    className={fieldClass}
                                />
                                <FieldError field={`nodes.${nodeIndex}.adaptation_label`} errors={errors} />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.adaptation_range`}
                                    className="block text-xs font-medium text-neutral-600 dark:text-slate-400"
                                >
                                    Rentang Volume
                                </label>
                                <Input
                                    id={`nodes.${nodeIndex}.adaptation_range`}
                                    value={node.adaptation_range ?? ''}
                                    onChange={(event) =>
                                        updateNode(nodeIndex, 'adaptation_range', event.target.value)
                                    }
                                    placeholder="Volume 1 s/d Volume 4"
                                    className={fieldClass}
                                />
                                <FieldError field={`nodes.${nodeIndex}.adaptation_range`} errors={errors} />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor={`nodes.${nodeIndex}.adaptation_chapters`}
                                    className="block text-xs font-medium text-neutral-600 dark:text-slate-400"
                                >
                                    Keterangan Bab
                                </label>
                                <Input
                                    id={`nodes.${nodeIndex}.adaptation_chapters`}
                                    value={node.adaptation_chapters ?? ''}
                                    onChange={(event) =>
                                        updateNode(nodeIndex, 'adaptation_chapters', event.target.value)
                                    }
                                    placeholder="(Bab 1 — 34)"
                                    className={fieldClass}
                                />
                                <FieldError field={`nodes.${nodeIndex}.adaptation_chapters`} errors={errors} />
                            </div>
                        </div>
                    </section>

                    {/* Chip Tag */}
                    <section className={subSectionClass}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-3.5 w-1.5 rounded-full bg-emerald-500" />
                                <h3 className={subHeadingClass}>Chip Tag ({node.tags.length})</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => addTag(nodeIndex)}
                                disabled={node.tags.length >= MAX_TAGS}
                                className={addBtnClass}
                            >
                                <Plus className="size-3.5" />
                                Tambah Tag
                            </button>
                        </div>

                        {node.tags.length === 0 ? (
                            <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center dark:border-slate-800 dark:bg-[#090b0f]/50">
                                <Tag className="mx-auto mb-1.5 size-6 text-neutral-400 dark:text-slate-600" />
                                <p className="text-xs text-neutral-500 dark:text-slate-400">Belum ada chip tag.</p>
                                <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-slate-600">
                                    Tambahkan badge kata kunci seperti arc cerita atau jumlah episode
                                </p>
                            </div>
                        ) : (
                            node.tags.map((tag, tagIndex) => (
                                <div key={tagIndex} className="flex items-start gap-2">
                                    <div className="flex-1 space-y-1.5">
                                        <Input
                                            value={tag.label}
                                            onChange={(event) =>
                                                updateTag(nodeIndex, tagIndex, 'label', event.target.value)
                                            }
                                            placeholder="Manga Lanjutan (Belum Diadaptasi)"
                                            className={fieldClass}
                                        />
                                        <FieldError
                                            field={`nodes.${nodeIndex}.tags.${tagIndex}.label`}
                                            errors={errors}
                                        />
                                    </div>

                                    <div className="w-[150px] space-y-1.5">
                                        <Select
                                            value={tag.tone}
                                            onValueChange={(value) =>
                                                updateTag(nodeIndex, tagIndex, 'tone', value)
                                            }
                                        >
                                            <SelectTrigger className={selectClass}>
                                                <SelectValue placeholder="Warna" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="neutral">Netral</SelectItem>
                                                <SelectItem value="amber">Kuning</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldError
                                            field={`nodes.${nodeIndex}.tags.${tagIndex}.tone`}
                                            errors={errors}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeTag(nodeIndex, tagIndex)}
                                        aria-label="Hapus tag"
                                        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-neutral-700 dark:text-slate-400 dark:hover:border-rose-800 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>
                            ))
                        )}

                        <FieldError field={`nodes.${nodeIndex}.tags`} errors={errors} />
                    </section>

                    {/* Link per node */}
                    <NodeLinksSection
                        nodeIndex={nodeIndex}
                        links={node.links}
                        linkCategories={linkCategories}
                        linkStatuses={linkStatuses}
                        errors={errors}
                        addLink={() => addLink(nodeIndex)}
                        removeLink={(linkIndex) => removeLink(nodeIndex, linkIndex)}
                        updateLink={(linkIndex, field, value) => updateLink(nodeIndex, linkIndex, field, value)}
                    />
                </div>
            ))
            )}

            <AlertDialog
                open={nodeToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setNodeToDelete(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus node ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Seluruh isi node (judul, tag, dan link) akan dihapus. Tindakan ini tidak dapat
                            dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => {
                                if (nodeToDelete !== null) {
                                    removeNode(nodeToDelete);
                                }

                                setNodeToDelete(null);
                            }}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <button
                type="button"
                onClick={addNode}
                disabled={nodes.length >= MAX_NODES}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-dashed border-emerald-500/50 bg-emerald-50/40 px-4 py-4 text-center transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/70 dark:border-emerald-400/50 dark:bg-emerald-950/10 dark:hover:border-emerald-400 dark:hover:bg-emerald-950/25"
            >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/80 bg-emerald-500/10 text-emerald-300">
                    <Plus className="size-3.5" />
                </span>
                <span className="text-sm font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
                    Tambah Node Timeline Berikutnya
                </span>
            </button>
        </div>
    );
}
