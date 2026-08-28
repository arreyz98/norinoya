import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Ensure heading, bold, italic, bulletList, etc. are enabled without image plugins
                heading: {
                    levels: [2, 3],
                },
            }),
        ],
        content: value || '',
        editorProps: {
            attributes: {
                // [&_p]:mb-4 memberi jarak bawah tiap paragraf
                // [&_p:empty]:min-h-[1.5rem] menjaga tinggi baris jika ada double-enter (baris kosong)
                class: 'min-h-[180px] [&_p:empty]:min-h-[1.5rem] p-3.5 focus:outline-none prose dark:prose-invert max-w-none text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 focus:ring-0',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            if (value === '' || (editor.isEmpty && value !== '')) {
                editor.commands.setContent(value || '', false);
            }
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-xs overflow-hidden bg-white dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-emerald-500/50 dark:focus-within:ring-emerald-400/50">
            {/* Toolbar Formatter */}
            <div className="flex items-center gap-1.5 p-2 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 select-none flex-wrap">
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
            </div>

            {/* Area Editor */}
            <div className="bg-white dark:bg-neutral-900 cursor-text" onClick={() => editor.commands.focus()}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}