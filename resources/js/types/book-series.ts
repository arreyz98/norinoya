export interface BookSeries {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    books_count?: number;
    created_at: string;
    updated_at: string;
}