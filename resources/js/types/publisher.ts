export interface Publisher {
    id: number;
    name: string;
    slug: string;
    books_count?: number;
    created_at: string;
    updated_at: string;
}