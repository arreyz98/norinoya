export interface PollOptionItem {
    id: string;
    label: string;
    votes: number;
}

// Ditulis sebagai `type` (bukan `interface`) supaya punya implicit index signature.
// Kalau berbentuk interface, `ReactionItem[]` tidak memenuhi FormDataConvertible
// dan inferensi tipe `useForm` di halaman admin gagal.
export type ReactionItem = {
    id: string;
    emoji: string;
    label: string;
    count: number;
};

export interface NewsRecommendationItemInput {
    number: number | string;
    title: string;
    description: string;
    book_id?: number | string | null;
    tiktok_embed_id?: number | string | null;
    instagram_embed_id?: number | string | null;
}

export interface NewsItem {
    id: number;
    username: string;
    display_name: string;
    title: string;
    slug: string;
    content: string;
    category: string;
    publication_status?: 'draft' | 'published';
    hash_tags?: string[] | null;
    attached_image?: string | null;
    gallery_images?: string[] | null;
    reading_rating?: string | null;
    is_pinned: boolean;
    poll_question?: string | null;
    poll_options?: PollOptionItem[] | null;
    reactions?: ReactionItem[] | null;
    recommendations?: NewsRecommendationItemInput[] | null;
    relevant_books?: Array<number | string> | null;
    views_count?: number;
    created_at?: string;
    updated_at?: string;
}
