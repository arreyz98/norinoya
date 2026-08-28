import { Comic, PreOwnedItem, NewsUpdate } from '../types/demo';

export const COMICS_DATA: Comic[] = [
  {
    id: 'naruto-bindup',
    title: 'Naruto Bind Up Edition',
    slug: 'naruto-bind-up',
    coverImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-in-1) ini menggabungkan 3 volume reguler menjadi 1 buku tebal premium.',
    category: 'manga',
    rating: 9.3,
    status: 'ongoing',
    demographic: 'Shonen',
    genres: ["Action", "Fantasy", "Adventure", "Ninja"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '24 Volumes',
    firstPublishedInId: '2023',
    isFeatured: true,
    authorStory: 'Masashi Kishimoto',
    authorArt: 'Masashi Kishimoto',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-87-001-3',
        pages: 200,
        synopsis: 'Naruto Bind Up Edition Vol 1. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-87-002-6',
        pages: 208,
        synopsis: 'Naruto Bind Up Edition Vol 2. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-87-003-0',
        pages: 216,
        synopsis: 'Naruto Bind Up Edition Vol 3. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-87-004-3',
        pages: 224,
        synopsis: 'Naruto Bind Up Edition Vol 4. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-87-005-6',
        pages: 232,
        synopsis: 'Naruto Bind Up Edition Vol 5. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-87-006-0',
        pages: 240,
        synopsis: 'Naruto Bind Up Edition Vol 6. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-87-007-3',
        pages: 248,
        synopsis: 'Naruto Bind Up Edition Vol 7. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 8,
        releaseDate: '8 Sep 2021',
        isbn: '978-623-87-008-6',
        pages: 196,
        synopsis: 'Naruto Bind Up Edition Vol 8. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 9,
        releaseDate: '12 Okt 2022',
        isbn: '978-623-87-009-0',
        pages: 204,
        synopsis: 'Naruto Bind Up Edition Vol 9. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 10,
        releaseDate: '16 Nov 2023',
        isbn: '978-623-87-010-3',
        pages: 212,
        synopsis: 'Naruto Bind Up Edition Vol 10. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 11,
        releaseDate: '20 Des 2024',
        isbn: '978-623-87-011-6',
        pages: 220,
        synopsis: 'Naruto Bind Up Edition Vol 11. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 12,
        releaseDate: '1 Agt 2026',
        isbn: '978-623-87-012-0',
        pages: 228,
        synopsis: 'Naruto Bind Up Edition Vol 12. Naruto Uzumaki adalah seorang ninja remaja yang nakal namun bercita-cita tinggi untuk menjadi Hokage. Edisi Bind-Up (3-i...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'frieren-manga',
    title: 'Frieren: After the End',
    slug: 'frieren-after-the-end',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manusia.',
    category: 'manga',
    rating: 9.6,
    status: 'ongoing',
    demographic: 'Shonen',
    genres: ["Adventure", "Fantasy", "Drama", "Slice of Life"],
    publisherId: 'akasha',
    publisherName: 'm&c! (AKASHA)',
    totalVolumesKnown: '13 Volumes',
    firstPublishedInId: '2022',
    isFeatured: true,
    authorStory: 'Kanehito Yamada',
    authorArt: 'Tsukasa Abe',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-23-001-3',
        pages: 200,
        synopsis: 'Frieren: After the End Vol 1. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-23-002-6',
        pages: 208,
        synopsis: 'Frieren: After the End Vol 2. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-23-003-0',
        pages: 216,
        synopsis: 'Frieren: After the End Vol 3. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-23-004-3',
        pages: 224,
        synopsis: 'Frieren: After the End Vol 4. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-23-005-6',
        pages: 232,
        synopsis: 'Frieren: After the End Vol 5. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-23-006-0',
        pages: 240,
        synopsis: 'Frieren: After the End Vol 6. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-23-007-3',
        pages: 248,
        synopsis: 'Frieren: After the End Vol 7. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 8,
        releaseDate: '8 Sep 2021',
        isbn: '978-623-23-008-6',
        pages: 196,
        synopsis: 'Frieren: After the End Vol 8. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 9,
        releaseDate: '12 Okt 2022',
        isbn: '978-623-23-009-0',
        pages: 204,
        synopsis: 'Frieren: After the End Vol 9. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 10,
        releaseDate: '16 Nov 2023',
        isbn: '978-623-23-010-3',
        pages: 212,
        synopsis: 'Frieren: After the End Vol 10. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 11,
        releaseDate: '20 Des 2024',
        isbn: '978-623-23-011-6',
        pages: 220,
        synopsis: 'Frieren: After the End Vol 11. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 12,
        releaseDate: '1 Agt 2026',
        isbn: '978-623-23-012-0',
        pages: 228,
        synopsis: 'Frieren: After the End Vol 12. Petualangan penyihir elf Frieren setelah mengalahkan Raja Iblis bersama kelompok pahlawan. Memahami arti kehidupan manus...',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'solo-leveling-ln',
    title: 'Solo Leveling (Light Novel)',
    slug: 'solo-leveling-light-novel',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Sung Jinwoo, hunter terlemah pangkat E, mendapatkan kemampuan rahasia untuk naik level tanpa batas di dungeon berbahaya.',
    category: 'light_novel',
    rating: 9.4,
    status: 'completed',
    demographic: 'Shonen',
    genres: ["Action", "Fantasy", "Adventure"],
    publisherId: 'geekmode',
    publisherName: 'geekmode.id',
    totalVolumesKnown: '8 Volumes',
    firstPublishedInId: '2023',
    isFeatured: true,
    authorStory: 'Chugong',
    authorArt: 'DUBU',
    readingRating: 'Dewasa Ringan',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-12-001-3',
        pages: 200,
        synopsis: 'Solo Leveling (Light Novel) Vol 1. Sung Jinwoo, hunter terlemah pangkat E, mendapatkan kemampuan rahasia untuk naik level tanpa batas di dungeon berbahaya....',
        cetakanInfo: 'Cetakan Resmi Indonesia (geekmode.id).',
        price: 135000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-12-002-6',
        pages: 208,
        synopsis: 'Solo Leveling (Light Novel) Vol 2. Sung Jinwoo, hunter terlemah pangkat E, mendapatkan kemampuan rahasia untuk naik level tanpa batas di dungeon berbahaya....',
        cetakanInfo: 'Cetakan Resmi Indonesia (geekmode.id).',
        price: 135000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-12-003-0',
        pages: 216,
        synopsis: 'Solo Leveling (Light Novel) Vol 3. Sung Jinwoo, hunter terlemah pangkat E, mendapatkan kemampuan rahasia untuk naik level tanpa batas di dungeon berbahaya....',
        cetakanInfo: 'Cetakan Resmi Indonesia (geekmode.id).',
        price: 135000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-12-004-3',
        pages: 224,
        synopsis: 'Solo Leveling (Light Novel) Vol 4. Sung Jinwoo, hunter terlemah pangkat E, mendapatkan kemampuan rahasia untuk naik level tanpa batas di dungeon berbahaya....',
        cetakanInfo: 'Cetakan Resmi Indonesia (geekmode.id).',
        price: 135000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-12-005-6',
        pages: 232,
        synopsis: 'Solo Leveling (Light Novel) Vol 5. Sung Jinwoo, hunter terlemah pangkat E, mendapatkan kemampuan rahasia untuk naik level tanpa batas di dungeon berbahaya....',
        cetakanInfo: 'Cetakan Resmi Indonesia (geekmode.id).',
        price: 135000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-12-006-0',
        pages: 240,
        synopsis: 'Solo Leveling (Light Novel) Vol 6. Sung Jinwoo, hunter terlemah pangkat E, mendapatkan kemampuan rahasia untuk naik level tanpa batas di dungeon berbahaya....',
        cetakanInfo: 'Cetakan Resmi Indonesia (geekmode.id).',
        price: 135000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'fuden-shigusa-ln',
    title: 'Fuden Shigusa (Light Novel)',
    slug: 'fuden-shigusa',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Kisah misteri sastra klasik Jepang tentang surat-surat tua dan pesan tersembunyi antar generasi.',
    category: 'light_novel',
    rating: 8.8,
    status: 'ongoing',
    demographic: 'General',
    genres: ["Mystery", "Drama", "Slice of Life"],
    publisherId: 'mnc',
    publisherName: 'm&c!',
    totalVolumesKnown: '4 Volumes',
    firstPublishedInId: '2024',
    isFeatured: false,
    authorStory: 'Keigo Higashino',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-54-001-3',
        pages: 200,
        synopsis: 'Fuden Shigusa (Light Novel) Vol 1. Kisah misteri sastra klasik Jepang tentang surat-surat tua dan pesan tersembunyi antar generasi....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 88000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-54-002-6',
        pages: 208,
        synopsis: 'Fuden Shigusa (Light Novel) Vol 2. Kisah misteri sastra klasik Jepang tentang surat-surat tua dan pesan tersembunyi antar generasi....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 88000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'blue-lock-manga',
    title: 'Blue Lock',
    slug: 'blue-lock',
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&auto=format&fit=crop&q=80',
    synopsis: '300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di dunia.',
    category: 'manga',
    rating: 9.1,
    status: 'ongoing',
    demographic: 'Shonen',
    genres: ["Sports", "Action", "Psychological"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '28 Volumes',
    firstPublishedInId: '2022',
    isFeatured: false,
    authorStory: 'Muneyuki Kaneshiro',
    authorArt: 'Yusuke Nomura',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-25-001-3',
        pages: 200,
        synopsis: 'Blue Lock Vol 1. 300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di d...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-25-002-6',
        pages: 208,
        synopsis: 'Blue Lock Vol 2. 300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di d...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-25-003-0',
        pages: 216,
        synopsis: 'Blue Lock Vol 3. 300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di d...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-25-004-3',
        pages: 224,
        synopsis: 'Blue Lock Vol 4. 300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di d...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-25-005-6',
        pages: 232,
        synopsis: 'Blue Lock Vol 5. 300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di d...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-25-006-0',
        pages: 240,
        synopsis: 'Blue Lock Vol 6. 300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di d...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-25-007-3',
        pages: 248,
        synopsis: 'Blue Lock Vol 7. 300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di d...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 8,
        releaseDate: '1 Agt 2026',
        isbn: '978-623-25-008-6',
        pages: 196,
        synopsis: 'Blue Lock Vol 8. 300 penyerang sepak bola muda dikumpulkan di fasilitas Blue Lock untuk menciptakan striker paling egois dan tangguh di d...',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'namiya-novel',
    title: 'Keajaiban Toko Kelontong Namiya',
    slug: 'keajaiban-toko-kelontong-namiya',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Tiga pencuri muda bersembunyi di toko kelontong tua dan mulai menerima surat-surat konseling dari masa lalu.',
    category: 'novel',
    rating: 9.5,
    status: 'completed',
    demographic: 'General',
    genres: ["Drama", "Mystery", "Fantasy", "Slice of Life"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '1 Volume',
    firstPublishedInId: '2020',
    isFeatured: false,
    authorStory: 'Keigo Higashino',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-68-001-3',
        pages: 200,
        synopsis: 'Keajaiban Toko Kelontong Namiya Vol 1. Tiga pencuri muda bersembunyi di toko kelontong tua dan mulai menerima surat-surat konseling dari masa lalu....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 98000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'jujutsu-kaisen-manga',
    title: 'Jujutsu Kaisen',
    slug: 'jujutsu-kaisen',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat.',
    category: 'manga',
    rating: 9.2,
    status: 'ongoing',
    demographic: 'Shonen',
    genres: ["Action", "Supernatural", "Fantasy"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '26 Volumes',
    firstPublishedInId: '2021',
    isFeatured: false,
    authorStory: 'Gege Akutami',
    authorArt: 'Gege Akutami',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-10-001-3',
        pages: 200,
        synopsis: 'Jujutsu Kaisen Vol 1. Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-10-002-6',
        pages: 208,
        synopsis: 'Jujutsu Kaisen Vol 2. Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-10-003-0',
        pages: 216,
        synopsis: 'Jujutsu Kaisen Vol 3. Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-10-004-3',
        pages: 224,
        synopsis: 'Jujutsu Kaisen Vol 4. Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-10-005-6',
        pages: 232,
        synopsis: 'Jujutsu Kaisen Vol 5. Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-10-006-0',
        pages: 240,
        synopsis: 'Jujutsu Kaisen Vol 6. Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-10-007-3',
        pages: 248,
        synopsis: 'Jujutsu Kaisen Vol 7. Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 8,
        releaseDate: '1 Agt 2026',
        isbn: '978-623-10-008-6',
        pages: 196,
        synopsis: 'Jujutsu Kaisen Vol 8. Yuji Itadori menelan jari terkutuk Ryomen Sukuna dan masuk ke SMA Jujutsu untuk memusnahkan roh jahat....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'one-piece-manga',
    title: 'One Piece',
    slug: 'one-piece',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece.',
    category: 'manga',
    rating: 9.8,
    status: 'ongoing',
    demographic: 'Shonen',
    genres: ["Action", "Adventure", "Fantasy", "Comedy"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '108 Volumes',
    firstPublishedInId: '2002',
    isFeatured: false,
    authorStory: 'Eiichiro Oda',
    authorArt: 'Eiichiro Oda',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-45-001-3',
        pages: 200,
        synopsis: 'One Piece Vol 1. Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-45-002-6',
        pages: 208,
        synopsis: 'One Piece Vol 2. Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-45-003-0',
        pages: 216,
        synopsis: 'One Piece Vol 3. Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-45-004-3',
        pages: 224,
        synopsis: 'One Piece Vol 4. Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-45-005-6',
        pages: 232,
        synopsis: 'One Piece Vol 5. Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-45-006-0',
        pages: 240,
        synopsis: 'One Piece Vol 6. Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-45-007-3',
        pages: 248,
        synopsis: 'One Piece Vol 7. Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 8,
        releaseDate: '1 Agt 2026',
        isbn: '978-623-45-008-6',
        pages: 196,
        synopsis: 'One Piece Vol 8. Monkey D. Luffy berlayar mengarungi Grand Line bersama Bajak Laut Topi Jerami untuk menemukan harta karun One Piece....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'chainsaw-man-manga',
    title: 'Chainsaw Man',
    slug: 'chainsaw-man',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man.',
    category: 'manga',
    rating: 9.3,
    status: 'ongoing',
    demographic: 'Shonen',
    genres: ["Action", "Dark Fantasy", "Horror", "Comedy"],
    publisherId: 'akasha',
    publisherName: 'm&c! (AKASHA)',
    totalVolumesKnown: '16 Volumes',
    firstPublishedInId: '2023',
    isFeatured: false,
    authorStory: 'Tatsuki Fujimoto',
    authorArt: 'Tatsuki Fujimoto',
    readingRating: 'Dewasa Ringan',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-15-001-3',
        pages: 200,
        synopsis: 'Chainsaw Man Vol 1. Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-15-002-6',
        pages: 208,
        synopsis: 'Chainsaw Man Vol 2. Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-15-003-0',
        pages: 216,
        synopsis: 'Chainsaw Man Vol 3. Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-15-004-3',
        pages: 224,
        synopsis: 'Chainsaw Man Vol 4. Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-15-005-6',
        pages: 232,
        synopsis: 'Chainsaw Man Vol 5. Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-15-006-0',
        pages: 240,
        synopsis: 'Chainsaw Man Vol 6. Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-15-007-3',
        pages: 248,
        synopsis: 'Chainsaw Man Vol 7. Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 8,
        releaseDate: '1 Agt 2026',
        isbn: '978-623-15-008-6',
        pages: 196,
        synopsis: 'Chainsaw Man Vol 8. Denji berinteraksi dengan iblis gergaji Pochita dan dibangkitkan kembali sebagai Chainsaw Man....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'demon-slayer-manga',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    slug: 'demon-slayer',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Tanjiro Kamado menjadi pemburu iblis demi menyelamatkan adiknya Nezuko yang diubah menjadi iblis.',
    category: 'manga',
    rating: 9.0,
    status: 'completed',
    demographic: 'Shonen',
    genres: ["Action", "Historical", "Supernatural"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '23 Volumes',
    firstPublishedInId: '2020',
    isFeatured: false,
    authorStory: 'Koyoharu Gotouge',
    authorArt: 'Koyoharu Gotouge',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-68-001-3',
        pages: 200,
        synopsis: 'Demon Slayer: Kimetsu no Yaiba Vol 1. Tanjiro Kamado menjadi pemburu iblis demi menyelamatkan adiknya Nezuko yang diubah menjadi iblis....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-68-002-6',
        pages: 208,
        synopsis: 'Demon Slayer: Kimetsu no Yaiba Vol 2. Tanjiro Kamado menjadi pemburu iblis demi menyelamatkan adiknya Nezuko yang diubah menjadi iblis....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-68-003-0',
        pages: 216,
        synopsis: 'Demon Slayer: Kimetsu no Yaiba Vol 3. Tanjiro Kamado menjadi pemburu iblis demi menyelamatkan adiknya Nezuko yang diubah menjadi iblis....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-68-004-3',
        pages: 224,
        synopsis: 'Demon Slayer: Kimetsu no Yaiba Vol 4. Tanjiro Kamado menjadi pemburu iblis demi menyelamatkan adiknya Nezuko yang diubah menjadi iblis....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-68-005-6',
        pages: 232,
        synopsis: 'Demon Slayer: Kimetsu no Yaiba Vol 5. Tanjiro Kamado menjadi pemburu iblis demi menyelamatkan adiknya Nezuko yang diubah menjadi iblis....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-68-006-0',
        pages: 240,
        synopsis: 'Demon Slayer: Kimetsu no Yaiba Vol 6. Tanjiro Kamado menjadi pemburu iblis demi menyelamatkan adiknya Nezuko yang diubah menjadi iblis....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-68-007-3',
        pages: 248,
        synopsis: 'Demon Slayer: Kimetsu no Yaiba Vol 7. Tanjiro Kamado menjadi pemburu iblis demi menyelamatkan adiknya Nezuko yang diubah menjadi iblis....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'tokyo-revengers-manga',
    title: 'Tokyo Revengers',
    slug: 'tokyo-revengers',
    coverImage: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Takemichi Hanagaki kembali ke masa lalu 12 tahun untuk menyelamatkan mantan kekasihnya Hinata.',
    category: 'manga',
    rating: 8.9,
    status: 'completed',
    demographic: 'Shonen',
    genres: ["Action", "Drama", "Time Travel"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '31 Volumes',
    firstPublishedInId: '2022',
    isFeatured: false,
    authorStory: 'Ken Wakui',
    authorArt: 'Ken Wakui',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-70-001-3',
        pages: 200,
        synopsis: 'Tokyo Revengers Vol 1. Takemichi Hanagaki kembali ke masa lalu 12 tahun untuk menyelamatkan mantan kekasihnya Hinata....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-70-002-6',
        pages: 208,
        synopsis: 'Tokyo Revengers Vol 2. Takemichi Hanagaki kembali ke masa lalu 12 tahun untuk menyelamatkan mantan kekasihnya Hinata....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-70-003-0',
        pages: 216,
        synopsis: 'Tokyo Revengers Vol 3. Takemichi Hanagaki kembali ke masa lalu 12 tahun untuk menyelamatkan mantan kekasihnya Hinata....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-70-004-3',
        pages: 224,
        synopsis: 'Tokyo Revengers Vol 4. Takemichi Hanagaki kembali ke masa lalu 12 tahun untuk menyelamatkan mantan kekasihnya Hinata....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-70-005-6',
        pages: 232,
        synopsis: 'Tokyo Revengers Vol 5. Takemichi Hanagaki kembali ke masa lalu 12 tahun untuk menyelamatkan mantan kekasihnya Hinata....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-70-006-0',
        pages: 240,
        synopsis: 'Tokyo Revengers Vol 6. Takemichi Hanagaki kembali ke masa lalu 12 tahun untuk menyelamatkan mantan kekasihnya Hinata....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-70-007-3',
        pages: 248,
        synopsis: 'Tokyo Revengers Vol 7. Takemichi Hanagaki kembali ke masa lalu 12 tahun untuk menyelamatkan mantan kekasihnya Hinata....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'oshi-no-ko-manga',
    title: 'Oshi no Ko',
    slug: 'oshi-no-ko',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Dokter Goro direinkarnasi menjadi anak dari idol pujaannya Ai Hoshino dan memasuki panggung hiburan Jepang.',
    category: 'manga',
    rating: 9.2,
    status: 'ongoing',
    demographic: 'Seinen',
    genres: ["Drama", "Mystery", "Psychological"],
    publisherId: 'akasha',
    publisherName: 'm&c! (AKASHA)',
    totalVolumesKnown: '14 Volumes',
    firstPublishedInId: '2023',
    isFeatured: false,
    authorStory: 'Aka Akasaka',
    authorArt: 'Mengo Yokoyari',
    readingRating: 'Dewasa Ringan',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-30-001-3',
        pages: 200,
        synopsis: 'Oshi no Ko Vol 1. Dokter Goro direinkarnasi menjadi anak dari idol pujaannya Ai Hoshino dan memasuki panggung hiburan Jepang....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-30-002-6',
        pages: 208,
        synopsis: 'Oshi no Ko Vol 2. Dokter Goro direinkarnasi menjadi anak dari idol pujaannya Ai Hoshino dan memasuki panggung hiburan Jepang....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-30-003-0',
        pages: 216,
        synopsis: 'Oshi no Ko Vol 3. Dokter Goro direinkarnasi menjadi anak dari idol pujaannya Ai Hoshino dan memasuki panggung hiburan Jepang....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-30-004-3',
        pages: 224,
        synopsis: 'Oshi no Ko Vol 4. Dokter Goro direinkarnasi menjadi anak dari idol pujaannya Ai Hoshino dan memasuki panggung hiburan Jepang....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-30-005-6',
        pages: 232,
        synopsis: 'Oshi no Ko Vol 5. Dokter Goro direinkarnasi menjadi anak dari idol pujaannya Ai Hoshino dan memasuki panggung hiburan Jepang....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-30-006-0',
        pages: 240,
        synopsis: 'Oshi no Ko Vol 6. Dokter Goro direinkarnasi menjadi anak dari idol pujaannya Ai Hoshino dan memasuki panggung hiburan Jepang....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-30-007-3',
        pages: 248,
        synopsis: 'Oshi no Ko Vol 7. Dokter Goro direinkarnasi menjadi anak dari idol pujaannya Ai Hoshino dan memasuki panggung hiburan Jepang....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c! (AKASHA)).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'kaiju-no-8-manga',
    title: 'Kaiju No. 8',
    slug: 'kaiju-no-8',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Kafka Hibino, pria 32 tahun pembersih bangkai monster, mendapatkan kekuatan untuk berubah menjadi Kaiju No. 8.',
    category: 'manga',
    rating: 8.9,
    status: 'ongoing',
    demographic: 'Shonen',
    genres: ["Action", "Sci-Fi", "Comedy"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '12 Volumes',
    firstPublishedInId: '2022',
    isFeatured: false,
    authorStory: 'Naoya Matsumoto',
    authorArt: 'Naoya Matsumoto',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-49-001-3',
        pages: 200,
        synopsis: 'Kaiju No. 8 Vol 1. Kafka Hibino, pria 32 tahun pembersih bangkai monster, mendapatkan kekuatan untuk berubah menjadi Kaiju No. 8....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-49-002-6',
        pages: 208,
        synopsis: 'Kaiju No. 8 Vol 2. Kafka Hibino, pria 32 tahun pembersih bangkai monster, mendapatkan kekuatan untuk berubah menjadi Kaiju No. 8....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-49-003-0',
        pages: 216,
        synopsis: 'Kaiju No. 8 Vol 3. Kafka Hibino, pria 32 tahun pembersih bangkai monster, mendapatkan kekuatan untuk berubah menjadi Kaiju No. 8....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-49-004-3',
        pages: 224,
        synopsis: 'Kaiju No. 8 Vol 4. Kafka Hibino, pria 32 tahun pembersih bangkai monster, mendapatkan kekuatan untuk berubah menjadi Kaiju No. 8....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-49-005-6',
        pages: 232,
        synopsis: 'Kaiju No. 8 Vol 5. Kafka Hibino, pria 32 tahun pembersih bangkai monster, mendapatkan kekuatan untuk berubah menjadi Kaiju No. 8....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-49-006-0',
        pages: 240,
        synopsis: 'Kaiju No. 8 Vol 6. Kafka Hibino, pria 32 tahun pembersih bangkai monster, mendapatkan kekuatan untuk berubah menjadi Kaiju No. 8....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-49-007-3',
        pages: 248,
        synopsis: 'Kaiju No. 8 Vol 7. Kafka Hibino, pria 32 tahun pembersih bangkai monster, mendapatkan kekuatan untuk berubah menjadi Kaiju No. 8....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'sakamoto-days-manga',
    title: 'Sakamoto Days',
    slug: 'sakamoto-days',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Taro Sakamoto, mantan pembunuh bayaran terkuat, mengelola toko kelontong sambil melawan para pembunuh.',
    category: 'manga',
    rating: 9.2,
    status: 'ongoing',
    demographic: 'Shonen',
    genres: ["Action", "Comedy"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '16 Volumes',
    firstPublishedInId: '2023',
    isFeatured: false,
    authorStory: 'Yuto Suzuki',
    authorArt: 'Yuto Suzuki',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-66-001-3',
        pages: 200,
        synopsis: 'Sakamoto Days Vol 1. Taro Sakamoto, mantan pembunuh bayaran terkuat, mengelola toko kelontong sambil melawan para pembunuh....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-66-002-6',
        pages: 208,
        synopsis: 'Sakamoto Days Vol 2. Taro Sakamoto, mantan pembunuh bayaran terkuat, mengelola toko kelontong sambil melawan para pembunuh....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-66-003-0',
        pages: 216,
        synopsis: 'Sakamoto Days Vol 3. Taro Sakamoto, mantan pembunuh bayaran terkuat, mengelola toko kelontong sambil melawan para pembunuh....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-66-004-3',
        pages: 224,
        synopsis: 'Sakamoto Days Vol 4. Taro Sakamoto, mantan pembunuh bayaran terkuat, mengelola toko kelontong sambil melawan para pembunuh....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-66-005-6',
        pages: 232,
        synopsis: 'Sakamoto Days Vol 5. Taro Sakamoto, mantan pembunuh bayaran terkuat, mengelola toko kelontong sambil melawan para pembunuh....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-66-006-0',
        pages: 240,
        synopsis: 'Sakamoto Days Vol 6. Taro Sakamoto, mantan pembunuh bayaran terkuat, mengelola toko kelontong sambil melawan para pembunuh....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '4 Agt 2024',
        isbn: '978-623-66-007-3',
        pages: 248,
        synopsis: 'Sakamoto Days Vol 7. Taro Sakamoto, mantan pembunuh bayaran terkuat, mengelola toko kelontong sambil melawan para pembunuh....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'mashle-manga',
    title: 'Mashle: Magic and Muscles',
    slug: 'mashle',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Mash Burnedead yang tidak memiliki sihir melatih ototnya hingga mampu menghancurkan sihir dengan pukulan fisik.',
    category: 'manga',
    rating: 8.8,
    status: 'completed',
    demographic: 'Shonen',
    genres: ["Action", "Comedy", "Magic"],
    publisherId: 'elex',
    publisherName: 'Elex Media Komputindo',
    totalVolumesKnown: '18 Volumes',
    firstPublishedInId: '2022',
    isFeatured: false,
    authorStory: 'Hajime Komoto',
    authorArt: 'Hajime Komoto',
    readingRating: 'Remaja',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-52-001-3',
        pages: 200,
        synopsis: 'Mashle: Magic and Muscles Vol 1. Mash Burnedead yang tidak memiliki sihir melatih ototnya hingga mampu menghancurkan sihir dengan pukulan fisik....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-52-002-6',
        pages: 208,
        synopsis: 'Mashle: Magic and Muscles Vol 2. Mash Burnedead yang tidak memiliki sihir melatih ototnya hingga mampu menghancurkan sihir dengan pukulan fisik....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-52-003-0',
        pages: 216,
        synopsis: 'Mashle: Magic and Muscles Vol 3. Mash Burnedead yang tidak memiliki sihir melatih ototnya hingga mampu menghancurkan sihir dengan pukulan fisik....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-52-004-3',
        pages: 224,
        synopsis: 'Mashle: Magic and Muscles Vol 4. Mash Burnedead yang tidak memiliki sihir melatih ototnya hingga mampu menghancurkan sihir dengan pukulan fisik....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-52-005-6',
        pages: 232,
        synopsis: 'Mashle: Magic and Muscles Vol 5. Mash Burnedead yang tidak memiliki sihir melatih ototnya hingga mampu menghancurkan sihir dengan pukulan fisik....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-52-006-0',
        pages: 240,
        synopsis: 'Mashle: Magic and Muscles Vol 6. Mash Burnedead yang tidak memiliki sihir melatih ototnya hingga mampu menghancurkan sihir dengan pukulan fisik....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '22 Agt 2026',
        isbn: '978-623-52-007-3',
        pages: 248,
        synopsis: 'Mashle: Magic and Muscles Vol 7. Mash Burnedead yang tidak memiliki sihir melatih ototnya hingga mampu menghancurkan sihir dengan pukulan fisik....',
        cetakanInfo: 'Cetakan Resmi Indonesia (Elex Media Komputindo).',
        price: 48000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'spy-x-family-manga',
    title: 'Spy x Family',
    slug: 'spy-x-family',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Mata-mata handal Loid Forger membentuk keluarga palsu dengan Anya pembaca pikiran dan Yor pembunuh bayaran.',
    category: 'manga',
    rating: 9.4,
    status: 'ongoing',
    demographic: 'General',
    genres: ["Comedy", "Action", "Slice of Life"],
    publisherId: 'mnc',
    publisherName: 'm&c!',
    totalVolumesKnown: '13 Volumes',
    firstPublishedInId: '2021',
    isFeatured: false,
    authorStory: 'Tatsuya Endo',
    authorArt: 'Tatsuya Endo',
    readingRating: 'Anak & Bimbingan Orang Tua',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-71-001-3',
        pages: 200,
        synopsis: 'Spy x Family Vol 1. Mata-mata handal Loid Forger membentuk keluarga palsu dengan Anya pembaca pikiran dan Yor pembunuh bayaran....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-71-002-6',
        pages: 208,
        synopsis: 'Spy x Family Vol 2. Mata-mata handal Loid Forger membentuk keluarga palsu dengan Anya pembaca pikiran dan Yor pembunuh bayaran....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-71-003-0',
        pages: 216,
        synopsis: 'Spy x Family Vol 3. Mata-mata handal Loid Forger membentuk keluarga palsu dengan Anya pembaca pikiran dan Yor pembunuh bayaran....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-71-004-3',
        pages: 224,
        synopsis: 'Spy x Family Vol 4. Mata-mata handal Loid Forger membentuk keluarga palsu dengan Anya pembaca pikiran dan Yor pembunuh bayaran....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-71-005-6',
        pages: 232,
        synopsis: 'Spy x Family Vol 5. Mata-mata handal Loid Forger membentuk keluarga palsu dengan Anya pembaca pikiran dan Yor pembunuh bayaran....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-71-006-0',
        pages: 240,
        synopsis: 'Spy x Family Vol 6. Mata-mata handal Loid Forger membentuk keluarga palsu dengan Anya pembaca pikiran dan Yor pembunuh bayaran....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 7,
        releaseDate: '22 Agt 2026',
        isbn: '978-623-71-007-3',
        pages: 248,
        synopsis: 'Spy x Family Vol 7. Mata-mata handal Loid Forger membentuk keluarga palsu dengan Anya pembaca pikiran dan Yor pembunuh bayaran....',
        cetakanInfo: 'Cetakan Resmi Indonesia (m&c!).',
        price: 45000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'berserk-manga',
    title: 'Berserk (Edisi AKASHA)',
    slug: 'berserk',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Guts sang Black Swordsman berkelana membawa pedang Dragon Slayer raksasa menuntut balas atas kejahatan rahasia para God Hand.',
    category: 'manga',
    rating: 9.7,
    status: 'ongoing',
    demographic: 'Seinen',
    genres: ["Dark Fantasy", "Action", "Seinen", "Horror", "Drama"],
    publisherId: 'akasha',
    publisherName: 'm&c! (AKASHA)',
    totalVolumesKnown: '42 Volumes',
    firstPublishedInId: '2023',
    isFeatured: false,
    authorStory: 'Kentaro Miura',
    authorArt: 'Kentaro Miura',
    readingRating: 'Dewasa Berat',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-61-001-3',
        pages: 200,
        synopsis: 'Berserk (Edisi AKASHA) Vol 1. Guts sang Black Swordsman berkelana membawa pedang Dragon Slayer raksasa menuntut balas atas kejahatan rahasia para God ...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-61-002-6',
        pages: 208,
        synopsis: 'Berserk (Edisi AKASHA) Vol 2. Guts sang Black Swordsman berkelana membawa pedang Dragon Slayer raksasa menuntut balas atas kejahatan rahasia para God ...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-61-003-0',
        pages: 216,
        synopsis: 'Berserk (Edisi AKASHA) Vol 3. Guts sang Black Swordsman berkelana membawa pedang Dragon Slayer raksasa menuntut balas atas kejahatan rahasia para God ...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-61-004-3',
        pages: 224,
        synopsis: 'Berserk (Edisi AKASHA) Vol 4. Guts sang Black Swordsman berkelana membawa pedang Dragon Slayer raksasa menuntut balas atas kejahatan rahasia para God ...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-61-005-6',
        pages: 232,
        synopsis: 'Berserk (Edisi AKASHA) Vol 5. Guts sang Black Swordsman berkelana membawa pedang Dragon Slayer raksasa menuntut balas atas kejahatan rahasia para God ...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-61-006-0',
        pages: 240,
        synopsis: 'Berserk (Edisi AKASHA) Vol 6. Guts sang Black Swordsman berkelana membawa pedang Dragon Slayer raksasa menuntut balas atas kejahatan rahasia para God ...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'tokyo-ghoul-manga',
    title: 'Tokyo Ghoul (Edisi AKASHA)',
    slug: 'tokyo-ghoul',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Ken Kaneki, mahasiswa biasa, berubah menjadi manusia setengah ghoul setelah organ Rize ditanamkan ke dalam tubuhnya.',
    category: 'manga',
    rating: 9.4,
    status: 'completed',
    demographic: 'Seinen',
    genres: ["Dark Fantasy", "Horror", "Psychological", "Seinen"],
    publisherId: 'akasha',
    publisherName: 'm&c! (AKASHA)',
    totalVolumesKnown: '14 Volumes',
    firstPublishedInId: '2022',
    isFeatured: false,
    authorStory: 'Sui Ishida',
    authorArt: 'Sui Ishida',
    readingRating: 'Dewasa Berat',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-41-001-3',
        pages: 200,
        synopsis: 'Tokyo Ghoul (Edisi AKASHA) Vol 1. Ken Kaneki, mahasiswa biasa, berubah menjadi manusia setengah ghoul setelah organ Rize ditanamkan ke dalam tubuhnya....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-41-002-6',
        pages: 208,
        synopsis: 'Tokyo Ghoul (Edisi AKASHA) Vol 2. Ken Kaneki, mahasiswa biasa, berubah menjadi manusia setengah ghoul setelah organ Rize ditanamkan ke dalam tubuhnya....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-41-003-0',
        pages: 216,
        synopsis: 'Tokyo Ghoul (Edisi AKASHA) Vol 3. Ken Kaneki, mahasiswa biasa, berubah menjadi manusia setengah ghoul setelah organ Rize ditanamkan ke dalam tubuhnya....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-41-004-3',
        pages: 224,
        synopsis: 'Tokyo Ghoul (Edisi AKASHA) Vol 4. Ken Kaneki, mahasiswa biasa, berubah menjadi manusia setengah ghoul setelah organ Rize ditanamkan ke dalam tubuhnya....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-41-005-6',
        pages: 232,
        synopsis: 'Tokyo Ghoul (Edisi AKASHA) Vol 5. Ken Kaneki, mahasiswa biasa, berubah menjadi manusia setengah ghoul setelah organ Rize ditanamkan ke dalam tubuhnya....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 6,
        releaseDate: '25 Jul 2023',
        isbn: '978-623-41-006-0',
        pages: 240,
        synopsis: 'Tokyo Ghoul (Edisi AKASHA) Vol 6. Ken Kaneki, mahasiswa biasa, berubah menjadi manusia setengah ghoul setelah organ Rize ditanamkan ke dalam tubuhnya....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'monster-manga',
    title: 'Monster (Level Comic)',
    slug: 'monster-naoki-urasawa',
    coverImage: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Dr. Kenzo Tenma menyelamatkan nyawa anak laki-laki bernama Johan Liebert, yang kelak tumbuh menjadi monster sosiopat tanpa empati.',
    category: 'manga',
    rating: 9.7,
    status: 'completed',
    demographic: 'Seinen',
    genres: ["Psychological", "Mystery", "Thriller", "Seinen"],
    publisherId: 'level',
    publisherName: 'Elex Media Komputindo (Level Comic)',
    totalVolumesKnown: '18 Volumes',
    firstPublishedInId: '2021',
    isFeatured: false,
    authorStory: 'Naoki Urasawa',
    authorArt: 'Naoki Urasawa',
    readingRating: 'Dewasa Berat',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-85-001-3',
        pages: 200,
        synopsis: 'Monster (Level Comic) Vol 1. Dr. Kenzo Tenma menyelamatkan nyawa anak laki-laki bernama Johan Liebert, yang kelak tumbuh menjadi monster sosiopat tan...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-85-002-6',
        pages: 208,
        synopsis: 'Monster (Level Comic) Vol 2. Dr. Kenzo Tenma menyelamatkan nyawa anak laki-laki bernama Johan Liebert, yang kelak tumbuh menjadi monster sosiopat tan...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-85-003-0',
        pages: 216,
        synopsis: 'Monster (Level Comic) Vol 3. Dr. Kenzo Tenma menyelamatkan nyawa anak laki-laki bernama Johan Liebert, yang kelak tumbuh menjadi monster sosiopat tan...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-85-004-3',
        pages: 224,
        synopsis: 'Monster (Level Comic) Vol 4. Dr. Kenzo Tenma menyelamatkan nyawa anak laki-laki bernama Johan Liebert, yang kelak tumbuh menjadi monster sosiopat tan...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-85-005-6',
        pages: 232,
        synopsis: 'Monster (Level Comic) Vol 5. Dr. Kenzo Tenma menyelamatkan nyawa anak laki-laki bernama Johan Liebert, yang kelak tumbuh menjadi monster sosiopat tan...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'punpun-manga',
    title: 'Goodnight Punpun (Edisi AKASHA)',
    slug: 'goodnight-punpun',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Catatan perjalanan hidup tragis dan mendalam anak bernama Punpun Onodera tumbuh menjadi dewasa di tengah kehancuran keluarga.',
    category: 'manga',
    rating: 9.5,
    status: 'completed',
    demographic: 'Seinen',
    genres: ["Drama", "Psychological", "Slice of Life", "Seinen"],
    publisherId: 'akasha',
    publisherName: 'm&c! (AKASHA)',
    totalVolumesKnown: '13 Volumes',
    firstPublishedInId: '2023',
    isFeatured: false,
    authorStory: 'Inio Asano',
    authorArt: 'Inio Asano',
    readingRating: 'Dewasa Berat',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-35-001-3',
        pages: 200,
        synopsis: 'Goodnight Punpun (Edisi AKASHA) Vol 1. Catatan perjalanan hidup tragis dan mendalam anak bernama Punpun Onodera tumbuh menjadi dewasa di tengah kehancuran kelu...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-35-002-6',
        pages: 208,
        synopsis: 'Goodnight Punpun (Edisi AKASHA) Vol 2. Catatan perjalanan hidup tragis dan mendalam anak bernama Punpun Onodera tumbuh menjadi dewasa di tengah kehancuran kelu...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-35-003-0',
        pages: 216,
        synopsis: 'Goodnight Punpun (Edisi AKASHA) Vol 3. Catatan perjalanan hidup tragis dan mendalam anak bernama Punpun Onodera tumbuh menjadi dewasa di tengah kehancuran kelu...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-35-004-3',
        pages: 224,
        synopsis: 'Goodnight Punpun (Edisi AKASHA) Vol 4. Catatan perjalanan hidup tragis dan mendalam anak bernama Punpun Onodera tumbuh menjadi dewasa di tengah kehancuran kelu...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-35-005-6',
        pages: 232,
        synopsis: 'Goodnight Punpun (Edisi AKASHA) Vol 5. Catatan perjalanan hidup tragis dan mendalam anak bernama Punpun Onodera tumbuh menjadi dewasa di tengah kehancuran kelu...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'vinland-saga-manga',
    title: 'Vinland Saga (Level Comic)',
    slug: 'vinland-saga',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Thorfinn muda tumbuh di tengah medan perang Viking demi membalas dendam kepada Askeladd yang membunuh ayahnya Thors.',
    category: 'manga',
    rating: 9.6,
    status: 'ongoing',
    demographic: 'Seinen',
    genres: ["Action", "Historical", "Drama", "Seinen"],
    publisherId: 'level',
    publisherName: 'Elex Media Komputindo (Level Comic)',
    totalVolumesKnown: '27 Volumes',
    firstPublishedInId: '2022',
    isFeatured: false,
    authorStory: 'Makoto Yukimura',
    authorArt: 'Makoto Yukimura',
    readingRating: 'Dewasa Berat',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-31-001-3',
        pages: 200,
        synopsis: 'Vinland Saga (Level Comic) Vol 1. Thorfinn muda tumbuh di tengah medan perang Viking demi membalas dendam kepada Askeladd yang membunuh ayahnya Thors....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 50000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-31-002-6',
        pages: 208,
        synopsis: 'Vinland Saga (Level Comic) Vol 2. Thorfinn muda tumbuh di tengah medan perang Viking demi membalas dendam kepada Askeladd yang membunuh ayahnya Thors....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 50000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-31-003-0',
        pages: 216,
        synopsis: 'Vinland Saga (Level Comic) Vol 3. Thorfinn muda tumbuh di tengah medan perang Viking demi membalas dendam kepada Askeladd yang membunuh ayahnya Thors....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 50000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-31-004-3',
        pages: 224,
        synopsis: 'Vinland Saga (Level Comic) Vol 4. Thorfinn muda tumbuh di tengah medan perang Viking demi membalas dendam kepada Askeladd yang membunuh ayahnya Thors....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 50000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 5,
        releaseDate: '21 Jun 2022',
        isbn: '978-623-31-005-6',
        pages: 232,
        synopsis: 'Vinland Saga (Level Comic) Vol 5. Thorfinn muda tumbuh di tengah medan perang Viking demi membalas dendam kepada Askeladd yang membunuh ayahnya Thors....',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 50000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'fire-punch-manga',
    title: 'Fire Punch (Edisi AKASHA)',
    slug: 'fire-punch',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Agni dikutuk dengan api membara yang tidak pernah padam di tubuh regenerated-nya dan membalas dendam di dunia es pasca-apokaliptik.',
    category: 'manga',
    rating: 9.1,
    status: 'completed',
    demographic: 'Seinen',
    genres: ["Dark Fantasy", "Action", "Psychological", "Seinen"],
    publisherId: 'akasha',
    publisherName: 'm&c! (AKASHA)',
    totalVolumesKnown: '8 Volumes',
    firstPublishedInId: '2023',
    isFeatured: false,
    authorStory: 'Tatsuki Fujimoto',
    authorArt: 'Tatsuki Fujimoto',
    readingRating: 'Dewasa Berat',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-62-001-3',
        pages: 200,
        synopsis: 'Fire Punch (Edisi AKASHA) Vol 1. Agni dikutuk dengan api membara yang tidak pernah padam di tubuh regenerated-nya dan membalas dendam di dunia es pasca-a...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-62-002-6',
        pages: 208,
        synopsis: 'Fire Punch (Edisi AKASHA) Vol 2. Agni dikutuk dengan api membara yang tidak pernah padam di tubuh regenerated-nya dan membalas dendam di dunia es pasca-a...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-62-003-0',
        pages: 216,
        synopsis: 'Fire Punch (Edisi AKASHA) Vol 3. Agni dikutuk dengan api membara yang tidak pernah padam di tubuh regenerated-nya dan membalas dendam di dunia es pasca-a...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 4,
        releaseDate: '17 Mei 2021',
        isbn: '978-623-62-004-3',
        pages: 224,
        synopsis: 'Fire Punch (Edisi AKASHA) Vol 4. Agni dikutuk dengan api membara yang tidak pernah padam di tubuh regenerated-nya dan membalas dendam di dunia es pasca-a...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 52000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'goblin-slayer-ln',
    title: 'Goblin Slayer (Light Novel)',
    slug: 'goblin-slayer',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Prajurit tak bernama yang hanya mau menerima misi pembasmian goblin tanpa peduli ancaman bahaya ekstrem di sarang monster.',
    category: 'light_novel',
    rating: 9.0,
    status: 'ongoing',
    demographic: 'Seinen',
    genres: ["Dark Fantasy", "Action", "Adventure"],
    publisherId: 'akasha',
    publisherName: 'm&c! (AKASHA)',
    totalVolumesKnown: '16 Volumes',
    firstPublishedInId: '2023',
    isFeatured: false,
    authorStory: 'Kumo Kagyu',
    readingRating: 'Dewasa Berat',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-77-001-3',
        pages: 200,
        synopsis: 'Goblin Slayer (Light Novel) Vol 1. Prajurit tak bernama yang hanya mau menerima misi pembasmian goblin tanpa peduli ancaman bahaya ekstrem di sarang monste...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-77-002-6',
        pages: 208,
        synopsis: 'Goblin Slayer (Light Novel) Vol 2. Prajurit tak bernama yang hanya mau menerima misi pembasmian goblin tanpa peduli ancaman bahaya ekstrem di sarang monste...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 3,
        releaseDate: '13 Apr 2024',
        isbn: '978-623-77-003-0',
        pages: 216,
        synopsis: 'Goblin Slayer (Light Novel) Vol 3. Prajurit tak bernama yang hanya mau menerima misi pembasmian goblin tanpa peduli ancaman bahaya ekstrem di sarang monste...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (m&c! (AKASHA)).',
        price: 95000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  },
  {
    id: 'gantz-manga',
    title: 'Gantz (Level Comic)',
    slug: 'gantz',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Orang-orang yang tewas dipanggil oleh bola hitam misterius Gantz untuk bertarung dalam permainan mematikan melawan alien jahat.',
    category: 'manga',
    rating: 9.2,
    status: 'completed',
    demographic: 'Seinen',
    genres: ["Sci-Fi", "Horror", "Action", "Seinen"],
    publisherId: 'level',
    publisherName: 'Elex Media Komputindo (Level Comic)',
    totalVolumesKnown: '37 Volumes',
    firstPublishedInId: '2024',
    isFeatured: false,
    authorStory: 'Hiroya Oku',
    authorArt: 'Hiroya Oku',
    readingRating: 'Dewasa Berat',
    volumes: [
      {
        volNumber: 1,
        releaseDate: '5 Feb 2022',
        isbn: '978-623-17-001-3',
        pages: 200,
        synopsis: 'Gantz (Level Comic) Vol 1. Orang-orang yang tewas dipanggil oleh bola hitam misterius Gantz untuk bertarung dalam permainan mematikan melawan alien...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      },
      {
        volNumber: 2,
        releaseDate: '9 Mar 2023',
        isbn: '978-623-17-002-6',
        pages: 208,
        synopsis: 'Gantz (Level Comic) Vol 2. Orang-orang yang tewas dipanggil oleh bola hitam misterius Gantz untuk bertarung dalam permainan mematikan melawan alien...',
        cetakanInfo: 'Cetakan Khusus Edisi Dewasa 18+ (Elex Media Komputindo (Level Comic)).',
        price: 55000,
        affiliateLinks: {
          gramedia: 'https://www.gramedia.com',
          shopee: 'https://shopee.co.id',
          tokopedia: 'https://www.tokopedia.com'
        }
      }
    ]
  }
];

export const PRE_OWNED_ITEMS: PreOwnedItem[] = [
  {
    id: 'po-naruto-1',
    comicTitle: 'Naruto Bind Up Edition',
    volumeNumber: 1,
    originalPrice: 95000,
    salePrice: 65000,
    conditionRating: 'A',
    notes: 'Koleksi pribadi bekas bahan konten review @konotasi.sukasuka. Hanya pernah dibuka segel sekali, tidak ada tekukan, ada pembatas buku bawaan, halaman masih sangat putih bersih.',
    shopeeUrl: 'https://shopee.co.id/norinoya.sukasuka',
    tokopediaUrl: 'https://tokopedia.com/konotasi.sukasuka',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80',
    carouselImages: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop&q=80'
    ],
    carouselLabels: [
      'Foto Depan (Jaket Cover Doff)',
      'Foto Samping (Punggung Buku / Spine)',
      'Foto Belakang (Blurb & Ringkasan)',
      'Kondisi Kertas Bookpaper (Bebas Asam/Yellowing)',
      'Bonus Pembatas Buku Pembeli Pertama'
    ],
    linkedComicId: 'naruto-bindup',
    isSoldOut: false
  },
  {
    id: 'po-frieren-1',
    comicTitle: 'Akasha: Frieren After the End',
    volumeNumber: 1,
    originalPrice: 45000,
    salePrice: 32000,
    conditionRating: 'S',
    notes: 'Sangat mulus mirip baru, dibuka untuk sesi foto perbandingan kertas laminasi. Sampul tidak lecek sama sekali.',
    shopeeUrl: 'https://shopee.co.id/norinoya.sukasuka',
    tokopediaUrl: 'https://tokopedia.com/konotasi.sukasuka',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80',
    carouselImages: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&auto=format&fit=crop&q=80'
    ],
    carouselLabels: [
      'Foto Depan (Edisi Akasha Logam Metalik)',
      'Foto Spine (Punggung Buku Vertikal)',
      'Foto Belakang (Sinopsis Jilid 1)',
      'Kondisi Halaman Dalam & Ilustrasi Pembuka',
      'Detail Ketebalan Jaket Sampul'
    ],
    linkedComicId: 'frieren-manga',
    isSoldOut: false
  },
  {
    id: 'po-solo-1',
    comicTitle: 'Novel Solo Leveling',
    volumeNumber: 1,
    originalPrice: 135000,
    salePrice: 89000,
    conditionRating: 'B',
    notes: 'Kertas bookpaper bersih, ada coretan tipis pembatas bab pertama (tidak mengganggu). Cetakan pertama.',
    shopeeUrl: 'https://shopee.co.id/norinoya.sukasuka',
    tokopediaUrl: 'https://tokopedia.com/konotasi.sukasuka',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop&q=80',
    carouselImages: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511108690759-009324a90311?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80'
    ],
    carouselLabels: [
      'Foto Depan (Jaket Tebal Hitam)',
      'Foto Samping (Ketebalan 312 Halaman)',
      'Foto Belakang (Informasi Penerjemah)',
      'Kondisi Kertas Novel Bab 1 (Ada Coretan Tipis)',
      'Foto Sudut Pojok Buku (Sedikit Benturan)'
    ],
    linkedComicId: 'solo-leveling-ln',
    isSoldOut: true
  }
];

export const NEWS_UPDATES: NewsUpdate[] = [
  {
    id: 'news-manga-1',
    username: 'norinoya_feed',
    displayName: 'Norinoya Manga Central',
    timestamp: '1 jam yang lalu',
    title: 'Rekomendasi 5 Manga Shonen & Seinen Terbaru Yang Wajib Kamu Koleksi Tahun Ini!',
    content: 'MANGA HIGHLIGHT: Deretan manga populer cetakan Indonesia seperti Naruto, Frieren, Jujutsu Kaisen, Chainsaw Man, dan Sakamoto Days mendapatkan update volume terbaru. Berikut adalah 5 rekomendasi komik manga unggulan dari tim kurator Norinoya!',
    category: 'manga',
    hashTags: ['MangaIndo', 'ShonenJump', 'SeinenManga', 'RekomendasiManga'],
    attachedImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    recommendations: [
      {
        number: 5,
        title: 'Naruto (Edisi Bindup)',
        description: 'Kami merekomendasikan Naruto karena petualangan ninja Konoha karya Masashi Kishimoto ini hadir dalam format Bindup kertas gading tebal anti-kuning. Alur pertempuran shinobi dan ikatan persahabatan yang dalam menjadikannya komik legenda sepanjang masa.',
        comicId: 'naruto-bindup',
        shortReview: {
          id: 's-naruto',
          title: 'Short Konotasi: Review Fisik & Kertas Naruto Vol 1 Edisi Bindup',
          views: '18.9K',
          duration: '0:58',
          thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
          quote: '"Edisi Bindup kertasnya jauh lebih tebal, tulisan & cetakan tinta pekat tidak tembus halaman belakang!"',
          videoId: 'naruto-vol-1'
        }
      },
      {
        number: 4,
        title: 'Frieren: After the End',
        description: 'Kami merekomendasikan Frieren karena membawa sudut pandang perjalanan fantasi yang melankolis dan hangat pasca-kemenangan tim pahlawan. Cetakan m&c! Akasha kertasnya sangat terasa halus dan nyaman dibaca berulang kali.',
        comicId: 'frieren-manga',
        shortReview: {
          id: 's-frieren',
          title: 'Short Konotasi: Unboxing & Review Kertas Frieren Vol 1 & 2',
          views: '24.3K',
          duration: '0:52',
          thumbnail: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80',
          quote: '"Review jujur: Cetakan ulang kertas premium ini wajib dikoleksi sebelum ludes di pasaran!"',
          videoId: 'frieren-vol-1'
        }
      },
      {
        number: 3,
        title: 'Jujutsu Kaisen',
        description: 'Aksi pertempuran penyihir Jujutsu melawan roh kutukan dengan koreografi pertempuran cepat dan intrik supernatural yang menegangkan karya Gege Akutami.',
        comicId: 'jujutsu-kaisen-manga',
        shortReview: {
          id: 's-jjk',
          title: 'Short Konotasi: Review Cetakan & Terjemahan Jujutsu Kaisen Vol 20',
          views: '15.7K',
          duration: '0:45',
          thumbnail: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&auto=format&fit=crop&q=80',
          quote: '"Hasil cetak hitam pekat tanpa bleber, terjemahan dialognya makin luwes & pas."',
          videoId: 'jjk-vol-20'
        }
      },
      {
        number: 2,
        title: 'Chainsaw Man',
        description: 'Gaya visual liar, komedi gelap, dan plot tak terduga karya Tatsuki Fujimoto. Menjadikan Chainsaw Man komik dengan basis penggemar paling aktif saat ini.',
        comicId: 'chainsaw-man-manga',
        shortReview: {
          id: 's-csm',
          title: 'Short Konotasi: Review Sampul Glossy Chainsaw Man Vol 11',
          views: '19.1K',
          duration: '0:49',
          thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
          quote: '"Sampul luarnya mengkilap presisi, sangat nyaman digenggam buat maraton baca!"',
          videoId: 'csm-vol-11'
        }
      },
      {
        number: 1,
        title: 'Sakamoto Days',
        description: 'Kisah mantan pembunuh bayaran nomor satu yang pensiun membuka toko kelontong demi keluarganya. Koreografi pertarungan paling kreatif di majalah Shonen Jump!',
        comicId: 'sakamoto-days-manga',
        shortReview: {
          id: 's-sakamoto',
          title: 'Short Konotasi: Review Manga Sakamoto Days Vol 1 Indonesia',
          views: '11.8K',
          duration: '0:55',
          thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
          quote: '"Panel pertarungannya sangat fluid, cetakan lokalnya memuaskan banget!"',
          videoId: 'sakamoto-vol-1'
        }
      }
    ]
  },
  {
    id: 'news-ln-1',
    username: 'norinoya_feed',
    displayName: 'Norinoya Light Novel',
    timestamp: '2 jam yang lalu',
    title: 'Light Novel "Solo Leveling" & "Sword Art Online" Edisi Terjemahan Resmi Rilis!',
    content: 'LIGHT NOVEL UPDATE: Penerbit merilis jilid terbaru Light Novel populer lengkap dengan ilustrasi sampul dan bonus bookmark edisi terbatas. Dapatkan di Toko Buku terdekat!',
    category: 'light_novel',
    hashTags: ['LightNovel', 'SoloLeveling', 'SAO', 'LNLokal'],
    attachedImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-novel-1',
    username: 'norinoya_feed',
    displayName: 'Norinoya Literature',
    timestamp: '4 jam yang lalu',
    title: 'Novel Terjemahan Jepang "Miracles of the Namiya General Store" Cetakan Hardcover!',
    content: 'NOVEL HIGHLIGHT: Edisi spesial novel karya Keigo Higashino kini hadir dalam format Hardcover eksklusif. Baca ulasan novel komprehensif dan koleksi fisiknya sekarang!',
    category: 'novel',
    hashTags: ['NovelJepang', 'KeigoHigashino', 'NamiyaGeneralStore', 'NovelTerjemahan'],
    attachedImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-mega-release-19aug',
    username: 'norinoya_feed',
    displayName: 'Norinoya Release Feed',
    timestamp: 'Baru saja',
    title: 'SUPER MEGA RILISAN 19 AGUSTUS 2026: 15 Judul Komik & Novel Baru Terbit Serentak Hari Ini!',
    content: 'PETA RILISAN JUMBO: Hari ini, Rabu 19 Agustus 2026, penerbit Elex Media & m&c! secara serentak merilis 15 judul komik dan novel baru di toko buku seluruh Indonesia! Judul yang terbit mencakup Naruto Bindup Vol 11, Frieren Vol 5, One Piece Vol 105, Jujutsu Kaisen Vol 22, Spy x Family Vol 12, Blue Lock Vol 2, Demon Slayer Vol 23 (Final), Chainsaw Man Vol 14, Oshi no Ko Vol 8, Sakamoto Days Vol 7, Kaiju No 8 Vol 9, Mashle Vol 12, Tokyo Revengers Vol 18, Solo Leveling LN Vol 3, dan Namiya Hardcover Special Edition. Cek detail dan jadwal lengkapnya di Kalender Terbit!',
    category: 'breaking',
    hashTags: ['MegaRilisan19Agt', 'ElexMedia', 'mcAkasha', 'RilisanBaru', 'KalenderTerbit'],
    attachedImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-1',
    username: 'norinoya_feed',
    displayName: 'Norinoya Release Feed',
    timestamp: 'Just now',
    title: 'Cetakan Ulang "Frieren: After the End" Vol 1 & 2 Kertas Premium!',
    content: 'ANNOUNCEMENT RE-PRINT: Manga "Frieren: After the End" volume 1 & 2 terbitan m&c! Akasha dikonfirmasi akan dicetak ulang menggunakan kertas premium murni akhir bulan ini! Pastikan nantikan link gramedia official di situs ini.',
    category: 'cetakan_ulang',
    hashTags: ['Frieren', 'mcAkasha', 'Mangaindo'],
    attachedImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    readingRating: 'Dewasa Ringan'
  },
  {
    id: 'news-2',
    username: 'norinoya_feed',
    displayName: 'Norinoya Release Feed',
    timestamp: '2 hours ago',
    title: 'Rilisan Baru Minggu Ini: Spy x Family Vol 11 & Blue Lock Reguler Vol 15!',
    content: 'RILIS HARI INI: Tanggal 30 Mei 2026, Elex Media menerbitkan beberapa komik hot minggu ini. Antara lain Spy x Family Vol 11, Blue Lock Edisi Reguler Vol 15. Klik tab database di atas untuk checkout via Tokopedia & Gramedia affiliate.',
    category: 'rilisan',
    hashTags: ['ElexMedia', 'RilisanBaru', 'MangaIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'news-3',
    username: 'konotasi_pedia',
    displayName: 'Konotasi Edukasi',
    timestamp: '1 day ago',
    title: 'Mengapa Kertas Komik Jadul Sangat Mudah Menguning? Ini Rahasianya!',
    content: 'EDUKASI TENTANG KERTAS KOMIK: Mengapa komik cetakan lama (sebelum 2012) gampang kuning sekutu rayap? Itu karena penggunaan kertas koran berunsur asam tinggi (acidic pulp). Format terbitan premium (seperti Naruto Bindup dan Akasha) sekarang beralih ke Bookpaper Bebas Asam (Acid-Free paper) demi keawetan puluhan tahun!',
    category: 'edukasi',
    hashTags: ['EdukasiManga', 'KonotasiShorts', 'GramediaAffiliate'],
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'news-4',
    username: 'norinoya_deals',
    displayName: 'Norinoya Bekas Murah',
    timestamp: '2 days ago',
    title: 'Stok Komik Bekas Review @konotasi Baru Saja Di-upload!',
    content: 'STOK BEKAS REVIEW MASUK: Baru saja diupload 3 unit komik bekas curated review @konotasi.sukasuka termasuk Naruto Bind Up Ed. 1 kondisi Tier A. Langsung check out sebelum disabet pemburu lainnya!',
    category: 'promo',
    hashTags: ['KomikPreOwned', 'KonotasiSukaSuka']
  },
  {
    id: 'news-5',
    username: 'norinoya_spotlight',
    displayName: 'Norinoya Unboxing Studio',
    timestamp: '3 jam yang lalu',
    title: 'Unboxing Galeri: Demon Slayer Kimetsu no Yaiba Boxset Special Edition',
    content: 'FOTO GALERI UNBOXING: Lihat detail cetakan khusus Kimetsu no Yaiba Collector Boxset! Hadir dengan sampul jaket efek foil metalik, kertas bookpaper impor tebal 60g yang tidak tembus tinta, serta bonus 5 lembar artcard koleksi exklusif.',
    category: 'rilisan',
    hashTags: ['UnboxingManga', 'DemonSlayer', 'BoxsetCollector', 'MangaIndo'],
    galleryImages: [
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511108690759-009324a90311?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'news-6',
    username: 'bumilangit_feed',
    displayName: 'Bumilangit Official Update',
    timestamp: '4 jam yang lalu',
    title: 'BREAKING: "Gundala: Son of Lightning" Edisi Remastered Hardcover Resmi Dirilis!',
    content: 'Kabar gembira pecinta superhero lokal! Bumilangit bekerjasama dengan Koloni resmi mengumumkan komik cetak edisi kolektor Hardcover Gundala: Son of Lightning dengan artwork revisi full-color dan bonus piringan enamel resmi.',
    category: 'breaking',
    hashTags: ['Gundala', 'Bumilangit', 'KomikLokal', 'Koloni'],
    attachedImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-7',
    username: 'komik_indo_update',
    displayName: 'Warta Komik Nusantara',
    timestamp: '5 jam yang lalu',
    title: '10 Tahun Tahilalats: Kompilasi Buku Cetak Fisik "Tahilalats X Global Creators" Diluncurkan!',
    content: 'Merayakan dekade berkarya, Tahilalats merilis komik kompilasi edisi cetak tebal berisi strip komik legendaris plus kolaborasi lintas kreator Asia! Sudah tersedia di seluruh gerai Gramedia utama.',
    category: 'rilisan',
    hashTags: ['Tahilalats', 'KomikIndonesia', 'WebtoonIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-8',
    username: 'norinoya_feed',
    displayName: 'Norinoya Release Feed',
    timestamp: '7 jam yang lalu',
    title: 'Rilisan Baru: Webtoon Hits "7 Wonders" Vol 5 Karya Metakoma Terbit Minggu Ini!',
    content: 'Petualangan Jaka dan para Bidadari berlanjut di versi cetak! Volume 5 komik "7 Wonders" terbitan m&c! Koloni resmi beredar hari ini. Dapatkan bonus postcards Bidadari untuk cetakan edisi pertama.',
    category: 'rilisan',
    hashTags: ['7Wonders', 'Metakoma', 'Koloni', 'KomikIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-9',
    username: 'norinoya_feed',
    displayName: 'Norinoya Release Feed',
    timestamp: '9 jam yang lalu',
    title: 'Cetakan Kedua: "Si Juki Seri Jalan-Jalan ke Korea" Laris Manis Lulus Sensor!',
    content: 'Cetakan pertama habis dalam hitungan minggu! Elex Media Komputindo mengonfirmasi cetakan kedua komik Si Juki Jalan-Jalan ke Korea karya Faza Meonk telah masuk distribusi toko buku lokal.',
    category: 'cetakan_ulang',
    hashTags: ['SiJuki', 'FazaMeonk', 'ElexMedia', 'KomikIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-10',
    username: 'konotasi_pedia',
    displayName: 'Konotasi Edukasi',
    timestamp: '11 jam yang lalu',
    title: 'Edukasi Kreator: Tahapan Dari Draf Lineart Digital Ke Format Cetak Offset',
    content: 'Penasaran bagaimana Webtoon layar vertikal diubah menjadi halaman komik fisik A5/B6? Simak tutorial tata letak panel ulang (re-paneling) dan pengaturan resolusi CMYK 300 DPI agar warna cetakan presisi tanpa blur!',
    category: 'edukasi',
    hashTags: ['EdukasiKomik', 'KreatorIndo', 'TipsKomikus'],
    galleryImages: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'news-11',
    username: 'komik_indo_update',
    displayName: 'Warta Komik Nusantara',
    timestamp: '14 jam yang lalu',
    title: '"Garudayana" Karya Is Yuniarto Raih Penghargaan & Siapkan Proyek Seri Anime!',
    content: 'Kebanggaan komik Indonesia! Garudayana dikonfirmasi mendapatkan adaptasi animasi penuh! Komik cetaknya kembali dicari kolektor dan versi omnibus volume 1-3 akan dicetak ulang bulan depan.',
    category: 'breaking',
    hashTags: ['Garudayana', 'IsYuniarto', 'KomikWayang', 'AnimationID'],
    attachedImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-12',
    username: 'norinoya_deals',
    displayName: 'Norinoya Bekas Murah',
    timestamp: '16 jam yang lalu',
    title: 'Promo Beli 3 Komik Lokal Bekas Pilihan, Gratis Standee Akrilik!',
    content: 'Beli komik pre-owned lokal pilihan (Vandaria, NusantaRanger, Re:ON Anthology) di katalog toko kita dan dapatkan merch bonus langka selama persediaan masih ada!',
    category: 'promo',
    hashTags: ['PromoKomik', 'PreOwnedKomik', 'KonotasiSukaSuka']
  },
  {
    id: 'news-13',
    username: 'koloni_news',
    displayName: 'Koloni Komik Indonesia',
    timestamp: '1 hari yang lalu',
    title: 'Rilisan Baru: Komik Aksi Silat Modern "Nusantara Knight" Vol 1 Resmi Beredar!',
    content: 'Menggabungkan bela diri pencak silat dan teknologi futuristik, "Nusantara Knight" terbitan Koloni kini hadir di seluruh Gramedia. Dapatkan bookmark pembatas buku eksklusif di setiap pembelian cetakan pertama.',
    category: 'rilisan',
    hashTags: ['NusantaraKnight', 'Koloni', 'KomikAksi', 'SilatIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-14',
    username: 'webtoon_id_news',
    displayName: 'Line Webtoon Indonesia Feed',
    timestamp: '1 hari yang lalu',
    title: 'Webtoon Romantis "Pasutri Gaje" Karya Annisa Nisfihani Tembus 500k Cetakan Buku!',
    content: 'Prestasi spektakuler karya kreator Indonesia! Komik cetak "Pasutri Gaje" seri 1-8 terus memecahkan rekor penjualan komik lokal. Jangan lewatkan promo e-voucher Gramedia untuk melengkapi koleksimu.',
    category: 'breaking',
    hashTags: ['PasutriGaje', 'AnnisaNisfihani', 'WebtoonFisik', 'RomanceIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-15',
    username: 'norinoya_feed',
    displayName: 'Norinoya Release Feed',
    timestamp: '1 hari yang lalu',
    title: 'Cetakan Ulang "Vandaria Saga: Redshift" Edisi Revisionist Bookpaper',
    content: 'Setelah lama langka di pasaran, kisah fantasi epik Vandaria Redshift dicetak ulang dengan cover baru berteks emas emboss & kertas bookpaper ringan 60gr.',
    category: 'cetakan_ulang',
    hashTags: ['VandariaSaga', 'FantasiIndo', 'CetakanUlang'],
    attachedImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-16',
    username: 'konotasi_pedia',
    displayName: 'Konotasi Edukasi',
    timestamp: '2 hari yang lalu',
    title: 'Perbedaan Sampul Dust Jacket vs Softcover Reguler Komik Lokal',
    content: 'Kenapa komik edisi premium sering menggunakan jaket sampul (Dust Jacket)? Selain melindungi cover dalam dari gesekan dan minyak jari, dust jacket memberikan nuansa ala tankobon Jepang autentik pada komik lokal!',
    category: 'edukasi',
    hashTags: ['EdukasiManga', 'DustJacket', 'KomikKolektor'],
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'news-17',
    username: 'norinoya_spotlight',
    displayName: 'Norinoya Unboxing Studio',
    timestamp: '2 hari yang lalu',
    title: 'Unboxing Galeri: Boxset Edisi Khusus Komik "Re:ON Anthology Volume 1-10"',
    content: 'Nostalgia komik majalah cetak Indonesia! Unboxing lengkap collector boxset Re:ON kompilasi volume awal berisi komik legendaris Grand Legend Ramayana, LayLay Cat, dan Overtaken.',
    category: 'rilisan',
    hashTags: ['ReONComics', 'UnboxingKomik', 'KoleksiIndo'],
    galleryImages: [
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'news-18',
    username: 'komik_indo_update',
    displayName: 'Warta Komik Nusantara',
    timestamp: '2 hari yang lalu',
    title: '"Drupadi: Wrath of Panchali" Komik Fantasi Mitologi Terbit Murni Bahasa Indonesia!',
    content: 'Cerita adaptasi mitologi epik dipadukan dengan gaya gambar modern ciamik. Diterbitkan oleh m&c! Koloni dan sudah bisa dipesan secara pre-order melalui Gramedia Official store.',
    category: 'rilisan',
    hashTags: ['Drupadi', 'KomikMitologi', 'Koloni', 'RilisanBaru'],
    attachedImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-19',
    username: 'norinoya_deals',
    displayName: 'Norinoya Bekas Murah',
    timestamp: '3 hari yang lalu',
    title: 'Special Cashback 20% Pembelian Komik Lokal via Gramedia Shopee Mall',
    content: 'Masukkan kode voucher spesial di checkout Shopee Gramedia Official untuk menikmati potongan harga komik penerbit Elex Media & m&c! hari ini.',
    category: 'promo',
    hashTags: ['GramediaPromo', 'DiskonKomik', 'KomikLokal']
  },
  {
    id: 'news-20',
    username: 'komik_indo_update',
    displayName: 'Warta Komik Nusantara',
    timestamp: '3 hari yang lalu',
    title: 'Webtoon Aksi "LOKAPALA: Saga of the Ancient Heroes" Terbit Versi Cetak!',
    content: 'Diangkat dari game MOBA buatan Indonesia Lokapala, edisi cetak komik aksi seri perdana hadir dengan sampul eksklusif foil hologram dan bonus in-game skin code.',
    category: 'rilisan',
    hashTags: ['Lokapala', 'KomikAksi', 'GameIndo', 'KomikLokal'],
    attachedImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-21',
    username: 'norinoya_feed',
    displayName: 'Norinoya Release Feed',
    timestamp: '3 hari yang lalu',
    title: 'Cetakan Ulang "Wonderwall" Vol 1-3 Karya Senokos Edisi Revisi Panel',
    content: 'Komik romansa populer karya Senokos mendapatkan cetakan ulang ketiga dengan kertas bookpaper kualitas tinggi dan tatanan teks baru.',
    category: 'cetakan_ulang',
    hashTags: ['Wonderwall', 'Senokos', 'KomikRomantis', 'WebtoonIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-22',
    username: 'konotasi_pedia',
    displayName: 'Konotasi Edukasi',
    timestamp: '4 hari yang lalu',
    title: 'Cara Tepat Menggunakan Plastic Sleeve Bag Agar Komik Bebas Jamur Tropis',
    content: 'Simak panduan memilih ukuran plastik OPP sealable (14x20cm vs 15x22cm) dan peletakan silica gel gel cair untuk mencegah kelembaban udara Indonesia merusak komik kesayanganmu!',
    category: 'edukasi',
    hashTags: ['PerawatanKomik', 'KolektorManga', 'TipsKoleksi'],
    galleryImages: [
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'news-game-1',
    username: 'norinoya_feed',
    displayName: 'Norinoya Game Hub',
    timestamp: '1 hari yang lalu',
    title: 'Adaptasi Game RPG "Genshin Impact" Manga & Collab Official Rilis!',
    content: 'Pengumuman game & manga: Adaptasi komik resmi Genshin Impact & Honkai Star Rail menghadirkan chapter spin-off terbaru. Cek ulasan komik adaptasi game RPG favoritmu di sini!',
    category: 'game',
    hashTags: ['GenshinImpact', 'AnimeGame', 'GameAdaptasi', 'MangaIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-game-2',
    username: 'komik_indo_update',
    displayName: 'Warta Game & Manga',
    timestamp: '2 hari yang lalu',
    title: 'Game Fighter "Demon Slayer: Hinokami Chronicles" Rilis DLC Karakter Baru!',
    content: 'DLC terbaru game Demon Slayer menghadirkan Arc Hashira Training dengan grafis ala anime garapan Ufotable. Siap dimainkan di console & PC!',
    category: 'game',
    hashTags: ['DemonSlayer', 'ConsoleGame', 'AnimeGame', 'Ufotable'],
    attachedImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-23',
    username: 'bumilangit_feed',
    displayName: 'Bumilangit Official Update',
    timestamp: '4 hari yang lalu',
    title: '"Sri Asih: Celestial Guardian" Vol 2 Resmi Masuk Jajaran Bestseller!',
    content: 'Petualangan superhero wanita pertama Indonesia Sri Asih garapan Archie The RedCat kian diminati pembaca muda. Stok komik cetak terus diperbarui di toko buku ternama.',
    category: 'rilisan',
    hashTags: ['SriAsih', 'Bumilangit', 'ArchieTheRedCat', 'KomikLokal'],
    attachedImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-24',
    username: 'norinoya_deals',
    displayName: 'Norinoya Bekas Murah',
    timestamp: '5 hari yang lalu',
    title: 'Obral Komik Indie Lokal Zine & Anthology Karya Kreator Bandung & Jogja!',
    content: 'Puluhan komik indie zine edisi terbatas dari ajang pasar komik lokal kini tersedia di katalog pre-owned dengan kondisi istimewa 95% MINT!',
    category: 'promo',
    hashTags: ['KomikIndie', 'ZineIndo', 'PasarKomikLokal']
  },
  {
    id: 'news-25',
    username: 'komik_indo_update',
    displayName: 'Warta Komik Nusantara',
    timestamp: '5 hari yang lalu',
    title: 'Festival Komik Indonesia 2026 Siap Digelar di Jakarta Convention Center!',
    content: 'Ajang kumpul komikus, penerbit (Elex, m&c!, Koloni, Bumilangit, Re:ON), dan pencinta komik se-Indonesia akan diselenggarakan bulan depan. Tiket presale sudah dapat dibeli!',
    category: 'breaking',
    hashTags: ['FestivalKomik2026', 'KomikIndonesia', 'EventKomik'],
    attachedImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-26',
    username: 'norinoya_event',
    displayName: 'Warta Event Pop Culture',
    timestamp: '1 jam yang lalu',
    title: 'Jadwal Event Pop Culture 2026: Comifuro 19 di ICE BSD & Indonesia Comic Con (ICC) JCC Senayan!',
    content: 'SIAPKAN BUDGET & COSTUME: Comic Frontier 19 (Comifuro) dikonfirmasi akan kembali menggebrak Hall ICE BSD dengan ribuan booth Artist Alley & Doujinshi lokal! Tak kalah meriah, Indonesia Comic Con (ICC 2026) di JCC Senayan juga mengumumkan deretan guest seiyuu, cosplayer internasional, serta booth pameran resmi dari penerbit komik Jepang & lokal. Catat tanggalnya!',
    category: 'event',
    hashTags: ['Comifuro19', 'IndonesiaComicCon', 'ICC2026', 'ArtistAlley', 'EventManga'],
    attachedImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'news-27',
    username: 'komunitas_seiyuu_id',
    displayName: 'Komunitas Dubbing Indonesia',
    timestamp: '2 jam yang lalu',
    title: 'Proyek Dubbing Anime Terbaru: Studio Lokal Rilis Teaser Sulih Suara Bahasa Indonesia!',
    content: 'DUBBING ANIME LOKAL: Studio sulih suara independen bersama Komunitas Seiyuu Indonesia resmi merilis teaser video untuk proyek dubbing Bahasa Indonesia anime populer musim ini! Dengan talenta pengisi suara profesional & lokalisasi dialog yang natural, proyek ini mendapat apresiasi hangat dari pencinta anime tanah air. Penasaran suara siapa yang mengisi karakter utamanya? Tonton videonya!',
    category: 'komunitas',
    hashTags: ['DubbingIndo', 'SeiyuuIndonesia', 'KomunitasAnime', 'SulihSuara', 'AnimeSubIndo'],
    attachedImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-28',
    username: 'anime_stream_zone',
    displayName: 'Anime Watch Info',
    timestamp: '3 jam yang lalu',
    title: 'Kabar Gembira! Playlist Resmi Anime "Ansatsu Kyoushitsu" (Assassination Classroom) Rilis di YouTube!',
    content: 'NONTON LEGAL & GRATIS: Penggemar Koro-sensei mari merapat! Seluruh episode Anime "Ansatsu Kyoushitsu" (Assassination Classroom) Season 1 dan Season 2 kini resmi memiliki playlist lengkap di YouTube yang bisa ditonton secara bebas, legal, lengkap dengan takarir Bahasa Indonesia berkategori HD 1080p. Langsung meluncur ke playlist resminya sekarang!',
    category: 'anime',
    hashTags: ['AnsatsuKyoushitsu', 'AssassinationClassroom', 'KoroSensei', 'NontonAnimeLegal', 'AnimeYouTube'],
    attachedImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-29',
    username: 'jpop_culture_today',
    displayName: 'J-Culture Insight Japan',
    timestamp: '5 jam yang lalu',
    title: 'Mampir ke Jimbocho & Akihabara: Panduan Berburu Manga Langka & Artbook Klasik di Tokyo!',
    content: 'WISATA POP CULTURE JEPANG: Selain surga otaku Akihabara yang dipenuhi toko merchandise & manga terbaru, distrik Jimbocho di Tokyo menyimpan lebih dari 150 toko buku tua legendaris yang menjual manga cetakan pertama era Showa, artbook langka, serta zine langka yang tak dijual di tempat lain. Simak rute travel dan tips nawar bagi pencinta budaya Jepang!',
    category: 'jepang',
    hashTags: ['JepangInfo', 'Akihabara', 'Jimbocho', 'WisataJepang', 'MangaLangka', 'TokyoTravel'],
    attachedImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&auto=format&fit=crop&q=80'
    ]
  }
];
