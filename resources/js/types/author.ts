export interface Author {
    id: number;
    name: string;
    slug: string;
    biography: string | null;
    story_books_count?: number;
    art_books_count?: number;
    created_at: string;
    updated_at: string;
}