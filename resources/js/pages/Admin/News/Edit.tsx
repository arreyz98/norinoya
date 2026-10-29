import type { NewsItem } from '@/types/news';
import NewsForm, {
    buildEditNewsInitialValues,
    type BookOption,
    type InstagramOption,
    type TiktokOption,
} from './components/NewsForm';

interface NewsEditProps {
    newsItem: NewsItem;
    books?: BookOption[];
    tiktokEmbeds?: TiktokOption[];
    instagramEmbeds?: InstagramOption[];
}

export default function NewsEdit({ newsItem, books = [], tiktokEmbeds = [], instagramEmbeds = [] }: NewsEditProps) {
    return (
        <NewsForm
            mode="edit"
            newsItem={newsItem}
            initialValues={buildEditNewsInitialValues(newsItem)}
            draftKey={`norinoya:news-draft:edit:${newsItem.id}`}
            // Draf yang lebih tua dari versi server akan dibuang otomatis.
            serverUpdatedAt={newsItem.updated_at ? new Date(newsItem.updated_at).getTime() : undefined}
            books={books}
            tiktokEmbeds={tiktokEmbeds}
            instagramEmbeds={instagramEmbeds}
        />
    );
}
