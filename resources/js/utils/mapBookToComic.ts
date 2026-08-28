import { Comic, Volume } from '../types/demo';

export interface BookModel {
  id: number;
  title: string;
  slug: string;
  synopsis?: string;
  short_description?: string;
  volume: number;
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
  affiliateLinks?: Array<{
    id: number;
    book_id: number;
    affiliate_store_id: number;
    url: string;
    affiliate_store?: {
      id: number;
      name: string;
      slug: string;
      logo_url?: string;
    };
  }>;
  tiktokEmbeds?: Array<{
    id: number;
    book_id: number;
    name?: string;
    url_video?: string;
    embed_url?: string;
    sort_order?: number;
  }>;
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
    // Sort by volume ascending
    groupBooks.sort((a, b) => a.volume - b.volume);
    const mainBook = groupBooks[0];

    const title = mainBook.series?.title || mainBook.title;
    const slug = mainBook.slug;

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

    // Category mapping
    let category: 'manga' | 'light_novel' | 'novel' = 'manga';
    const bType = (mainBook.book_type || '').toLowerCase();
    if (bType.includes('novel')) {
      category = 'novel';
    } else if (bType.includes('light')) {
      category = 'light_novel';
    }

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

      const rawAffiliateLinks = b.affiliateLinks || (b as any).affiliate_links || [];
      const affiliateLinksList: Array<{ id: string; url: string; storeName: string; storeSlug: string; logoUrl?: string }> = [];

      rawAffiliateLinks.forEach((link: any) => {
        const storeName = link.affiliate_store?.name || link.affiliate_store?.slug || link.store_name || 'Toko Resmi';
        const storeSlug = link.affiliate_store?.slug || storeName.toLowerCase().replace(/\s+/g, '-');
        const lowerName = storeName.toLowerCase();

        if (lowerName.includes('gramedia')) affiliateLinksObj.gramedia = link.url;
        else if (lowerName.includes('shopee')) affiliateLinksObj.shopee = link.url;
        else if (lowerName.includes('tokopedia')) affiliateLinksObj.tokopedia = link.url;

        affiliateLinksList.push({
          id: String(link.id || Math.random()),
          url: link.url,
          storeName,
          storeSlug,
          logoUrl: link.affiliate_store?.logo_url,
        });
      });

      const bookImages = b.images && b.images.length > 0 ? b.images.map(img => img.image_url) : (volCover ? [volCover] : []);

      const rawEmbeds = b.tiktokEmbeds || (b as any).tiktok_embeds || [];

      return {
        id: b.id,
        bookId: b.id,
        views_count: b.views_count || 0,
        volNumber: b.volume,
        title: b.title,
        releaseDate: b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '2026',
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
        price: typeof b.msrp === 'string' ? parseFloat(b.msrp) : (b.msrp || 0),
        isUpcoming: Boolean(b.is_upcoming),
        affiliateLinks: affiliateLinksObj,
        affiliateLinksList,
        tiktokEmbeds: rawEmbeds.map((t: any) => ({
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
    let readingRating: 'Anak & Bimbingan Orang Tua' | 'Remaja' | 'Dewasa Ringan' | 'Dewasa Berat' = 'Remaja';
    if (['Anak & Bimbingan Orang Tua', 'Remaja', 'Dewasa Ringan', 'Dewasa Berat'].includes(mainBook.age_rating)) {
      readingRating = mainBook.age_rating as any;
    }

    const comicTikTokEmbeds = volumes.flatMap(v => v.tiktokEmbeds || []);

    comics.push({
      id: key,
      bookId: mainBook.id,
      views_count: totalViews,
      title,
      slug,
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
