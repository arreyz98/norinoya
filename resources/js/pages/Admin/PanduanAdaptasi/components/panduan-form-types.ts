import type { PanduanLink, PanduanTag } from '@/types/panduanAdaptasi';

/**
 * Bentuk data form panduan adaptasi (3 level).
 */
export interface PanduanFormData {
    title: string;
    description: string;
    nodes: PanduanFormNode[];
}

export interface PanduanFormNode {
    id?: number;
    book_id: string;
    book_label?: string | null;
    title: string;
    description: string;
    studio: string;
    adaptation_label: string;
    adaptation_range: string;
    adaptation_chapters: string;
    tags: PanduanTag[];
    is_upcoming: boolean;
    links: PanduanFormLink[];
}

export type PanduanFormLink = PanduanLink;

/**
 * Pemetaan index payload (setelah baris kosong dibuang) → index form,
 * dipakai untuk mengembalikan posisi error validasi server ke baris yang tepat.
 */
export interface SubmissionMaps {
    nodes: number[];
    /** payload node index → [payload link index → form link index] */
    links: Record<number, number[]>;
    /** payload node index → [payload tag index → form tag index] */
    tags: Record<number, number[]>;
}

export interface EnumOption {
    value: string;
    label: string;
}

export const EMPTY_LINK: PanduanFormLink = {
    category: 'takarir',
    platform_name: '',
    title: '',
    status: 'gratis',
    url: '',
};

export const EMPTY_NODE: PanduanFormNode = {
    book_id: '',
    book_label: null,
    title: '',
    description: '',
    studio: '',
    adaptation_label: '',
    adaptation_range: '',
    adaptation_chapters: '',
    tags: [],
    is_upcoming: false,
    links: [],
};

/** Baris node dianggap terisi jika judul / buku / link mana pun ada isinya. */
export function hasNodeContent(node: PanduanFormNode): boolean {
    return (
        node.title.trim() !== '' ||
        node.book_id !== '' ||
        node.description.trim() !== '' ||
        node.studio.trim() !== '' ||
        node.links.some(hasLinkContent)
    );
}

/** Baris link dianggap terisi jika platform / URL ada isinya. */
export function hasLinkContent(link: PanduanFormLink): boolean {
    return link.platform_name.trim() !== '' || link.url.trim() !== '';
}

/** Baris tag dianggap terisi jika label ada isinya. */
export function hasTagContent(tag: PanduanTag): boolean {
    return (tag.label ?? '').trim() !== '';
}
