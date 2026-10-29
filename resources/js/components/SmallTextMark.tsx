import { Mark, mergeAttributes } from '@tiptap/core';

/**
 * Mark "teks kecil" — untuk baris sumber / kredit gambar di badan artikel.
 *
 * StarterKit tidak menyediakan mark ukuran font (`small` / `sub` / `sup`), dan
 * proyek ini sengaja menghindari dependency baru. Jadi mark ini dibuat manual,
 * mengikuti pola extension kustom yang sudah ada (`EmbedNode`, `NewsImageNode`).
 */

export const SMALL_TEXT_CLASS = 'norinoya-text-small';

export const SmallText = Mark.create({
    name: 'smallText',

    // Teks yang diketik setelahnya ikut kecil sampai mark di-toggle ulang.
    inclusive: true,

    parseHTML() {
        return [
            { tag: 'span[data-norinoya-small]' }, // konten baru hasil editor ini
            { tag: `span.${SMALL_TEXT_CLASS}` }, // cadangan bila atribut hilang
            { tag: 'small' }, // konten lama / hasil tempel dari luar
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(HTMLAttributes, {
                class: SMALL_TEXT_CLASS,
                'data-norinoya-small': 'true',
            }),
        ];
    },
});
