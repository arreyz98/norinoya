import { Comic, Volume } from '../types/demo';

// Bentuk relasi affiliate link dari payload Laravel. Kunci relasi memakai
// snake_case ("affiliate_store"), kolomnya juga snake_case ("store_name",
// "location") sesuai model App\Models\AffiliateLink.
export interface BookAffiliateLink {
  id: number;
  book_id?: number;
  affiliate_store_id?: number;
  url: string;
  store_name?: string;
  location?: string;
  affiliate_store?: {
    id: number;
    name: string;
    slug: string;
    logo_url?: string;
  };
}

export interface BookTiktokEmbed {
  id: number;
  book_id?: number;
  name?: string;
  title?: string;
  url_video?: string;
  embed_url?: string;
  sort_order?: number;
}

export interface BookModel {
  id: number;
  title: string;
  slug: string;
  synopsis?: string;
  short_description?: string;
  volume: string | number;
  sort_order?: number;
  msrp?: number | string;
  news_link?: string;
  isbn?: string;
  page_count?: number;
  paper_type?: string;
  dimensions?: string;
  adaptation?: string;
  is_upcoming?: boolean;
  views_count?: number;
  book_type: string; // e.g. "Novel", "Komik"
  age_rating: string;
  series_id?: number;
  edition_id?: number;
  publisher_id?: number;
  story_status_id?: number;
  created_at?: string;
  updated_at?: string;
  series?: {
    id: number;
    title: string;
  };
  edition?: {
    id: number;
    name: string;
  };
  storyStatus?: {
    id: number;
    name: string;
  };
  publisher?: {
    id: number;
    name: string;
  };
  images?: Array<{
    id: number;
    book_id: number;
    image_url: string;
    sort_order?: number;
  }>;
  authors?: Array<{
    id: number;
    name: string;
    pivot?: {
      role?: string;
    };
  }>;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  affiliateLinks?: BookAffiliateLink[];
  affiliate_links?: BookAffiliateLink[];
  tiktokEmbeds?: BookTiktokEmbed[];
  tiktok_embeds?: BookTiktokEmbed[];
}

/**
 * Kolom `volume` di tabel books bertipe string dan boleh diisi angka ("1", "16.5")
 * maupun teks bebas ("Limited Edition"). Angka dikembalikan sebagai number agar
 * perbandingan dan pengurutan tetap benar, sedangkan teks dipertahankan apa adanya —
 * parseInt() akan mengubahnya menjadi NaN sehingga tampil sebagai "NaN" di label volume.
 */
function normalizeVolumeValue(volume: string | number | null | undefined): number | string {
  if (typeof volume === 'number') return volume;

  const raw = String(volume ?? '').trim();
  if (raw === '') return '';

  const numeric = Number(raw);
  return Number.isFinite(numeric) ? numeric : raw;
}

export function mapBooksToComics(books: BookModel[]): Comic[] {
  if (!books || books.length === 0) return [];

  // Group books by series_id if available, otherwise treat as single book entry
  const groups = new Map<string, BookModel[]>();

  books.forEach((book) => {
    const key = book.series_id ? `series-${book.series_id}` : `book-${book.id}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(book);
  });

  const comics: Comic[] = [];

  groups.forEach((groupBooks, key) => {
    // Sort by sort_order if available, otherwise fall back to volume string
    groupBooks.sort((a, b) => {
        const aOrder = a.sort_order ?? 0;
        const bOrder = b.sort_order ?? 0;

        if (aOrder !== undefined || bOrder !== undefined) {
            if (aOrder !== bOrder) {
                return aOrder - bOrder;
            }
        }

        // Fallback: natural sort comparing volume values
        const aVol = String(a.volume || '').toLowerCase();
        const bVol = String(b.volume || '').toLowerCase();

        // Jika kedua volume numerik, bandingkan sebagai angka
        if (/^\d+$/.test(aVol) && /^\d+$/.test(bVol)) {
            return Number(aVol) - Number(bVol);
        }

        return aVol.localeCompare(bVol);
    });
 
    const mainBook = groupBooks[0];

    const title = mainBook.series?.title || mainBook.title;
    const slug = mainBook.slug;

    // Collect all alternative slugs from all books in the series for flexible matching
    const altSlugs = groupBooks
      .map(b => b.slug)
      .filter(s => s && s !== slug)
      .filter((v, i, a) => a.indexOf(v) === i); // unique values


    // Authors
    const storyAuthors: string[] = [];
    const artAuthors: string[] = [];
    groupBooks.forEach((b) => {
      b.authors?.forEach((a) => {
        const role = (a.pivot?.role || '').toLowerCase();
        if (role.includes('art') || role.includes('gambar') || role.includes('illustrator')) {
          if (!artAuthors.includes(a.name)) artAuthors.push(a.name);
        } else {
          if (!storyAuthors.includes(a.name)) storyAuthors.push(a.name);
        }
      });
    });

    const authorStory = storyAuthors.join(', ') || (mainBook.authors && mainBook.authors.length > 0 ? mainBook.authors.map(a => a.name).join(', ') : 'Unknown Author');
    const authorArt = artAuthors.join(', ') || authorStory;

    // Category mapping (supports all BookType enum values from backend)
    const category = mapBookTypeToCategory(mainBook.book_type);

    // Status mapping
    const statusName = (mainBook.storyStatus?.name || '').toLowerCase();
    const status: 'ongoing' | 'completed' = (statusName.includes('tamat') || statusName.includes('complete') || statusName.includes('completed')) ? 'completed' : 'ongoing';
    const statusId = mainBook.story_status_id ? String(mainBook.story_status_id) : (mainBook.storyStatus?.id ? String(mainBook.storyStatus.id) : undefined);

    // Demographic mapping
    let demographic: 'Shonen' | 'Shojo' | 'Seinen' | 'Josei' | 'General' = 'Shonen';
    if (mainBook.age_rating === 'Anak & Bimbingan Orang Tua') {
      demographic = 'General';
    } else if (mainBook.age_rating === 'Dewasa Berat' || mainBook.age_rating === 'Dewasa Ringan') {
      demographic = 'Seinen';
    }

    // Genres
    const genresSet = new Set<string>();
    groupBooks.forEach((b) => {
      b.genres?.forEach((g) => genresSet.add(g.name));
    });
    const genres = Array.from(genresSet);
    if (genres.length === 0) {
      genres.push('Action', 'Fantasy');
    }

    // Cover Image
    const coverImage = mainBook.images && mainBook.images.length > 0 ? mainBook.images[0].image_url : undefined;

    // Total views for comic series
    const totalViews = groupBooks.reduce((sum, b) => sum + (b.views_count || 0), 0);

    // Volumes mapping
    const volumes: Volume[] = groupBooks.map((b) => {
      const volCover = b.images && b.images.length > 0 ? b.images[0].image_url : coverImage;

      // Affiliate links map
      const affiliateLinksObj: { gramedia: string; shopee: string; tokopedia: string } = {
        gramedia: '',
        shopee: '',
        tokopedia: '',
      };

        const rawAffiliateLinks = b.affiliateLinks || b.affiliate_links || [];
        const affiliateLinksList: Array<{
          id: string;
          url: string;
          storeName: string;
          storeSlug: string;
          brand: string;
          brandSlug: string;
          logoUrl?: string;
          location?: string;
        }> = [];

        rawAffiliateLinks.forEach((link) => {
          const brand = link.affiliate_store?.name || link.affiliate_store?.slug || '';
          const brandSlug = link.affiliate_store?.slug || brand.toLowerCase().replace(/\s+/g, '-');
          const brandLower = brand.toLowerCase();
          const storeName = link.store_name?.trim() ? link.store_name.trim() : 'Official Store';
          const storeSlug = link.affiliate_store?.slug || brand.toLowerCase().replace(/\s+/g, '-');

          if (brandLower.includes('gramedia')) affiliateLinksObj.gramedia = link.url;
          else if (brandLower.includes('shopee')) affiliateLinksObj.shopee = link.url;
          else if (brandLower.includes('tokopedia')) affiliateLinksObj.tokopedia = link.url;

          affiliateLinksList.push({
            id: String(link.id || Math.random()),
            url: link.url,
            storeName,
            storeSlug,
            brand: brand || storeName,
            brandSlug: brandSlug || storeSlug,
            logoUrl: link.affiliate_store?.logo_url,
            location: link.location || undefined,
          });
        });

      const bookImages = b.images && b.images.length > 0 ? b.images.map(img => img.image_url) : (volCover ? [volCover] : []);

      const rawEmbeds = b.tiktokEmbeds || b.tiktok_embeds || [];

      // Volume-specific author extraction
      const volStoryAuthors: string[] = [];
      const volArtAuthors: string[] = [];
      b.authors?.forEach((a) => {
        const role = (a.pivot?.role || '').toLowerCase();
        if (role.includes('art') || role.includes('gambar') || role.includes('illustrator')) {
          if (!volArtAuthors.includes(a.name)) volArtAuthors.push(a.name);
        } else {
          if (!volStoryAuthors.includes(a.name)) volStoryAuthors.push(a.name);
        }
      });
      const volAuthorStory = volStoryAuthors.join(', ') || undefined;
      const volAuthorArt = volArtAuthors.join(', ') || undefined;

      return {
        id: b.id,
        bookId: b.id,
        views_count: b.views_count || 0,
        volNumber: normalizeVolumeValue(b.volume),
        sort_order: b.sort_order,
        title: b.title,
        releaseDate: b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '2026',
        releaseAt: b.created_at ? new Date(b.created_at).getTime() : undefined,
        coverImage: volCover,
        images: bookImages,
        isbn: b.isbn || undefined,
        pages: b.page_count || undefined,
        paperType: b.paper_type || undefined,
        dimensions: b.dimensions || undefined,
        synopsis: b.synopsis || mainBook.synopsis || undefined,
        news_link: b.news_link || undefined,
        newsLink: b.news_link || undefined,
        cetakanInfo: b.edition?.name ? `Edisi ${b.edition.name}` : 'Cetakan Resmi Indonesia',
        editionName: b.edition?.name || undefined,
        authorStory: volAuthorStory,
        authorArt: volAuthorArt,
        price: typeof b.msrp === 'string' ? parseFloat(b.msrp) : (b.msrp || 0),
        isUpcoming: Boolean(b.is_upcoming),
        affiliateLinks: affiliateLinksObj,
        affiliateLinksList,
        tiktokEmbeds: rawEmbeds.map((t) => ({
          id: String(t.id),
          title: t.name || t.title || `Review TikTok`,
          name: t.name || t.title || `Review TikTok`,
          embed_url: t.url_video || t.embed_url || '',
          url_video: t.url_video || t.embed_url || '',
          sort_order: t.sort_order
        }))
      };
    });

    // Map reading rating
    type ReadingRating = 'Anak & Bimbingan Orang Tua' | 'Remaja' | 'Dewasa Ringan' | 'Dewasa Berat';
    let readingRating: ReadingRating = 'Remaja';
    if ((['Anak & Bimbingan Orang Tua', 'Remaja', 'Dewasa Ringan', 'Dewasa Berat'] as readonly string[]).includes(mainBook.age_rating)) {
      readingRating = mainBook.age_rating as ReadingRating;
    }

    const comicTikTokEmbeds = volumes.flatMap(v => v.tiktokEmbeds || []);

     comics.push({
      id: key,
      bookId: mainBook.id,
      views_count: totalViews,
      title,
      slug,
      altSlugs,
      synopsis: mainBook.synopsis || mainBook.short_description || '',
      news_link: mainBook.news_link || undefined,
      newsLink: mainBook.news_link || undefined,
      category,
      coverImage,
      rating: 9.0,
      status,
      statusId,
      statusName: mainBook.storyStatus?.name,
      demographic,
      genres,
      publisherId: String(mainBook.publisher_id || 'p1'),
      publisherName: mainBook.publisher?.name || 'Penerbit Indonesia',
      totalVolumesKnown: status === 'completed' ? `${groupBooks.length} Volume (Tamat)` : `Ongoing (${groupBooks.length} Volume)`,
      firstPublishedInId: '2026',
      isFeatured: true,
      isUpcoming: groupBooks.some(b => Boolean(b.is_upcoming)),
      volumes,
      readingRating,
      authorStory,
      authorArt,
      adaptation: mainBook.adaptation || undefined,
      paperType: mainBook.paper_type || undefined,
      dimensions: mainBook.dimensions || undefined,
      tiktokEmbeds: comicTikTokEmbeds,
    });
  });

  return comics;
}

export function mapBookTypeToCategory(bookType: string | undefined): Comic['category'] {
  if (!bookType) return 'manga';
  // Pemisah disamakan dulu supaya nilai enum ("Light Novel", "J-Lit (Japanese Literature)")
  // maupun bentuk snake_case ("light_novel", "komik_lokal") sama-sama dikenali.
  const bType = bookType.toLowerCase().replace(/[_-]+/g, ' ').trim();

  if (bType.includes('light novel') || (bType.includes('light') && bType.includes('novel'))) {
    return 'light_novel';
  }
  // Dicek sebelum 'komik' agar "Komik Lokal" tidak jatuh menjadi "Komik".
  if (bType.includes('komik lokal')) {
    return 'komik_lokal';
  }
  if (bType.includes('komik')) {
    return 'komik';
  }
  if (bType.includes('novel')) {
    return 'novel';
  }
  if (bType.includes('j lit') || bType.includes('japanese literature')) {
    return 'j_lit';
  }
  return 'manga';
}

export const BOOK_TYPE_LABELS: Record<string, string> = {
  manga: 'Manga',
  komik: 'Komik',
  komik_lokal: 'Komik Lokal',
  light_novel: 'Light Novel',
  novel: 'Novel',
  j_lit: 'J Lit',
};

export function getBookTypeLabel(category: string | undefined): string {
  if (!category) return 'Buku';
  const key = category.toLowerCase().replace(/[\s-]+/g, '_');
  return BOOK_TYPE_LABELS[key] || BOOK_TYPE_LABELS[category.toLowerCase().replace(/\s+/g, '_')] || category.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
}
