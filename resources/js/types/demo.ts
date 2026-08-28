export interface Creator {
  name: string;
  role: 'Author' | 'Illustrator' | 'Author & Illustrator';
}

export interface Volume {
  volNumber: number;
  title?: string;
  releaseDate: string;
  coverImage?: string;
  isbn?: string;
  pages?: number;
  paperType?: string;
  dimensions?: string;
  synopsis?: string;
  news_link?: string;
  newsLink?: string;
  cetakanInfo: string; // e.g. "Cetakan I: 2024 (Edisi Baru kertas premium) | Cetakan Lama: 2004 (Kertas koran)"
  editionName?: string;
  price: number; // in IDR
  isUpcoming?: boolean;
  images?: string[];
  affiliateLinks: {
    gramedia: string;
    shopee: string;
    tokopedia: string;
  };
  affiliateLinksList?: {
    id: string;
    url: string;
    storeName: string;
    storeSlug: string;
    logoUrl?: string;
  }[];
  animeAdaptation?: {
    platformName: string;
    watchLink: string;
    platformLogo?: string;
  }[];
  liveActionAdaptation?: {
    platformName: string;
    watchLink: string;
    platformLogo?: string;
  }[];
  reviewShort?: {
    platform: 'tiktok' | 'instagram';
    videoId: string;
    views: string;
    title: string;
    duration: string;
  };
  id?: number | string;
  bookId?: number | string;
  views_count?: number;
  tiktokEmbeds?: {
    id: string;
    name?: string;
    title?: string;
    url_video?: string;
    embed_url?: string;
    sort_order?: number;
  }[];
}

export interface Comic {
  id: string;
  bookId?: number | string;
  views_count?: number;
  title: string;
  slug: string;
  synopsis: string;
  news_link?: string;
  newsLink?: string;
  category: 'manga' | 'light_novel' | 'novel';
  coverImage?: string;
  rating: number; // e.g. 8.9
  status: 'ongoing' | 'completed';
  statusId?: string;
  statusName?: string;
  demographic: 'Shonen' | 'Shojo' | 'Seinen' | 'Josei' | 'General';
  genres: string[];
  publisherId: string;
  publisherName: string;
  originalPublisher?: string;
  totalVolumesKnown: string; // e.g., "74 Volumes" or "Ongoing (Currently 15 in ID)"
  firstPublishedInId: string; // e.g., "2023"
  isFeatured?: boolean;
  isUpcoming?: boolean;
  volumes: Volume[];
  readingRating?: 'Anak & Bimbingan Orang Tua' | 'Remaja' | 'Dewasa Ringan' | 'Dewasa Berat';
  authorStory?: string;
  authorArt?: string;
  adaptation?: string;
  paperType?: string;
  dimensions?: string;
  tiktokEmbeds?: {
    id: string;
    name?: string;
    title?: string;
    url_video?: string;
    embed_url?: string;
    sort_order?: number;
  }[];
}

export interface PreOwnedItem {
  id: string;
  comicTitle: string;
  volumeNumber: number;
  originalPrice: number;
  salePrice: number;
  conditionRating: string; // e.g., "S" | "A" | "B" | "C" | "D" (Tier grading)
  notes: string;
  shopeeUrl: string;
  tokopediaUrl: string;
  isSoldOut?: boolean;
  coverImage?: string;
  carouselImages?: string[]; // Slide images
  carouselLabels?: string[]; // Labels for each image slide (e.g. "Cover Depan", "Punggung Buku (Spine)", "Cover Belakang", "Halaman Kertas")
  linkedComicId?: string; // Links to details in COMICS_DATA
}

export interface NewsRecommendationItem {
  number: number | string;
  title: string;
  description: string;
  comicId?: string;
  book_id?: number | string | null;
  tiktok_embed_id?: number | string | null;
  shortReview?: {
    id: string;
    title: string;
    views: string;
    duration: string;
    thumbnail: string;
    quote?: string;
    videoId?: string;
    url_video?: string;
  };
}

export interface NewsUpdate {
  id: string;
  username: string; // e.g., "norinoya_feed"
  displayName: string; // e.g., "Norinoya Feed"
  timestamp: string; // e.g., "2 jam yang lalu"
  title?: string;
  slug?: string;
  content: string;
  category: 'rilisan' | 'cetakan_ulang' | 'promo' | 'edukasi' | 'breaking' | 'event' | 'komunitas' | 'anime' | 'jepang' | 'game' | 'manga' | 'light_novel' | 'novel';
  hashTags: string[];
  attachedImage?: string;
  galleryImages?: string[];
  affiliateLink?: {
    label: string;
    url: string;
  };
  readingRating?: 'Dewasa Ringan' | 'Dewasa Berat';
  isPinned?: boolean;
  poll?: any;
  poll_question?: string;
  poll_options?: Array<{ id?: string; label?: string; votes?: number }>;
  reactions?: any[];
  recommendations?: NewsRecommendationItem[];
  relevant_books?: Array<number | string>;
  views_count?: number;
}
