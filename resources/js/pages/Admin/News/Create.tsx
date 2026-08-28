import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Plus, Trash2, HelpCircle, Flame, Tag, Image as ImageIcon, Sparkles, BookOpen, Video, Search, ShoppingBag, X, Check } from 'lucide-react';
import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor';

const CATEGORIES = [
  { id: 'rilisan', label: 'Rilisan' },
  { id: 'cetakan_ulang', label: 'Cetak Ulang' },
  { id: 'edukasi', label: 'Review / Edukasi' },
  { id: 'promo', label: 'Promo' },
  { id: 'manga', label: 'Manga' },
  { id: 'light_novel', label: 'Light Novel' },
  { id: 'novel', label: 'Novel' },
  { id: 'anime', label: 'Anime' },
  { id: 'event', label: 'Event' },
  { id: 'game', label: 'Game' },
  { id: 'jepang', label: 'Jepang' },
  { id: 'komunitas', label: 'Komunitas' },
  { id: 'breaking', label: 'Breaking News' },
];

const DEFAULT_REACTIONS = [
  { id: 'fire', emoji: '🔥', label: 'Hype!', count: 128 },
  { id: 'heart', emoji: '😍', label: 'Mau Banget', count: 94 },
  { id: 'mind_blown', emoji: '🤯', label: 'Baru Tahu', count: 65 },
  { id: 'thumbs_up', emoji: '👍', label: 'Sangat Setuju', count: 82 },
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Berita & Feeds', href: '/admin/news' },
    { title: 'Tambah Berita', href: '/admin/news/create' },
];

interface BookOption {
    id: number;
    title: string;
    slug: string;
    volume: number;
    msrp?: number | string | null;
    book_type?: string | null;
    age_rating?: string | null;
    publisher?: { id: number; name: string } | null;
    edition?: { id: number; name: string } | null;
    images?: Array<{ id: number; file_path: string }>;
}

interface TiktokOption {
    id: number;
    book_id: number;
    name: string;
    url_video: string;
    sort_order?: number;
}

interface NewsCreateProps {
    books?: BookOption[];
    tiktokEmbeds?: TiktokOption[];
}

export default function NewsCreate({ books = [], tiktokEmbeds = [] }: NewsCreateProps) {
    const [bookSearchTerm, setBookSearchTerm] = useState('');
    const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
    const bookDropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (bookDropdownRef.current && !bookDropdownRef.current.contains(event.target as Node)) {
                setIsBookDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category: 'rilisan',
        username: 'norinoya_official',
        display_name: 'Norinoya Official',
        attached_image: '',
        gallery_images: ['', '', '', ''], // Maksimal 4 link gambar
        hash_tags: ['', '', ''], // Hashtags badge
        reading_rating: '',
        is_pinned: false as boolean,
        
        // Rekomendasi Buku & Review TikTok (Insert Katalog & Review Short)
        recommendations: [] as Array<{
            number: number | string;
            title: string;
            description: string;
            book_id: string | number;
            tiktok_embed_id: string | number;
        }>,

        // Katalog Relevan (Array book_id)
        relevant_books: [] as number[],

        // Polling opsional
        enable_poll: false as boolean,
        poll_question: '',
        poll_options: [
            { label: '', votes: 85 },
            { label: '', votes: 62 },
        ],

        // Reaction boost opsional
        reactions: DEFAULT_REACTIONS,
    });

    const handleGalleryChange = (index: number, value: string) => {
        const updated = [...data.gallery_images];
        updated[index] = value;
        setData('gallery_images', updated);
    };

    const handleHashtagChange = (index: number, value: string) => {
        const updated = [...data.hash_tags];
        updated[index] = value;
        setData('hash_tags', updated);
    };

    const handleAddHashtag = () => {
        if (data.hash_tags.length < 6) {
            setData('hash_tags', [...data.hash_tags, '']);
        }
    };

    const handleRemoveHashtag = (index: number) => {
        const updated = data.hash_tags.filter((_, i) => i !== index);
        setData('hash_tags', updated);
    };

    // Handler untuk Recommendations
    const handleAddRecommendation = () => {
        setData('recommendations', [
            ...data.recommendations,
            {
                number: data.recommendations.length + 1,
                title: '',
                description: '',
                book_id: '',
                tiktok_embed_id: '',
            },
        ]);
    };

    const handleRemoveRecommendation = (index: number) => {
        const updated = data.recommendations.filter((_, i) => i !== index);
        setData('recommendations', updated);
    };

    const handleRecommendationChange = (index: number, field: 'number' | 'title' | 'description' | 'book_id' | 'tiktok_embed_id', value: string | number) => {
        const updated = [...data.recommendations];
        const item = { ...updated[index], [field]: value };

        // Auto populate title when book is selected if title is empty
        if (field === 'book_id' && value) {
            const selectedBook = books.find(b => String(b.id) === String(value));
            if (selectedBook && !item.title) {
                item.title = `${selectedBook.title} Vol ${selectedBook.volume}`;
            }
        }

        updated[index] = item;
        setData('recommendations', updated);
    };

    const handleAddPollOption = () => {
        setData('poll_options', [...data.poll_options, { label: '', votes: Math.floor(Math.random() * 50) + 20 }]);
    };

    const handleRemovePollOption = (index: number) => {
        const updated = data.poll_options.filter((_, i) => i !== index);
        setData('poll_options', updated);
    };

    const handlePollOptionChange = (index: number, field: 'label' | 'votes', value: string | number) => {
        const updated = [...data.poll_options];
        updated[index] = { ...updated[index], [field]: value };
        setData('poll_options', updated);
    };

    const handleReactionChange = (index: number, countValue: number) => {
        const updated = [...data.reactions];
        updated[index] = { ...updated[index], count: countValue };
        setData('reactions', updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.news.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Berita Baru" />

            <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route('admin.news.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-semibold">Tambah Berita Baru</h1>
                        <p className="text-sm text-muted-foreground">
                            Publikasikan artikel, galeri gambar (maks. 4), hashtag, poling interaktif, atau ulasan terbaru.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card border p-6 rounded-xl shadow-xs">
                    {/* Basic Info */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Judul Berita</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Contoh: Pengumuman Cetak Ulang Komik Frieren Vol 1 & 2"
                            required
                        />
                        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Kategori Berita</Label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reading_rating">Rating Umur (Opsional)</Label>
                            <select
                                id="reading_rating"
                                value={data.reading_rating}
                                onChange={(e) => setData('reading_rating', e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">Tanpa Rating</option>
                                <option value="Anak & Bimbingan Orang Tua">Anak & Bimbingan Orang Tua</option>
                                <option value="Remaja">Remaja</option>
                                <option value="Dewasa Ringan">Dewasa Ringan</option>
                                <option value="Dewasa Berat">Dewasa Berat</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username Penulis</Label>
                            <Input
                                id="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="norinoya_official"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="display_name">Nama Penulis</Label>
                            <Input
                                id="display_name"
                                value={data.display_name}
                                onChange={(e) => setData('display_name', e.target.value)}
                                placeholder="Norinoya Official"
                            />
                        </div>
                    </div>

                    {/* SECTION: GALERI GAMBAR BERITA (MAKSIMAL 4 GAMBAR) */}
                    <div className="border p-4 rounded-xl space-y-3 bg-muted/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <Label className="font-bold text-sm">URL Gambar Berita / Galeri (Maksimal 4 Link Gambar)</Label>
                            </div>
                            <span className="text-xs text-muted-foreground font-mono">Input URL Gambar</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {data.gallery_images.slice(0, 4).map((url, idx) => (
                                <div key={idx} className="space-y-1">
                                    <Label className="text-[11px] text-muted-foreground">Gambar {idx + 1} {idx === 0 ? '(Gambar Utama)' : ''}</Label>
                                    <Input
                                        value={url}
                                        onChange={(e) => handleGalleryChange(idx, e.target.value)}
                                        placeholder={`https://domain.com/gambar-${idx + 1}.jpg`}
                                        className="text-xs"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION: HASHTAGS BADGE (DITAMPILKAN DI GAMBAR DETAIL NEWS) */}
                    <div className="border p-4 rounded-xl space-y-3 bg-muted/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                <Label className="font-bold text-sm">Hashtag Badges Berita (Ditampilkan di Gambar Detail)</Label>
                            </div>
                            <span className="text-xs text-muted-foreground font-mono">Misal: #Frieren #ElexMedia</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {data.hash_tags.map((tag, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                    <span className="text-xs font-mono font-bold text-muted-foreground">#</span>
                                    <Input
                                        value={tag}
                                        onChange={(e) => handleHashtagChange(idx, e.target.value)}
                                        placeholder="Frieren"
                                        className="w-32 text-xs"
                                    />
                                    {data.hash_tags.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleRemoveHashtag(idx)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {data.hash_tags.length < 6 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddHashtag}
                                    className="text-xs h-8"
                                >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Tambah Hashtag
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Isi Berita</Label>
                        <RichTextEditor
                            value={data.content}
                            onChange={(content) => setData('content', content)}
                            placeholder="Tuliskan isi berita atau pengumuman lengkap di sini..."
                        />
                        {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
                    </div>

                    {/* SECTION: REKOMENDASI BUKU & REVIEW TIKTOK (INSERT KATALOG & REVIEW SHORTS) */}
                    <div className="border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 p-5 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-amber-500 text-white">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                                        <span>Rekomendasi Buku & Review TikTok (Insert Katalog & Shorts)</span>
                                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                                            {data.recommendations.length} Item
                                        </span>
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Tambahkan daftar rekomendasi buku berseri, ulasan singkat, nomor urut, dan video TikTok review.
                                    </p>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddRecommendation}
                                className="border-amber-300 dark:border-amber-700 text-xs hover:bg-amber-100 dark:hover:bg-amber-900/40"
                            >
                                <Plus className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />
                                Tambah Rekomendasi
                            </Button>
                        </div>

                        {data.recommendations.length === 0 ? (
                            <div className="p-6 text-center border border-dashed border-amber-300/80 dark:border-amber-800/80 rounded-xl bg-white/50 dark:bg-neutral-900/50 space-y-2">
                                <p className="text-xs text-muted-foreground">
                                    Belum ada rekomendasi buku yang ditambahkan untuk berita ini.
                                </p>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleAddRecommendation}
                                    className="text-xs font-semibold"
                                >
                                    <Plus className="w-3.5 h-3.5 mr-1" />
                                    Mulai Tambah Rekomendasi
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {data.recommendations.map((rec, idx) => {
                                    // Filter tiktok videos: show videos for selected book first or all if none
                                    const availableTiktoks = rec.book_id
                                        ? tiktokEmbeds.filter(t => String(t.book_id) === String(rec.book_id))
                                        : tiktokEmbeds;

                                    return (
                                        <div 
                                            key={idx} 
                                            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-card space-y-3 relative shadow-2xs"
                                        >
                                            <div className="flex items-center justify-between pb-2 border-b">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-md bg-[#DA6B1C] text-white font-mono font-bold text-xs flex items-center justify-center">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="font-bold text-xs">Item Rekomendasi #{idx + 1}</span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleRemoveRecommendation(idx)}
                                                    title="Hapus Rekomendasi Ini"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                                {/* Nomor Urut */}
                                                <div className="md:col-span-2 space-y-1">
                                                    <Label className="text-[11px] font-mono">Nomor Urut</Label>
                                                    <Input
                                                        type="number"
                                                        value={rec.number}
                                                        onChange={(e) => handleRecommendationChange(idx, 'number', e.target.value)}
                                                        placeholder="Misal: 1"
                                                        className="text-xs"
                                                    />
                                                </div>

                                                {/* Judul Rekomendasi */}
                                                <div className="md:col-span-10 space-y-1">
                                                    <Label className="text-[11px]">Judul Rekomendasi</Label>
                                                    <Input
                                                        value={rec.title}
                                                        onChange={(e) => handleRecommendationChange(idx, 'title', e.target.value)}
                                                        placeholder="Contoh: Frieren: After the End (Vol 1)"
                                                        className="text-xs"
                                                    />
                                                </div>
                                            </div>

                                            {/* Deskripsi Rekomendasi */}
                                            <div className="space-y-1">
                                                <Label className="text-[11px]">Deskripsi / Ulasan Mengapa Direkomendasikan</Label>
                                                <Textarea
                                                    rows={2}
                                                    value={rec.description}
                                                    onChange={(e) => handleRecommendationChange(idx, 'description', e.target.value)}
                                                    placeholder="Jelaskan alasan mengapa buku ini wajib dibaca atau kualitas cetakannya..."
                                                    className="text-xs"
                                                />
                                            </div>

                                            {/* Dropdown Pilihan Buku & TikTok */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                                                {/* Pilihan Buku */}
                                                <div className="space-y-1">
                                                    <Label className="text-[11px] flex items-center gap-1.5 font-semibold">
                                                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span>Hubungkan dengan Buku Katalog (Book)</span>
                                                    </Label>
                                                    <select
                                                        value={rec.book_id || ''}
                                                        onChange={(e) => handleRecommendationChange(idx, 'book_id', e.target.value)}
                                                        className="w-full h-9 px-2.5 rounded-md border border-input bg-background text-xs ring-offset-background outline-none focus:ring-1 focus:ring-ring"
                                                    >
                                                        <option value="">-- Pilih Buku Dari Katalog --</option>
                                                        {books.map((b) => (
                                                            <option key={b.id} value={b.id}>
                                                                {b.title} Vol {b.volume} {b.publisher ? `(${b.publisher.name})` : ''} {b.msrp ? `- Rp ${Number(b.msrp).toLocaleString('id-ID')}` : ''}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Pilihan TikTok Embed */}
                                                <div className="space-y-1">
                                                    <Label className="text-[11px] flex items-center gap-1.5 font-semibold">
                                                        <Video className="w-3.5 h-3.5 text-rose-600" />
                                                        <span>Pilih Video TikTok Review (BookTiktokEmbed)</span>
                                                    </Label>
                                                    <select
                                                        value={rec.tiktok_embed_id || ''}
                                                        onChange={(e) => handleRecommendationChange(idx, 'tiktok_embed_id', e.target.value)}
                                                        className="w-full h-9 px-2.5 rounded-md border border-input bg-background text-xs ring-offset-background outline-none focus:ring-1 focus:ring-ring"
                                                    >
                                                        <option value="">-- Tanpa Video / Pilih Video TikTok --</option>
                                                        {availableTiktoks.map((t) => {
                                                            const relatedBook = books.find(b => b.id === t.book_id);
                                                            return (
                                                                <option key={t.id} value={t.id}>
                                                                    {t.name} {relatedBook ? `[Buku: ${relatedBook.title} V${relatedBook.volume}]` : ''}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* SECTION: KATALOG RELEVAN (MINI KATALOG SIDEBAR) */}
                    <div className="border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                                <div>
                                    <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                                        Katalog Relevan (Sidebar Detail Berita)
                                    </h3>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        Pilih beberapa buku dari database untuk ditampilkan pada widget "Katalog Relevan"
                                    </p>
                                </div>
                            </div>
                            <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-emerald-600 text-white">
                                {data.relevant_books.length} Buku Terpilih
                            </span>
                        </div>

                        {/* Searchable Book Selector */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                Cari dan Tambah Buku ke Katalog Relevan
                            </Label>
                            <div className="relative" ref={bookDropdownRef}>
                                <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500">
                                    <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                                    <input
                                        type="text"
                                        value={bookSearchTerm}
                                        onChange={(e) => {
                                            setBookSearchTerm(e.target.value);
                                            setIsBookDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsBookDropdownOpen(true)}
                                        placeholder="Ketik judul buku, volume, atau penerbit..."
                                        className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder-neutral-400"
                                    />
                                    {bookSearchTerm && (
                                        <button
                                            type="button"
                                            onClick={() => setBookSearchTerm('')}
                                            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 mr-1"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setIsBookDropdownOpen(prev => !prev)}
                                        className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded text-neutral-700 dark:text-neutral-300 shrink-0 font-medium"
                                    >
                                        {isBookDropdownOpen ? 'Tutup' : 'Pilih'}
                                    </button>
                                </div>

                                {/* Dropdown List with Search Results */}
                                {isBookDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
                                        {books
                                            .filter((b) => {
                                                const searchStr = `${b.title} ${b.volume} ${b.publisher?.name || ''}`.toLowerCase();
                                                return searchStr.includes(bookSearchTerm.toLowerCase());
                                            })
                                            .map((book) => {
                                                const isSelected = data.relevant_books.includes(book.id);
                                                return (
                                                    <button
                                                        key={book.id}
                                                        type="button"
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                setData('relevant_books', data.relevant_books.filter(id => id !== book.id));
                                                            } else {
                                                                setData('relevant_books', [...data.relevant_books, book.id]);
                                                            }
                                                        }}
                                                        className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                                                            isSelected 
                                                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold' 
                                                                : 'hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2 min-w-0 pr-2">
                                                            <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                            <span className="truncate">
                                                                {book.title} Vol {book.volume} {book.publisher ? `(${book.publisher.name})` : ''}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 shrink-0">
                                                            <span className="text-[10px] font-mono text-neutral-400">
                                                                Rp {book.msrp ? Number(book.msrp).toLocaleString('id-ID') : '45.000'}
                                                            </span>
                                                            {isSelected ? (
                                                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                                            ) : (
                                                                <Plus className="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-700 shrink-0" />
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        <div className="p-2 bg-neutral-50 dark:bg-neutral-850 text-center">
                                            <button
                                                type="button"
                                                onClick={() => setIsBookDropdownOpen(false)}
                                                className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 hover:underline"
                                            >
                                                Selesai / Tutup Pilihan
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected Books Badge / Chip List */}
                        {data.relevant_books.length > 0 ? (
                            <div className="space-y-2 pt-2">
                                <Label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                                    Daftar Buku Terpilih ({data.relevant_books.length}):
                                </Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {data.relevant_books.map((bookId) => {
                                        const book = books.find(b => b.id === bookId);
                                        if (!book) return null;
                                        return (
                                            <div 
                                                key={bookId} 
                                                className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-800 rounded-lg shadow-2xs text-xs"
                                            >
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="w-5 h-5 rounded bg-emerald-600 text-white font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                                                        V{book.volume}
                                                    </span>
                                                    <span className="truncate font-medium text-neutral-900 dark:text-neutral-100">
                                                        {book.title}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setData('relevant_books', data.relevant_books.filter(id => id !== bookId))}
                                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 shrink-0"
                                                    title="Hapus dari Katalog Relevan"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-neutral-400 italic">
                                Belum ada buku yang dipilih. Jika dikosongkan, sistem akan otomatis memilih buku teratas dari katalog.
                            </p>
                        )}
                    </div>

                    {/* SECTION OPSIONAL: POLLING KOMUNITAS */}
                    <div className="border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <h3 className="font-bold text-sm text-indigo-900 dark:text-indigo-200">
                                    Fitur Opsional: Poling Komunitas
                                </h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="enable_poll"
                                    checked={data.enable_poll}
                                    onChange={(e) => setData('enable_poll', e.target.checked)}
                                    className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                                />
                                <Label htmlFor="enable_poll" className="cursor-pointer text-xs font-bold">
                                    Aktifkan Poling
                                </Label>
                            </div>
                        </div>

                        {data.enable_poll && (
                            <div className="space-y-4 pt-2">
                                <div className="space-y-1.5">
                                    <Label htmlFor="poll_question" className="text-xs">Pertanyaan Poling</Label>
                                    <Input
                                        id="poll_question"
                                        value={data.poll_question}
                                        onChange={(e) => setData('poll_question', e.target.value)}
                                        placeholder="Contoh: Apakah Anda akan membeli edisi komik ini?"
                                        required={data.enable_poll}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-xs">Pilihan Jawaban & Suara Awal (Auto Boost)</Label>
                                    {data.poll_options.map((opt, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <Input
                                                value={opt.label}
                                                onChange={(e) => handlePollOptionChange(idx, 'label', e.target.value)}
                                                placeholder={`Pilihan ${idx + 1}`}
                                                className="flex-1"
                                                required={data.enable_poll}
                                            />
                                            <div className="w-28 flex items-center gap-1">
                                                <Input
                                                    type="number"
                                                    value={opt.votes}
                                                    onChange={(e) => handlePollOptionChange(idx, 'votes', parseInt(e.target.value) || 0)}
                                                    placeholder="Suara"
                                                    title="Jumlah Suara Awal"
                                                />
                                            </div>
                                            {data.poll_options.length > 2 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemovePollOption(idx)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddPollOption}
                                        className="text-xs"
                                    >
                                        <Plus className="w-3.5 h-3.5 mr-1" />
                                        Tambah Opsi Jawaban
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION OPSIONAL: BOOST ANKGA REACTION EMOJI */}
                    <div className="border border-orange-200 dark:border-orange-900/60 bg-orange-50/50 dark:bg-orange-950/20 p-5 rounded-xl space-y-4">
                        <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            <h3 className="font-bold text-sm text-orange-900 dark:text-orange-200">
                                Angka Reaksi Awal (Ramai / High-Engagement Boost)
                            </h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Atur jumlah reaksi emoji awal agar postingan tidak terlihat sepi saat pertama kali tayang.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {data.reactions.map((react, idx) => (
                                <div key={react.id} className="bg-card border p-3 rounded-lg space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-xs font-bold">
                                        <span>{react.emoji}</span>
                                        <span>{react.label}</span>
                                    </div>
                                    <Input
                                        type="number"
                                        value={react.count}
                                        onChange={(e) => handleReactionChange(idx, parseInt(e.target.value) || 0)}
                                        className="text-xs h-8"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="is_pinned"
                            checked={data.is_pinned}
                            onChange={(e) => setData('is_pinned', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        />
                        <Label htmlFor="is_pinned" className="cursor-pointer font-bold">
                            Sematkan di Berita Utama / Pinned Announcement
                        </Label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.news.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            Publikasikan Berita
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
