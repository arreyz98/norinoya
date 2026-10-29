import React from 'react';
import { useEditor, useEditorState, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Check, ExternalLink, Instagram, ImagePlus, Link as LinkIcon, Minus, Redo2, Eraser, Twitter, Undo2, Unlink, Video, Youtube, ALargeSmall } from 'lucide-react';
import { Embed, resolveEmbedUrl } from './EmbedNode';
import { NewsImage } from './NewsImageNode';
import { SmallText } from './SmallTextMark';
import { isSafeImageUrl } from '../utils/imageUrl';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const normalizeUrl = (raw: string): string => {
    const url = raw.trim();
    if (!url) return '';
    // Tolak protokol berbahaya (XSS). Protokol lain divalidasi juga oleh Link extension.
    if (/^(javascript|data|vbscript):/i.test(url)) return '';
    if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url)) return url;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
    return `https://${url}`;
};

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const [openDialog, setOpenDialog] = React.useState<'link' | 'embed' | 'image' | null>(null);
    const [linkUrl, setLinkUrl] = React.useState('');
    const [embedUrl, setEmbedUrl] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [imageAlt, setImageAlt] = React.useState('');
    const [imageCaption, setImageCaption] = React.useState('');
    const linkFormRef = React.useRef<HTMLDivElement>(null);
    const embedFormRef = React.useRef<HTMLDivElement>(null);
    const imageFormRef = React.useRef<HTMLDivElement>(null);
    const linkInputRef = React.useRef<HTMLInputElement>(null);
    const embedInputRef = React.useRef<HTMLInputElement>(null);
    const imageInputRef = React.useRef<HTMLInputElement>(null);
    const [isEmpty, setIsEmpty] = React.useState(true);
    const [imageError, setImageError] = React.useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Ensure heading, bold, italic, bulletList, etc. are enabled without image plugins
                heading: {
                    levels: [2, 3],
                },
                link: {
                    openOnClick: false,
                    autolink: true,
                    linkOnPaste: true,
                    defaultProtocol: 'https',
                    HTMLAttributes: {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                    },
                },
            }),
            // Blok embed YouTube / Instagram (iframe) ke dalam isi berita
            Embed,
            // Gambar inline via URL. Sebelum node ini ada, ProseMirror membuang
            // setiap <img> di konten tersimpan (tidak ada node yang menanganinya).
            NewsImage,
            // Mark teks kecil untuk baris sumber / kredit gambar.
            SmallText,
        ],
        content: value || '',
        editorProps: {
            attributes: {
                // Metrik sengaja disamakan dengan halaman publik (DetailNews NewsBody)
                // supaya editor benar-benar WYSIWYG. Catatan: @tailwindcss/typography
                // TIDAK terpasang, jadi class `prose` tidak boleh dipakai (no-op).
                class: 'min-h-[480px] p-4 [&_p:empty]:min-h-[1.5rem] [&_p]:mb-5 [&_p:last-child]:mb-0 text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-0 [&_a]:cursor-pointer [&_a]:font-medium [&_a]:text-emerald-700 [&_a]:underline [&_a]:decoration-emerald-500/60 [&_a]:underline-offset-2 hover:[&_a]:text-emerald-800 dark:[&_a]:text-emerald-400 dark:[&_a]:decoration-emerald-400/50 dark:hover:[&_a]:text-emerald-300 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:leading-snug [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:leading-snug [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#DA6B1C] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-600 dark:[&_blockquote]:text-neutral-300 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-xl [&_figure]:my-6 [&_figure]:mx-auto [&_figure]:max-w-full [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:text-neutral-500 dark:[&_figcaption]:text-neutral-400 [&_hr]:my-6 [&_hr]:border-t [&_hr]:border-neutral-300 dark:[&_hr]:border-neutral-700 [&_.norinoya-text-small]:text-xs [&_small]:text-xs [&_a]:break-words'
            },
        },
        onUpdate: ({ editor }) => {
            setIsEmpty(editor.isEmpty);
            onChange(editor.getHTML());
        },
    });

    // Statistik editor (jumlah kata, karakter, estimasi baca) + status undo/redo.
    // Dipakai useEditorState supaya re-render hanya terjadi saat nilainya berubah,
    // tidak menambah jalur re-render kedua di atas onChange yang sudah jalan.
    const editorStats = useEditorState({
        editor,
        selector: ({ editor: current }) => {
            if (!current) {
                return { words: 0, chars: 0, minutes: 0, canUndo: false, canRedo: false };
            }

            const text = current.state.doc.textContent ?? '';
            const trimmed = text.trim();
            const words = trimmed ? trimmed.split(/\s+/).length : 0;

            return {
                words,
                chars: text.length,
                // Kecepatan baca rata-rata artikel: ~200 kata per menit.
                minutes: words > 0 ? Math.max(1, Math.ceil(words / 200)) : 0,
                canUndo: current.can().undo(),
                canRedo: current.can().redo(),
            };
        },
    });

    // Update isEmpth saat editor dimuat ulang (mis. value berubah dari luar)
    React.useEffect(() => {
        if (!editor) return;
        setIsEmpty(editor.isEmpty);
    }, [value, editor]);

    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            if (value === '' || (editor.isEmpty && value !== '')) {
                // API TipTap v3: opsi berupa objek, bukan boolean.
                // emitUpdate: false agar tidak memicu onChange balik saat konten di-set dari luar.
                editor.commands.setContent(value || '', { emitUpdate: false });
            }
        }
    }, [value, editor]);

    React.useEffect(() => {
        if (!openDialog) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                linkFormRef.current?.contains(target) ||
                embedFormRef.current?.contains(target) ||
                imageFormRef.current?.contains(target)
            ) return;
            setOpenDialog(null);
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenDialog(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [openDialog]);

    if (!editor) {
        return null;
    }

    const isLinkFormOpen = openDialog === 'link';
    const isEmbedFormOpen = openDialog === 'embed';
    const isImageFormOpen = openDialog === 'image';
    const getActiveLinkHref = () => (editor.isActive('link') ? String(editor.getAttributes('link').href || '') : '');
    const activeLinkHref: string = getActiveLinkHref();
    const detectedEmbed = resolveEmbedUrl(embedUrl);
    const isImageUrlValid = isSafeImageUrl(imageUrl.trim());

    const openLinkForm = () => {
        setLinkUrl(getActiveLinkHref());
        setOpenDialog('link');
        window.setTimeout(() => linkInputRef.current?.focus(), 0);
    };

    const closeLinkForm = () => {
        setOpenDialog(null);
        setLinkUrl('');
    };

    const handleApplyLink = () => {
        const href = normalizeUrl(linkUrl);

        // Kosongkan input = hapus link dari teks terpilih
        if (!href) {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            closeLinkForm();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
        closeLinkForm();
    };

    const handleRemoveLink = () => {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        closeLinkForm();
    };

    const openEmbedForm = () => {
        setEmbedUrl('');
        setOpenDialog('embed');
        window.setTimeout(() => embedInputRef.current?.focus(), 0);
    };

    const closeEmbedForm = () => {
        setOpenDialog(null);
        setEmbedUrl('');
    };

    const handleInsertEmbed = () => {
        if (!detectedEmbed) return;

        editor
            .chain()
            .focus()
            .insertContent({
                type: 'embed',
                attrs: {
                    src: detectedEmbed.src,
                    provider: detectedEmbed.provider,
                    title: detectedEmbed.title,
                },
            })
            .run();
        closeEmbedForm();
    };

    const openImageForm = () => {
        setImageUrl('');
        setImageAlt('');
        setImageCaption('');
        setImageError('');
        setOpenDialog('image');
        window.setTimeout(() => imageInputRef.current?.focus(), 0);
    };

    const closeImageForm = () => {
        setOpenDialog(null);
        setImageUrl('');
        setImageAlt('');
        setImageCaption('');
        setImageError('');
    };

    const handleInsertImage = () => {
        const url = imageUrl.trim();

        if (!url) {
            setImageError('URL gambar wajib diisi.');
            return;
        }

        if (!isSafeImageUrl(url)) {
            setImageError('URL gambar tidak valid. Gunakan alamat http(s):// atau path relatif "/...".');
            return;
        }

        editor
            .chain()
            .focus()
            .insertContent({
                type: 'newsImage',
                attrs: {
                    src: url,
                    alt: imageAlt.trim() || null,
                    caption: imageCaption.trim() || null,
                },
            })
            .run();
        closeImageForm();
    };

    const handleContainerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (
            linkFormRef.current?.contains(event.target as Node) ||
            embedFormRef.current?.contains(event.target as Node) ||
            imageFormRef.current?.contains(event.target as Node)
        ) return;

        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            if (isLinkFormOpen) {
                closeLinkForm();
            } else {
                openLinkForm();
            }
        }
    };

    return (
        <div
            onKeyDown={handleContainerKeyDown}
            className="border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-xs bg-white dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-emerald-500/50 dark:focus-within:ring-emerald-400/50"
        >
            {/* Toolbar Formatter */}
            <div className="flex items-center gap-1.5 p-2 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 select-none flex-wrap rounded-t-xl">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorStats?.canUndo}
                    className="px-2 py-1 text-xs rounded-lg transition-all bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Undo (Ctrl+Z)"
                >
                    <Undo2 className="w-3.5 h-3.5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorStats?.canRedo}
                    className="px-2 py-1 text-xs rounded-lg transition-all bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Redo (Ctrl+Shift+Z)"
                >
                    <Redo2 className="w-3.5 h-3.5" />
                </button>

                <span className="w-px h-5 mx-0.5 bg-neutral-200 dark:bg-neutral-700" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        editor.isActive('bold')
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                    title="Bold (Tebal)"
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2.5 py-1 text-xs italic font-serif rounded-lg transition-all ${
                        editor.isActive('italic')
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                    title="Italic (Miring)"
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        editor.isActive('heading', { level: 2 })
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                    title="Heading 2 (Sub Judul)"
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        editor.isActive('heading', { level: 3 })
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                    title="Heading 3"
                >
                    H3
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
                        editor.isActive('bulletList')
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                    title="Bullet List (Daftar Poin)"
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
                        editor.isActive('orderedList')
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                    title="Numbered List (Daftar Angka)"
                >
                    1. List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
                        editor.isActive('blockquote')
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                    title="Kutipan"
                >
                    ” Kutipan
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"
                    title="Hapus semua format (bersihkan teks hasil tempel dari Word/Google Docs)"
                >
                    <Eraser className="w-3.5 h-3.5" />
                    Bersihkan
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600"
                    title="Garis pemisah (Horizontal Rule)"
                >
                    <Minus className="w-3.5 h-3.5" />
                    Garis
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleMark('smallText').run()}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all ${
                        editor.isActive('smallText')
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    }`}
                    title="Teks kecil (untuk sumber / kredit gambar)"
                >
                    <ALargeSmall className="w-3.5 h-3.5" />
                    Teks Kecil
                </button>

                <span className="w-px h-5 mx-0.5 bg-neutral-200 dark:bg-neutral-700" />

                {/* Tombol & Dialog Link */}
                <div className="relative" ref={linkFormRef}>
                    <button
                        type="button"
                        onClick={() => (isLinkFormOpen ? closeLinkForm() : openLinkForm())}
                        className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all ${
                            editor.isActive('link') || isLinkFormOpen
                                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                        }`}
                        title="Sisipkan / Edit Link (Ctrl+K)"
                    >
                        <LinkIcon className="w-3.5 h-3.5" />
                        Link
                    </button>

                    {isLinkFormOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-3rem)] space-y-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-left shadow-xl sm:left-0 sm:right-auto">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-200">
                                <LinkIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>{activeLinkHref ? 'Edit Link' : 'Sisipkan Link'}</span>
                            </div>

                            <input
                                ref={linkInputRef}
                                type="text"
                                inputMode="url"
                                spellCheck={false}
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleApplyLink();
                                    }
                                }}
                                placeholder="https://www.youtube.com/playlist?list=..."
                                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2.5 py-2 text-xs text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleApplyLink}
                                    className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                                >
                                    <Check className="w-3.5 h-3.5" />
                                    Terapkan
                                </button>
                                {(activeLinkHref || editor.isActive('link')) && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveLink}
                                        className="flex items-center justify-center gap-1 rounded-lg border border-red-200 dark:border-red-900/60 px-2.5 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40"
                                        title="Hapus link dari teks terpilih"
                                    >
                                        <Unlink className="w-3.5 h-3.5" />
                                        Hapus
                                    </button>
                                )}
                            </div>

                            {activeLinkHref && (
                                <a
                                    href={activeLinkHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    Buka tautan saat ini
                                </a>
                            )}

                            <p className="text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500">
                                Tip: tempel atau ketik URL langsung di teks akan otomatis menjadi link. Tekan Ctrl/Cmd + K untuk membuka dialog ini.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tombol & Dialog Embed YouTube / Instagram */}
                <div className="relative" ref={embedFormRef}>
                    <button
                        type="button"
                        onClick={() => (isEmbedFormOpen ? closeEmbedForm() : openEmbedForm())}
                        className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all ${
                            isEmbedFormOpen
                                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                        }`}
                        title="Sisipkan Embed YouTube / Instagram / X"
                    >
                        <Video className="w-3.5 h-3.5" />
                        Embed
                    </button>

                    {isEmbedFormOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-3rem)] space-y-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-left shadow-xl sm:left-0 sm:right-auto">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-200">
                                <Video className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>Sisipkan Embed YouTube / Instagram / X</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <span className="flex items-center gap-1 rounded-md bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">
                                    <Youtube className="h-3 w-3" />
                                    YouTube
                                </span>
                                <span className="flex items-center gap-1 rounded-md bg-pink-50 dark:bg-pink-950/40 px-1.5 py-0.5 text-[10px] font-bold text-pink-600 dark:text-pink-400">
                                    <Instagram className="h-3 w-3" />
                                    Instagram
                                </span>
                                <span className="flex items-center gap-1 rounded-md bg-sky-50 dark:bg-sky-950/40 px-1.5 py-0.5 text-[10px] font-bold text-sky-600 dark:text-sky-400">
                                    <Twitter className="h-3 w-3" />
                                    X / Twitter
                                </span>
                            </div>

                            <input
                                ref={embedInputRef}
                                type="text"
                                inputMode="url"
                                spellCheck={false}
                                value={embedUrl}
                                onChange={(e) => setEmbedUrl(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleInsertEmbed();
                                    }
                                }}
                                placeholder="https://www.youtube.com/watch?v=... atau https://x.com/user/status/..."
                                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2.5 py-2 text-xs text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />

                            {embedUrl.trim() ? (
                                detectedEmbed ? (
                                    <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                                        <Check className="w-3 h-3 shrink-0" />
                                        Terdeteksi: {detectedEmbed.title}
                                    </p>
                                ) : (
                                    <p className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                                        URL tidak dikenali. Gunakan link YouTube, Instagram, atau X/Twitter.
                                    </p>
                                )
                            ) : (
                                <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                    Video, Shorts, dan playlist YouTube, post/Reel/IGTV Instagram, serta postingan X/Twitter.
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={handleInsertEmbed}
                                disabled={!detectedEmbed}
                                className={`flex w-full items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
                                    detectedEmbed
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                        : 'cursor-not-allowed bg-neutral-200 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500'
                                }`}
                            >
                                <Check className="w-3.5 h-3.5" />
                                Sisipkan Embed
                            </button>

                            <p className="text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500">
                                Embed dirender sebagai iframe pada halaman berita. Anda juga bisa menempel kode {'<iframe>'} YouTube/Instagram/X
                                langsung ke isi berita — otomatis dikonversi menjadi embed.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tombol & Dialog Sisip Gambar via URL */}
                <div className="relative" ref={imageFormRef}>
                    <button
                        type="button"
                        onClick={() => (isImageFormOpen ? closeImageForm() : openImageForm())}
                        className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all ${
                            isImageFormOpen || editor.isActive('newsImage')
                                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                : 'bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                        }`}
                        title="Sisipkan gambar dari URL"
                    >
                        <ImagePlus className="w-3.5 h-3.5" />
                        Gambar
                    </button>

                    {isImageFormOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-3rem)] space-y-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-left shadow-xl sm:left-0 sm:right-auto">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-200">
                                <ImagePlus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>Sisipkan Gambar (URL)</span>
                            </div>

                            <input
                                ref={imageInputRef}
                                type="text"
                                inputMode="url"
                                spellCheck={false}
                                value={imageUrl}
                                onChange={(e) => {
                                    setImageUrl(e.target.value);
                                    setImageError('');
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleInsertImage();
                                    }
                                }}
                                placeholder="https://ik.imgkit.net/gambar-berita.jpg"
                                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2.5 py-2 text-xs text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />

                            <input
                                type="text"
                                spellCheck={false}
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                                placeholder="Teks alternatif (opsional, untuk SEO & pembaca layar)"
                                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2.5 py-2 text-xs text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />

                            <input
                                type="text"
                                value={imageCaption}
                                onChange={(e) => setImageCaption(e.target.value)}
                                placeholder="Caption / keterangan gambar (opsional)"
                                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2.5 py-2 text-xs text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />

                            {imageError ? (
                                <p className="text-[11px] font-semibold text-red-600 dark:text-red-400">{imageError}</p>
                            ) : imageUrl.trim() !== '' ? (
                                isImageUrlValid ? (
                                    <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                                        <Check className="w-3 h-3 shrink-0" />
                                        URL gambar valid
                                    </p>
                                ) : (
                                    <p className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                                        URL tidak dikenali. Gunakan http(s):// atau path relatif &quot;/...&quot;.
                                    </p>
                                )
                            ) : (
                                <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                    Tempel alamat gambar (ImageKit, Unsplash, atau CDN lain). Tidak ada unggahan berkas.
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={handleInsertImage}
                                disabled={!isImageUrlValid}
                                className={`flex w-full items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
                                    isImageUrlValid
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                        : 'cursor-not-allowed bg-neutral-200 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500'
                                }`}
                            >
                                <Check className="w-3.5 h-3.5" />
                                Sisipkan Gambar
                            </button>

                            <p className="text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500">
                                Caption opsional akan tampil sebagai keterangan kecil di bawah gambar pada halaman berita.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Area Editor */}
            <div className="bg-white dark:bg-neutral-900 rounded-b-xl">
                <div
                    className="relative cursor-text"
                    onClick={() => editor.commands.focus()}
                >
                    {/* Placeholder overlay: pakai state isEmpty, bukan CSS ::before,
                        supaya ikut tema dan tidak perlu class/markup tambahan di ProseMirror. */}
                    {isEmpty && placeholder && (
                        <span className="pointer-events-none absolute left-4 top-4 select-none text-sm text-neutral-400 dark:text-neutral-500">
                            {placeholder}
                        </span>
                    )}
                    <EditorContent editor={editor} />
                </div>

                {/* Statistik editor: jumlah kata + estimasi waktu baca */}
                <div className="flex items-center justify-between gap-2 border-t border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <span className="font-mono">
                        {(editorStats?.words ?? 0).toLocaleString('id-ID')} kata
                        {editorStats && editorStats.words > 0 ? ` · ${editorStats.minutes} menit baca` : ''}
                    </span>
                    <span className="font-mono">
                        {(editorStats?.chars ?? 0).toLocaleString('id-ID')} karakter
                    </span>
                </div>
            </div>
        </div>
    );
}
