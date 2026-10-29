import NewsForm, {
    buildCreateNewsInitialValues,
    type BookOption,
    type InstagramOption,
    type TiktokOption,
} from './components/NewsForm';

interface NewsCreateProps {
    books?: BookOption[];
    tiktokEmbeds?: TiktokOption[];
    instagramEmbeds?: InstagramOption[];
}

// Kunci autosave draf di localStorage (halaman tambah berita).
const NEWS_DRAFT_KEY = 'norinoya:news-draft:create';

export default function NewsCreate({ books = [], tiktokEmbeds = [], instagramEmbeds = [] }: NewsCreateProps) {
    return (
        <NewsForm
            mode="create"
            initialValues={buildCreateNewsInitialValues()}
            draftKey={NEWS_DRAFT_KEY}
            books={books}
            tiktokEmbeds={tiktokEmbeds}
            instagramEmbeds={instagramEmbeds}
        />
    );
}
