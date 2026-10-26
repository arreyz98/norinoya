import { FormEvent, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { PanduanNode } from '@/types/panduanAdaptasi';

import { FieldError } from './FieldError';
import PanduanNodesSection from './PanduanNodesSection';
import {
    EMPTY_NODE,
    hasLinkContent,
    hasNodeContent,
    hasTagContent,
    type EnumOption,
    type PanduanFormData,
    type PanduanFormLink,
    type PanduanFormNode,
    type SubmissionMaps,
} from './panduan-form-types';
import {
    isValidUrl,
    normalizeNestedServerErrors,
    type ValidationErrors,
} from './panduan-form-utils';

export interface PanduanFormSubmitPayload {
    title: string;
    description: string;
    nodes: Array<{
        id?: number;
        book_id?: number | null;
        title: string;
        description?: string | null;
        studio?: string | null;
        adaptation_label?: string | null;
        adaptation_range?: string | null;
        adaptation_chapters?: string | null;
        tags: Array<{ label: string; tone: string }>;
        is_upcoming: boolean;
        links: Array<{
            id?: number;
            category: string;
            platform_name: string;
            title?: string | null;
            status: string;
            url: string;
        }>;
    }>;
}

interface PanduanFormProps {
    initialPanduan?: {
        title: string;
        description?: string | null;
        nodes?: PanduanNode[];
    } | null;
    linkCategories: EnumOption[];
    linkStatuses: EnumOption[];
    submitLabel: string;
    processing?: boolean;
    errors?: ValidationErrors;
    onSubmit: (payload: PanduanFormSubmitPayload) => void;
    onCancel?: () => void;
}

const EMPTY_MAPS: SubmissionMaps = { nodes: [], links: {}, tags: {} };

function buildInitialData(initialPanduan?: PanduanFormProps['initialPanduan']): PanduanFormData {
    return {
        title: initialPanduan?.title ?? '',
        description: initialPanduan?.description ?? '',
        nodes: (initialPanduan?.nodes ?? []).map((node) => ({
            id: node.id,
            book_id: node.book_id != null ? String(node.book_id) : '',
            book_label: node.book_label ?? null,
            book_series_id: node.book_series_id != null ? String(node.book_series_id) : '',
            book_series_label: node.book_series_label ?? null,
            book_volume: node.book_volume ?? null,
            title: node.title,
            description: node.description ?? '',
            studio: node.studio ?? '',
            adaptation_label: node.adaptation_label ?? '',
            adaptation_range: node.adaptation_range ?? '',
            adaptation_chapters: node.adaptation_chapters ?? '',
            tags: (node.tags ?? []).map((tag) => ({ label: tag.label, tone: tag.tone })),
            is_upcoming: Boolean(node.is_upcoming),
            links: (node.links ?? []).map((link) => ({
                id: link.id,
                category: link.category ?? 'takarir',
                platform_name: link.platform_name,
                title: link.title ?? '',
                status: link.status ?? 'gratis',
                url: link.url,
            })),
        })),
    };
}

export default function PanduanForm({
    initialPanduan,
    linkCategories,
    linkStatuses,
    submitLabel,
    processing = false,
    errors = {},
    onSubmit,
    onCancel,
}: PanduanFormProps) {
    const [form, setForm] = useState<PanduanFormData>(() => buildInitialData(initialPanduan));
    const [submissionMaps, setSubmissionMaps] = useState<SubmissionMaps>(EMPTY_MAPS);
    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    // Error server di-remap dari index payload → index form (baris kosong dibuang saat submit).
    const normalizedServerErrors = useMemo(
        () => normalizeNestedServerErrors(errors, submissionMaps),
        [errors, submissionMaps],
    );

    const activeErrors = useMemo(
        () => ({ ...normalizedServerErrors, ...localErrors }),
        [normalizedServerErrors, localErrors],
    );

    const clearFieldError = (field: string) => {
        setLocalErrors((previous) => {
            if (!(field in previous)) {
                return previous;
            }

            const next = { ...previous };
            delete next[field];

            return next;
        });
    };

    const clearErrorPrefix = (prefix: string) => {
        setLocalErrors((previous) => {
            const next: ValidationErrors = {};

            for (const [key, value] of Object.entries(previous)) {
                if (!key.startsWith(prefix)) {
                    next[key] = value;
                }
            }

            return next;
        });
    };

    /* ---------------------------------------------------------------- */
    /*  Node handlers                                                    */
    /* ---------------------------------------------------------------- */

    const addNode = () => {
        if (form.nodes.length >= 50) {
            return;
        }

        setForm((previous) => ({ ...previous, nodes: [...previous.nodes, { ...EMPTY_NODE }] }));
    };

    const removeNode = (nodeIndex: number) => {
        clearErrorPrefix('nodes');
        setForm((previous) => ({
            ...previous,
            nodes: previous.nodes.filter((_, index) => index !== nodeIndex),
        }));
    };

    const updateNode = (nodeIndex: number, field: keyof PanduanFormNode, value: unknown) => {
        clearFieldError(`nodes.${nodeIndex}.${field}`);

        setForm((previous) => ({
            ...previous,
            nodes: previous.nodes.map((node, index) =>
                index === nodeIndex ? { ...node, [field]: value } : node,
            ),
        }));
    };

    /**
     * Ganti series pada satu node.
     *
     * `book_id` wajib dikosongkan bersamaan supaya payload tidak pernah
     * mengirim buku dari series lain. Semua perubahan dilakukan dalam satu
     * `setForm` agar tidak ada render antara yang masih menampilkan buku lama.
     */
    const changeNodeSeries = (nodeIndex: number, value: string) => {
        clearFieldError(`nodes.${nodeIndex}.book_series_id`);
        clearFieldError(`nodes.${nodeIndex}.book_id`);

        setForm((previous) => {
            const current = previous.nodes[nodeIndex];

            // Memilih series yang sama tidak boleh menghapus buku yang sudah dipilih.
            if (!current || current.book_series_id === value) {
                return previous;
            }

            return {
                ...previous,
                nodes: previous.nodes.map((node, index) =>
                    index === nodeIndex
                        ? {
                              ...node,
                              book_series_id: value,
                              book_series_label: null,
                              book_id: '',
                              book_label: null,
                              book_volume: null,
                          }
                        : node,
                ),
            };
        });
    };

    /* ---------------------------------------------------------------- */
    /*  Link handlers                                                    */
    /* ---------------------------------------------------------------- */

    const addLink = (nodeIndex: number) => {
        setForm((previous) => ({
            ...previous,
            nodes: previous.nodes.map((node, index) =>
                index === nodeIndex
                    ? {
                          ...node,
                          links: [
                              ...node.links,
                              { category: 'takarir', platform_name: '', title: '', status: 'gratis', url: '' },
                          ],
                      }
                    : node,
            ),
        }));
    };

    const removeLink = (nodeIndex: number, linkIndex: number) => {
        clearErrorPrefix(`nodes.${nodeIndex}.links`);

        setForm((previous) => ({
            ...previous,
            nodes: previous.nodes.map((node, index) =>
                index === nodeIndex
                    ? { ...node, links: node.links.filter((_, i) => i !== linkIndex) }
                    : node,
            ),
        }));
    };

    const updateLink = (
        nodeIndex: number,
        linkIndex: number,
        field: keyof PanduanFormLink,
        value: string,
    ) => {
        clearFieldError(`nodes.${nodeIndex}.links.${linkIndex}.${field}`);

        setForm((previous) => ({
            ...previous,
            nodes: previous.nodes.map((node, index) =>
                index === nodeIndex
                    ? {
                          ...node,
                          links: node.links.map((link, i) =>
                              i === linkIndex ? { ...link, [field]: value } : link,
                          ),
                      }
                    : node,
            ),
        }));
    };

    /* ---------------------------------------------------------------- */
    /*  Tag handlers                                                     */
    /* ---------------------------------------------------------------- */

    const addTag = (nodeIndex: number) => {
        setForm((previous) => ({
            ...previous,
            nodes: previous.nodes.map((node, index) =>
                index === nodeIndex
                    ? { ...node, tags: [...node.tags, { label: '', tone: 'neutral' as const }] }
                    : node,
            ),
        }));
    };

    const removeTag = (nodeIndex: number, tagIndex: number) => {
        clearErrorPrefix(`nodes.${nodeIndex}.tags`);

        setForm((previous) => ({
            ...previous,
            nodes: previous.nodes.map((node, index) =>
                index === nodeIndex
                    ? { ...node, tags: node.tags.filter((_, i) => i !== tagIndex) }
                    : node,
            ),
        }));
    };

    const updateTag = (nodeIndex: number, tagIndex: number, field: 'label' | 'tone', value: string) => {
        clearFieldError(`nodes.${nodeIndex}.tags.${tagIndex}.${field}`);

        setForm((previous) => ({
            ...previous,
            nodes: previous.nodes.map((node, index) =>
                index === nodeIndex
                    ? {
                          ...node,
                          tags: node.tags.map((tag, i) =>
                              i === tagIndex ? { ...tag, [field]: value } : tag,
                          ),
                      }
                    : node,
            ),
        }));
    };

    /* ---------------------------------------------------------------- */
    /*  Submit                                                           */
    /* ---------------------------------------------------------------- */

    const validate = (): ValidationErrors => {
        const nextErrors: ValidationErrors = {};

        if (form.title.trim() === '') {
            nextErrors.title = 'Judul panduan wajib diisi.';
        }

        form.nodes.forEach((node, nodeIndex) => {
            if (!hasNodeContent(node)) {
                return;
            }

            if (node.title.trim() === '') {
                nextErrors[`nodes.${nodeIndex}.title`] = 'Judul node wajib diisi.';
            }

            node.tags.forEach((tag, tagIndex) => {
                if (!hasTagContent(tag)) {
                    return;
                }

                if (tag.tone !== 'neutral' && tag.tone !== 'amber') {
                    nextErrors[`nodes.${nodeIndex}.tags.${tagIndex}.tone`] = 'Warna tag tidak valid.';
                }
            });

            node.links.forEach((link, linkIndex) => {
                if (!hasLinkContent(link)) {
                    return;
                }

                if (link.platform_name.trim() === '') {
                    nextErrors[`nodes.${nodeIndex}.links.${linkIndex}.platform_name`] =
                        'Nama platform wajib diisi.';
                }

                const url = link.url.trim();

                if (url === '') {
                    nextErrors[`nodes.${nodeIndex}.links.${linkIndex}.url`] = 'Link URL wajib diisi.';
                } else if (!isValidUrl(url)) {
                    nextErrors[`nodes.${nodeIndex}.links.${linkIndex}.url`] = 'URL link tidak valid.';
                }
            });
        });

        return nextErrors;
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const nextErrors = validate();
        setLocalErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setTimeout(() => focusFirstError(Object.keys(nextErrors)), 50);

            return;
        }

        const nodesPayload: PanduanFormSubmitPayload['nodes'] = [];
        const maps: SubmissionMaps = { nodes: [], links: {}, tags: {} };

        form.nodes.forEach((node, nodeIndex) => {
            if (!hasNodeContent(node)) {
                return;
            }

            const payloadNodeIndex = nodesPayload.length;
            maps.nodes.push(nodeIndex);

            const linksPayload: PanduanFormSubmitPayload['nodes'][number]['links'] = [];
            const linkMap: number[] = [];

            node.links.forEach((link, linkIndex) => {
                if (!hasLinkContent(link)) {
                    return;
                }

                linksPayload.push({
                    id: link.id,
                    category: link.category,
                    platform_name: link.platform_name.trim(),
                    title: link.title?.trim() ?? '',
                    status: link.status,
                    url: link.url.trim(),
                });
                linkMap.push(linkIndex);
            });

            maps.links[payloadNodeIndex] = linkMap;

            const tagsPayload: PanduanFormSubmitPayload['nodes'][number]['tags'] = [];
            const tagMap: number[] = [];

            node.tags.forEach((tag, tagIndex) => {
                if (!hasTagContent(tag)) {
                    return;
                }

                tagsPayload.push({ label: tag.label.trim(), tone: tag.tone });
                tagMap.push(tagIndex);
            });

            maps.tags[payloadNodeIndex] = tagMap;

            nodesPayload.push({
                id: node.id,
                book_id: node.book_id === '' ? null : Number(node.book_id),
                title: node.title.trim(),
                description: node.description.trim(),
                studio: node.studio.trim(),
                adaptation_label: node.adaptation_label.trim(),
                adaptation_range: node.adaptation_range.trim(),
                adaptation_chapters: node.adaptation_chapters.trim(),
                tags: tagsPayload,
                is_upcoming: node.is_upcoming,
                links: linksPayload,
            });
        });

        setSubmissionMaps(maps);

        onSubmit({
            title: form.title.trim(),
            description: form.description.trim(),
            nodes: nodesPayload,
        });
    };

    const focusFirstError = (keys: string[]) => {
        for (const key of keys) {
            const control = document.getElementById(key) as
                | HTMLInputElement
                | HTMLTextAreaElement
                | HTMLButtonElement
                | null;

            if (control) {
                control.focus({ preventScroll: true });
                control.scrollIntoView({ behavior: 'smooth', block: 'center' });

                return;
            }

            const errorEl = document.getElementById(`${key}-error`);

            if (errorEl) {
                errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

                return;
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xs">
                <CardHeader>
                    <CardTitle>Informasi Panduan</CardTitle>

                    <CardDescription>
                        Judul dan deskripsi yang tampil di halaman daftar panduan adaptasi.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Judul Panduan</Label>

                        <Input
                            id="title"
                            value={form.title}
                            onChange={(event) => {
                                clearFieldError('title');
                                setForm((previous) => ({ ...previous, title: event.target.value }));
                            }}
                            placeholder="Frieren: Beyond Journey's End"
                            disabled={processing}
                        />

                        <FieldError field="title" errors={activeErrors} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Deskripsi <span className="text-muted-foreground">(opsional)</span>
                        </Label>

                        <Textarea
                            id="description"
                            rows={3}
                            value={form.description}
                            onChange={(event) => {
                                clearFieldError('description');
                                setForm((previous) => ({ ...previous, description: event.target.value }));
                            }}
                            placeholder="Deskripsi singkat panduan ini..."
                            disabled={processing}
                        />

                        <FieldError field="description" errors={activeErrors} />
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-1.5 border-b border-neutral-200 pb-2 dark:border-[#1f2633]/80">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Node Timeline
                </h2>

                <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400">
                    Urutan node mengikuti urutan kartu di halaman publik (dari atas ke bawah).
                </p>
            </div>

            <PanduanNodesSection
                nodes={form.nodes}
                linkCategories={linkCategories}
                linkStatuses={linkStatuses}
                errors={activeErrors}
                addNode={addNode}
                removeNode={removeNode}
                updateNode={updateNode}
                changeNodeSeries={changeNodeSeries}
                addLink={addLink}
                removeLink={removeLink}
                updateLink={updateLink}
                addTag={addTag}
                removeTag={removeTag}
                updateTag={updateTag}
            />

            <div className="sticky bottom-0 z-20 -mx-4 mt-2 flex items-center justify-between gap-3 border-t border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90 sm:-mx-6 sm:rounded-b-xl sm:px-6">
                <Button
                    type="button"
                    variant="outline"
                    className="border-neutral-200 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    onClick={onCancel}
                >
                    Batal
                </Button>

                <Button
                    type="submit"
                    disabled={processing}
                    className="bg-[#112A12] hover:bg-[#0c1e0d] text-white"
                >
                    {processing ? 'Menyimpan...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
