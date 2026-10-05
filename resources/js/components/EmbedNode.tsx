import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from '@tiptap/react';
import { ExternalLink, Instagram, Trash2, Youtube } from 'lucide-react';

export type EmbedProvider = 'youtube' | 'instagram';

export interface EmbedData {
    src: string;
    provider: EmbedProvider;
    title: string;
}

const DANGEROUS_PROTOCOL = /^(javascript|data|vbscript):/i;

type WithAttributes = {
    getAttribute: (name: string) => string | null;
};

const castElement = (element: Node | null): WithAttributes | null => element as unknown as WithAttributes | null;

/**
 * Ubah URL YouTube / Instagram biasa menjadi URL embed yang aman dipasang di iframe.
 * Mengembalikan null jika URL bukan dari provider yang didukung.
 */
export const resolveEmbedUrl = (raw: string): EmbedData | null => {
    const input = raw.trim();
    if (!input || DANGEROUS_PROTOCOL.test(input)) return null;

    let url: URL;
    try {
        url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(input) ? input : `https://${input}`);
    } catch {
        return null;
    }

    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const path = url.pathname;

    // ===== YouTube =====
    if (host === 'youtu.be') {
        const id = path.split('/').filter(Boolean)[0];
        return id ? { src: `https://www.youtube.com/embed/${id}`, provider: 'youtube', title: 'YouTube Video' } : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
        const list = url.searchParams.get('list');

        if (path === '/playlist' || path === '/embed/videoseries') {
            return list
                ? { src: `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}`, provider: 'youtube', title: 'YouTube Playlist' }
                : null;
        }

        const videoId = url.searchParams.get('v');
        if (path === '/watch' && videoId) {
            return { src: `https://www.youtube.com/embed/${videoId}`, provider: 'youtube', title: 'YouTube Video' };
        }

        const short = path.match(/^\/shorts\/([\w-]+)/);
        if (short) {
            return { src: `https://www.youtube.com/embed/${short[1]}`, provider: 'youtube', title: 'YouTube Short' };
        }

        const live = path.match(/^\/live\/([\w-]+)/);
        if (live) {
            return { src: `https://www.youtube.com/embed/${live[1]}`, provider: 'youtube', title: 'YouTube Live' };
        }

        const embed = path.match(/^\/embed\/([\w-]+)/);
        if (embed) {
            return { src: `https://www.youtube.com/embed/${embed[1]}`, provider: 'youtube', title: 'YouTube Video' };
        }

        return null;
    }

    // ===== Instagram =====
    if (host === 'instagram.com' || host === 'instagr.am') {
        const match = path.match(/^\/(p|reel|reels|tv)\/([\w-]+)/);
        if (!match) return null;

        const type = match[1] === 'reels' ? 'reel' : match[1];
        const label = type === 'p' ? 'Post' : type === 'tv' ? 'IGTV' : 'Reel';

        return {
            src: `https://www.instagram.com/${type}/${match[2]}/embed`,
            provider: 'instagram',
            title: `Instagram ${label}`,
        };
    }

    return null;
};

/**
 * Validasi src iframe yang sudah tersimpan agar hanya YouTube/Instagram yang lolos parse.
 */
const allowedProvider = (src: string): EmbedProvider | null => {
    if (!src || DANGEROUS_PROTOCOL.test(src)) return null;

    let url: URL;
    try {
        url = new URL(src);
    } catch {
        return null;
    }

    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

    const host = url.hostname.toLowerCase().replace(/^www\./, '');

    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
        return url.pathname.startsWith('/embed/') ? 'youtube' : null;
    }

    if (host === 'instagram.com') {
        return /\/(p|reel|tv)\/[\w-]+\/embed\/?$/.test(url.pathname) ? 'instagram' : null;
    }

    return null;
};

const iframeAttributes = {
    frameborder: '0',
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    allowfullscreen: 'true',
    loading: 'lazy',
    referrerpolicy: 'strict-origin-when-cross-origin',
};

// ===== Deteksi kode <iframe> yang ditempel sebagai teks =====
// Saat menyalin kode embed dari YouTube/Instagram, clipboard berisi teks (bukan elemen iframe),
// sehingga perlu dikonversi manual menjadi node embed.

const IFRAME_SRC_REGEX = /<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;

const decodeBasicEntities = (value: string): string =>
    value
        .replace(/&amp;/gi, '&')
        .replace(/&#0*38;/g, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#0*34;/g, '"')
        .replace(/&#0*39;/g, "'")
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>');

const extractEmbedDataFromText = (text: string): EmbedData[] => {
    if (!text || !/<iframe/i.test(text)) return [];

    const embeds: EmbedData[] = [];
    for (const match of text.matchAll(IFRAME_SRC_REGEX)) {
        const embed = resolveEmbedUrl(decodeBasicEntities(match[1]));
        if (embed) embeds.push(embed);
    }

    if (embeds.length === 0) return [];

    // Hanya konversi jika keseluruhan teks yang ditempel memang kode iframe (bukan paragraf berisi kode)
    const leftover = text.replace(IFRAME_SRC_REGEX, '').replace(/\s+/g, '');
    if (leftover.length > 0) return [];

    return embeds;
};

const extractEmbedDataFromClipboard = (data: DataTransfer | null): EmbedData[] => {
    if (!data) return [];

    const fromPlainText = extractEmbedDataFromText(data.getData('text/plain'));
    if (fromPlainText.length > 0) return fromPlainText;

    // Jika hanya tersedia flavor HTML, ambil textContent-nya (entitas &lt;iframe ...&gt; ikut ter-decode browser)
    const html = data.getData('text/html');
    if (!html || !/&lt;iframe/i.test(html)) return [];

    const container = document.createElement('div');
    container.innerHTML = html;
    return extractEmbedDataFromText(container.textContent || '');
};

function EmbedView({ node, selected, deleteNode }: ReactNodeViewProps) {
    const provider = (node.attrs.provider || 'youtube') as EmbedProvider;
    const src = String(node.attrs.src || '');
    const title = String(node.attrs.title || (provider === 'youtube' ? 'YouTube Embed' : 'Instagram Embed'));
    const isYoutube = provider === 'youtube';

    return (
        <NodeViewWrapper className="my-3" data-embed-view={provider} contentEditable={false}>
            <div
                className={`overflow-hidden rounded-xl border bg-white dark:bg-neutral-900 ${
                    selected ? 'border-emerald-500 ring-2 ring-emerald-500/40' : 'border-neutral-200 dark:border-neutral-700'
                }`}
            >
                <div className="flex select-none items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-2.5 py-1.5 dark:border-neutral-700 dark:bg-neutral-800">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                        {isYoutube ? <Youtube className="h-3.5 w-3.5 text-red-600" /> : <Instagram className="h-3.5 w-3.5 text-pink-600" />}
                        {isYoutube ? 'YouTube Embed' : 'Instagram Embed'}
                    </span>
                    <span className="flex items-center gap-1">
                        <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                window.open(src, '_blank', 'noopener,noreferrer');
                            }}
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                            title="Buka pratinjau di tab baru"
                        >
                            <ExternalLink className="h-3 w-3" />
                            Pratinjau
                        </a>
                        <button
                            type="button"
                            onClick={() => deleteNode?.()}
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                            title="Hapus embed"
                        >
                            <Trash2 className="h-3 w-3" />
                            Hapus
                        </button>
                    </span>
                </div>

                {isYoutube ? (
                    <div className="aspect-video w-full">
                        <iframe
                            src={src}
                            title={title}
                            className="pointer-events-none h-full w-full"
                            allow={iframeAttributes.allow}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder={0}
                        />
                    </div>
                ) : (
                    <div className="mx-auto h-[620px] w-full max-w-[400px]">
                        <iframe
                            src={src}
                            title={title}
                            className="pointer-events-none h-full w-full"
                            allow={iframeAttributes.allow}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder={0}
                        />
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
}

export const Embed = Node.create({
    name: 'embed',
    group: 'block',
    atom: true,
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            provider: {
                default: 'youtube',
                parseHTML: (element) => castElement(element)?.getAttribute('data-embed-provider') || 'youtube',
                renderHTML: (attributes) => ({ 'data-embed-provider': attributes.provider }),
            },
            title: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'iframe[src]',
                getAttrs: (element) => {
                    const src = castElement(element)?.getAttribute('src') || '';
                    const provider = allowedProvider(src);
                    if (!provider) return false;

                    return {
                        src,
                        provider,
                        title: castElement(element)?.getAttribute('title') || null,
                    };
                },
            },
        ];
    },

    renderHTML({ node, HTMLAttributes }) {
        const provider = (node.attrs.provider || 'youtube') as EmbedProvider;
        const style =
            provider === 'instagram'
                ? 'display:block;width:100%;max-width:400px;height:620px;margin:0 auto;border:0;border-radius:12px;background:#fff'
                : 'display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:12px;background:#000';

        return [
            'iframe',
            mergeAttributes(HTMLAttributes, {
                class: 'norinoya-embed',
                style,
                ...iframeAttributes,
            }),
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(EmbedView);
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('embedPasteHandler'),
                props: {
                    handlePaste: (_view, event) => {
                        const embeds = extractEmbedDataFromClipboard(event.clipboardData);
                        if (embeds.length === 0) return false;

                        this.editor
                            .chain()
                            .focus()
                            .insertContent(
                                embeds.map((embed) => ({
                                    type: 'embed',
                                    attrs: {
                                        src: embed.src,
                                        provider: embed.provider,
                                        title: embed.title,
                                    },
                                })),
                            )
                            .run();

                        return true;
                    },
                },
            }),
        ];
    },
});
