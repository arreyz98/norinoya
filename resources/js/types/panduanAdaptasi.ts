export interface PanduanLink {
    id?: number;
    category: string;
    platform_name: string;
    title?: string | null;
    status: string;
    url: string;
}

export interface PanduanTag {
    label: string;
    tone: 'neutral' | 'amber';
}

export interface PanduanNode {
    id?: number;
    book_id?: number | string | null;
    book_label?: string | null;
    title: string;
    description?: string | null;
    studio?: string | null;
    adaptation_label?: string | null;
    adaptation_range?: string | null;
    adaptation_chapters?: string | null;
    tags: PanduanTag[];
    is_upcoming: boolean;
    links: PanduanLink[];
}

export interface PanduanAdaptasi {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    nodes: PanduanNode[];
    nodes_count?: number;
    created_at?: string;
    updated_at?: string;
}
