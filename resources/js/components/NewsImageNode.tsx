import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from '@tiptap/react';
import { Check, ImagePlus, Pencil, Trash2, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isSafeImageUrl, normalizeImageUrl } from '../utils/imageUrl';

/**
 * Node gambar inline untuk isi berita.
 *
 * Kenapa node sendiri, bukan package `@tiptap/extension-image`:
 * - proyek ini sengaja menghindari dependency baru;
 * - pola node + NodeView sudah dipakai untuk embed (lihat `EmbedNode.tsx`).
 *
 * Efek samping penting: sebelum node ini ada, ProseMirror tidak punya node yang
 * menangani `<img>`, sehingga setiap gambar di konten tersimpan otomatis dibuang.
 */

type ElementLike = {
    getAttribute: (name: string) => string | null;
    textContent?: string | null;
    parentElement?: ElementLike | null;
    querySelector?: (selector: string) => ElementLike | null;
};

// Parameter sengaja HTMLElement (bukan `Node`), karena `Node` di file ini merujuk
// ke kelas Node milik TipTap, bukan Node DOM.
const asElement = (element: HTMLElement | null): ElementLike | null => (element as unknown as ElementLike | null);

/** Ambil caption dari <figcaption> terdekat bila gambar dibungkus <figure>. */
const readCaptionFromElement = (element: ElementLike): string | null => {
    const parent = element.parentElement;
    if (!parent) return null;

    const figcaption = parent.querySelector?.('figcaption');
    const text = (figcaption?.textContent ?? '').trim();

    return text !== '' ? text : null;
};

function ImageView({ node, selected, deleteNode, updateAttributes }: ReactNodeViewProps) {
    const src = String(node.attrs.src ?? '');
    const alt = node.attrs.alt ? String(node.attrs.alt) : '';
    const caption = node.attrs.caption ? String(node.attrs.caption) : '';

    const [isEditing, setIsEditing] = useState(false);
    const [draftAlt, setDraftAlt] = useState(alt);
    const [draftCaption, setDraftCaption] = useState(caption);
    const [failed, setFailed] = useState(false);

    // Sinkronkan draft saat atribut berubah dari luar (mis. undo/redo).
    useEffect(() => {
        setDraftAlt(alt);
        setDraftCaption(caption);
    }, [alt, caption]);

    useEffect(() => {
        setFailed(false);
    }, [src]);

    const applyDetails = () => {
        updateAttributes({
            alt: draftAlt.trim() || null,
            caption: draftCaption.trim() || null,
        });
        setIsEditing(false);
    };

    return (
        <NodeViewWrapper className="my-4" data-embed-view="news-image" contentEditable={false}>
            <div
                className={`overflow-hidden rounded-xl border bg-white dark:bg-neutral-900 ${
                    selected ? 'border-emerald-500 ring-2 ring-emerald-500/40' : 'border-neutral-200 dark:border-neutral-700'
                }`}
            >
                {/* Toolbar mini */}
                <div className="flex select-none items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-2.5 py-1.5 dark:border-neutral-700 dark:bg-neutral-800">
                    <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                        <ImagePlus className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        Gambar
                        <span className="truncate font-mono text-[10px] font-normal text-neutral-400 dark:text-neutral-500">
                            {src}
                        </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                        <button
                            type="button"
                            onClick={() => setIsEditing((prev) => !prev)}
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-neutral-600 hover:bg-neutral-200/70 dark:text-neutral-300 dark:hover:bg-neutral-700"
                            title="Atur alt text & caption"
                        >
                            <Pencil className="h-3 w-3" />
                            Atribut
                        </button>
                        <button
                            type="button"
                            onClick={() => deleteNode?.()}
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                            title="Hapus gambar"
                        >
                            <Trash2 className="h-3 w-3" />
                            Hapus
                        </button>
                    </span>
                </div>

                {/* Pratinjau */}
                <div className="flex justify-center bg-neutral-50 p-3 dark:bg-neutral-950/40">
                    {failed ? (
                        <div className="flex items-center gap-2 px-3 py-6 text-xs font-semibold text-red-600 dark:text-red-400">
                            <TriangleAlert className="h-4 w-4 shrink-0" />
                            Gambar tidak dapat dimuat. Periksa kembali URL-nya.
                        </div>
                    ) : (
                        <img
                            src={src}
                            alt={alt}
                            className="max-h-[400px] w-auto max-w-full rounded-lg object-contain"
                            onError={() => setFailed(true)}
                        />
                    )}
                </div>

                {/* Caption yang sudah tersimpan */}
                {!isEditing && caption !== '' && !failed && (
                    <p className="border-t border-neutral-100 px-3 py-2 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                        {caption}
                    </p>
                )}

                {/* Panel atribut */}
                {isEditing && (
                    <div className="space-y-2 border-t border-neutral-200 p-3 dark:border-neutral-700">
                        <input
                            type="text"
                            value={draftAlt}
                            onChange={(event) => setDraftAlt(event.target.value)}
                            placeholder="Teks alternatif (untuk SEO & pembaca layar)"
                            className="w-full rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-900 outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                        />
                        <input
                            type="text"
                            value={draftCaption}
                            onChange={(event) => setDraftCaption(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    applyDetails();
                                }
                            }}
                            placeholder="Caption / keterangan gambar (opsional)"
                            className="w-full rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-900 outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                        />
                        <button
                            type="button"
                            onClick={applyDetails}
                            className="flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                        >
                            <Check className="h-3.5 w-3.5" />
                            Simpan Atribut
                        </button>
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
}

export const NewsImage = Node.create({
    name: 'newsImage',
    group: 'block',
    atom: true,
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            caption: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
                getAttrs: (element) => {
                    const el = asElement(element);
                    const src = el?.getAttribute('src') ?? '';

                    // Tolak src berbahaya/tidak didukung supaya tidak masuk ke dokumen.
                    if (!isSafeImageUrl(src)) return false;

                    return {
                        src: normalizeImageUrl(src),
                        alt: el?.getAttribute('alt') || null,
                        caption: el ? readCaptionFromElement(el) : null,
                    };
                },
            },
        ];
    },

    renderHTML({ node, HTMLAttributes }) {
        const src = String(node.attrs.src ?? '');

        // Pertahanan terakhir: jangan pernah menulis src yang tidak lolos validasi
        // ke HTML yang dirender di halaman publik.
        if (!isSafeImageUrl(src)) {
            return ['span', { class: 'norinoya-image-invalid' }, '[Gambar tidak valid]'];
        }

        const alt = node.attrs.alt ? String(node.attrs.alt) : '';
        const caption = node.attrs.caption ? String(node.attrs.caption) : '';
        const imageAttributes = mergeAttributes(HTMLAttributes, {
            src: normalizeImageUrl(src),
            ...(alt !== '' ? { alt } : {}),
            class: 'norinoya-inline-image',
            loading: 'lazy',
            decoding: 'async',
            referrerpolicy: 'no-referrer',
        });

        // Tanpa caption: cukup <img> supaya CSS publik yang sudah ada langsung berlaku.
        if (caption === '') {
            return ['img', imageAttributes];
        }

        return [
            'figure',
            { class: 'norinoya-figure' },
            ['img', imageAttributes],
            ['figcaption', {}, caption],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageView);
    },
});
