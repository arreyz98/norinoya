import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Store, Image as ImageIcon, Sparkles, BookOpen, Layers, Tag, ExternalLink, Check, ChevronDown, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { KiosItemData } from './Index';

// Tipe Merch sesuai menu dropdown di EtalaseCatalog.tsx
const MERCH_TYPES = [
  { value: 'manga', label: 'Manga / Buku' },
  { value: 'light_novel', label: 'Light Novel' },
  { value: 'novel', label: 'Novel' },
  { value: 'trading_card', label: 'Trading Card' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'tas', label: 'Tas' },
  { value: 'aksesoris', label: 'Aksesoris' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'dekorasi', label: 'Dekorasi' }
];

// Opsi Kategori Item yang bisa dipilih banyak
const ITEM_CATEGORIES = [
  { id: 'manga', label: 'Manga / Komik' },
  { id: 'light_novel', label: 'Light Novel' },
  { id: 'novel', label: 'Novel' },
  { id: 'apparel', label: 'Apparel / Kaos / Jaket' },
  { id: 'trading_card', label: 'Trading Card / TCG' },
  { id: 'figurine', label: 'Figure / Model Kit' },
  { id: 'tas', label: 'Tas / Pouch' },
  { id: 'aksesoris', label: 'Aksesoris / Gantungan Kunci' },
  { id: 'lifestyle', label: 'Lifestyle / Tumbler / Mug' },
  { id: 'gaming', label: 'Gaming / Deskmat / Mousepad' },
  { id: 'dekorasi', label: 'Dekorasi / Poster / Wall Scroll' },
  { id: 'artbook', label: 'Artbook / Fanbook' },
  { id: 'stationery', label: 'Stationery / Buku Catatan' },
];

const CONDITION_RATINGS = [
  { id: 'S', label: 'Grade S (Kolektor / Mulus Sempurna)' },
  { id: 'A', label: 'Grade A (Sangat Bagus / Sekali Baca)' },
  { id: 'B', label: 'Grade B (Bagus / Sedikit Jejak Baca)' },
  { id: 'C', label: 'Grade C (Cukup / Kertas Menguning Wajar)' },
  { id: 'D', label: 'Grade D (Bacaan Harian / Ada Minus Fisik)' },
];

interface PartnerOption {
    id: number;
    name: string;
    slug: string;
    logo_url?: string | null;
}

interface EnumOption {
    value: string;
    label: string;
}

interface KiosEditProps {
    kiosItem: KiosItemData & {
        merch_type?: string;
        categories?: string[];
        kios_partner_id?: number | string | null;
    };
    partners?: PartnerOption[];
    ageRatings?: EnumOption[];
}

export default function KiosEdit({ kiosItem, partners = [], ageRatings = [] }: KiosEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kios & Preloved', href: '/admin/kios' },
        { title: 'Edit Item', href: `/admin/kios/${kiosItem.id}/edit` },
    ];

    const initialCarouselImages = (kiosItem.carousel_images && kiosItem.carousel_images.length > 0)
        ? [...kiosItem.carousel_images, '', '', '', ''].slice(0, 4)
        : ['', '', '', ''];

    const initialCarouselLabels = (kiosItem.carousel_labels && kiosItem.carousel_labels.length > 0)
        ? [...kiosItem.carousel_labels, 'Cover Depan', 'Punggung Buku (Spine)', 'Cover Belakang', 'Halaman Kertas'].slice(0, 4)
        : ['Cover Depan', 'Punggung Buku (Spine)', 'Cover Belakang', 'Halaman Kertas'];

    const initialCategories = (kiosItem.categories && kiosItem.categories.length > 0)
        ? kiosItem.categories
        : [kiosItem.category || 'manga'];

    const { data, setData, put, processing, errors } = useForm({
        title: kiosItem.title || '',
        merch_type: kiosItem.merch_type || kiosItem.category || 'manga',
        categories: initialCategories as string[],
        cover_image: kiosItem.cover_image || '',
        carousel_images: initialCarouselImages,
        carousel_labels: initialCarouselLabels,
        deskripsi_produk: kiosItem.deskripsi_produk || kiosItem.synopsis || '',
        notes: kiosItem.notes || '',
        price: kiosItem.price || '',
        original_price: kiosItem.original_price || '',
        condition_rating: kiosItem.condition_rating || 'S',
        is_preloved: !!kiosItem.is_preloved,
        is_sold_out: !!kiosItem.is_sold_out,
        rating: kiosItem.rating || 5,
        kios_partner_id: (kiosItem.kios_partner_id || '') as string | number,
        publisher_name: kiosItem.publisher_name || '',
        publisher_id: kiosItem.publisher_id || '',
        author: kiosItem.author || '',
        reading_rating: kiosItem.reading_rating || 'Remaja',
        status: kiosItem.status || 'completed',
        demographic: kiosItem.demographic || 'General',
        isbn: kiosItem.isbn || '',
        release_date: kiosItem.release_date || '',
        cetakan_info: kiosItem.cetakan_info || '',
        shopee_url: kiosItem.shopee_url || '',
        tokopedia_url: kiosItem.tokopedia_url || '',
        gramedia_url: kiosItem.gramedia_url || '',
        toco_url: kiosItem.toco_url || '',
    });

    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleCategory = (catId: string) => {
        const current = [...data.categories];
        if (current.includes(catId)) {
            if (current.length > 1) {
                setData('categories', current.filter(c => c !== catId));
            }
        } else {
            setData('categories', [...current, catId]);
        }
    };

    const removeCategory = (catId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (data.categories.length > 1) {
            setData('categories', data.categories.filter(c => c !== catId));
        }
    };

    const handlePartnerChange = (partnerId: string) => {
        setData('kios_partner_id', partnerId);
        const partner = partners.find(p => String(p.id) === partnerId);
        if (partner) {
            setData(prev => ({
                ...prev,
                kios_partner_id: partnerId,
                publisher_name: partner.name,
                publisher_id: partner.slug,
            }));
        }
    };

    const handleCoverImageChange = (val: string) => {
        const updatedCarousel = [...data.carousel_images];
        updatedCarousel[0] = val; // Cover utama otomatis sinkron jadi foto cover depan slide #1
        setData(prev => ({
            ...prev,
            cover_image: val,
            carousel_images: updatedCarousel,
        }));
    };

    const handleCarouselImageChange = (index: number, val: string) => {
        const updated = [...data.carousel_images];
        updated[index] = val;
        if (index === 0) {
            setData(prev => ({
                ...prev,
                cover_image: val,
                carousel_images: updated,
            }));
        } else {
            setData('carousel_images', updated);
        }
    };

    const handleCarouselLabelChange = (index: number, val: string) => {
        const updated = [...data.carousel_labels];
        updated[index] = val;
        setData('carousel_labels', updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.kios.update', kiosItem.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Item - ${kiosItem.title}`} />

            <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={route('admin.kios.index')}>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
                                Edit Item Kios &amp; Preloved
                            </h1>
                            <p className="text-xs text-neutral-500">
                                ID #{kiosItem.id} • {kiosItem.title}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* TYPE SELECTION CARD */}
                    <div className="p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
                        <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            Tipe Listing Kios
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                                data.is_preloved 
                                    ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/20 ring-1 ring-pink-500' 
                                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
                            }`}>
                                <input
                                    type="radio"
                                    name="is_preloved"
                                    checked={data.is_preloved}
                                    onChange={() => {
                                        setData(prev => ({
                                            ...prev,
                                            is_preloved: true,
                                        }));
                                    }}
                                    className="mt-1"
                                />
                                <div className="space-y-1">
                                    <div className="font-bold text-sm text-pink-900 dark:text-pink-200 flex items-center gap-1.5">
                                        <span>🌸 Preloved Reviewer (@konotasi)</span>
                                    </div>
                                    <p className="text-xs text-neutral-550 dark:text-neutral-400">
                                        Buku/komik bekas ulasan berkualitas tinggi dengan grade kondisi fisik, catatan minus, dan slider galeri detail fisik.
                                    </p>
                                </div>
                            </label>

                            <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                                !data.is_preloved 
                                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-1 ring-emerald-500' 
                                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
                            }`}>
                                <input
                                    type="radio"
                                    name="is_preloved"
                                    checked={!data.is_preloved}
                                    onChange={() => {
                                        setData(prev => ({
                                            ...prev,
                                            is_preloved: false,
                                        }));
                                    }}
                                    className="mt-1"
                                />
                                <div className="space-y-1">
                                    <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                                        <span>🛍️ Partner Merchandise / Official</span>
                                    </div>
                                    <p className="text-xs text-neutral-550 dark:text-neutral-400">
                                        Merchandise resmi partner (Apparel, TCG, Lifestyle, Figure) atau buku original baru dari penerbit.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* BASIC INFORMATION */}
                    <div className="p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
                        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-neutral-600" />
                            <span>Informasi Utama Produk</span>
                        </h3>

                        {/* Title & Author */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="title" className="text-xs font-semibold">Judul Produk Listing *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Frieren Vol 1 (Preloved) / Jujutsu Kaisen Oversized Shirt"
                                    required
                                />
                                {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="author" className="text-xs font-semibold">Author / Creator / Brand</Label>
                                <Input
                                    id="author"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    placeholder="Contoh: Kanehito Yamada / Bandai / Studio Mappa"
                                />
                            </div>
                        </div>

                        {/* Tipe Merch (Dropdown) & Partner Toko (Dropdown Dinamis) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="merch_type" className="text-xs font-semibold flex items-center gap-1.5">
                                    <Layers className="w-3.5 h-3.5 text-neutral-500" />
                                    <span>Tipe Merch (Kategori Utama) *</span>
                                </Label>
                                <select
                                    id="merch_type"
                                    value={data.merch_type}
                                    onChange={(e) => setData('merch_type', e.target.value)}
                                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs font-medium"
                                    required
                                >
                                    {MERCH_TYPES.map((m) => (
                                        <option key={m.value} value={m.value}>{m.label}</option>
                                    ))}
                                </select>
                                {errors.merch_type && <p className="text-xs text-red-500">{errors.merch_type}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="kios_partner_id" className="text-xs font-semibold flex items-center gap-1.5">
                                        <Store className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Nama Partner / Toko / Penerbit</span>
                                    </Label>
                                    <Link href={route('admin.kios-partners.create')} target="_blank" className="text-[11px] text-emerald-600 hover:underline font-medium">
                                        + Tambah Toko Baru
                                    </Link>
                                </div>
                                <select
                                    id="kios_partner_id"
                                    value={data.kios_partner_id || ''}
                                    onChange={(e) => handlePartnerChange(e.target.value)}
                                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs font-medium"
                                >
                                    <option value="">-- Pilih Toko Partner Kios --</option>
                                    {partners.map((partner) => (
                                        <option key={partner.id} value={partner.id}>
                                            {partner.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Multi-Select Dropdown Kategori Item dengan Background Gelap */}
                        <div className="space-y-1.5 pt-2" ref={categoryDropdownRef}>
                            <Label className="text-xs font-semibold block">
                                Kategori Item (Dropdown Multi-Pilih) *
                            </Label>
                            
                            <div className="relative">
                                {/* Trigger Button */}
                                <div
                                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                    className="min-h-[42px] w-full px-3 py-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-xl cursor-pointer flex items-center justify-between gap-2 transition-all shadow-inner text-white"
                                >
                                    <div className="flex flex-wrap gap-1.5 flex-1 items-center">
                                        {data.categories.length > 0 ? (
                                            data.categories.map((catId) => {
                                                const catObj = ITEM_CATEGORIES.find(c => c.id === catId);
                                                return (
                                                    <span
                                                        key={catId}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-neutral-800 text-emerald-400 border border-neutral-700 select-none shadow-xs"
                                                    >
                                                        <span>{catObj ? catObj.label : catId}</span>
                                                        <span
                                                            onClick={(e) => removeCategory(catId, e)}
                                                            className="hover:text-red-400 cursor-pointer p-0.5 rounded"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </span>
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <span className="text-xs text-neutral-400">Pilih satu atau beberapa kategori...</span>
                                        )}
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${isCategoryDropdownOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                                </div>

                                {/* Dark Dropdown Menu */}
                                {isCategoryDropdownOpen && (
                                    <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 z-50 shadow-2xl max-h-64 overflow-y-auto space-y-1">
                                        <div className="text-[10px] font-mono font-bold text-neutral-400 px-2 py-1 uppercase tracking-wider border-b border-neutral-800/80 mb-1">
                                            Daftar Kategori Produk (Klik untuk memilih/membatalkan)
                                        </div>
                                        {ITEM_CATEGORIES.map((cat) => {
                                            const isSelected = data.categories.includes(cat.id);
                                            return (
                                                <div
                                                    key={cat.id}
                                                    onClick={() => toggleCategory(cat.id)}
                                                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                                                        isSelected
                                                            ? 'bg-neutral-800 text-emerald-400 font-bold'
                                                            : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                                            isSelected ? 'bg-emerald-500 border-emerald-500 text-neutral-950' : 'border-neutral-600 bg-neutral-900'
                                                        }`}>
                                                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                                        </div>
                                                        <span>{cat.label}</span>
                                                    </div>
                                                    {isSelected && (
                                                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                                                            Terpilih
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            {errors.categories && <p className="text-xs text-red-500">{errors.categories}</p>}
                        </div>
                    </div>

                    {/* PRICING & STOCK */}
                    <div className="p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
                        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span>Harga &amp; Ketersediaan</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="price" className="text-xs font-semibold">Harga Jual (Rp) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="Contoh: 35000"
                                    required
                                />
                                {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="original_price" className="text-xs font-semibold">Harga Asli / Normal (Rp)</Label>
                                <Input
                                    id="original_price"
                                    type="number"
                                    value={data.original_price}
                                    onChange={(e) => setData('original_price', e.target.value)}
                                    placeholder="Contoh: 45000"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="condition_rating" className="text-xs font-semibold">Grade Kondisi Fisik</Label>
                                <select
                                    id="condition_rating"
                                    value={data.condition_rating}
                                    onChange={(e) => setData('condition_rating', e.target.value)}
                                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs"
                                >
                                    {CONDITION_RATINGS.map((cr) => (
                                        <option key={cr.id} value={cr.id}>{cr.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="reading_rating" className="text-xs font-semibold">Rating Usia (Age Rating)</Label>
                                <select
                                    id="reading_rating"
                                    value={data.reading_rating}
                                    onChange={(e) => setData('reading_rating', e.target.value)}
                                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs"
                                >
                                    {ageRatings.length > 0 ? (
                                        ageRatings.map((ar) => (
                                            <option key={ar.value} value={ar.value}>{ar.label}</option>
                                        ))
                                    ) : (
                                        <>
                                            <option value="Anak & Bimbingan Orang Tua">Anak &amp; Bimbingan Orang Tua</option>
                                            <option value="Remaja">Remaja</option>
                                            <option value="Dewasa Ringan">Dewasa Ringan</option>
                                            <option value="Dewasa Berat">Dewasa Berat</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                            <input
                                type="checkbox"
                                id="is_sold_out"
                                checked={data.is_sold_out}
                                onChange={(e) => setData('is_sold_out', e.target.checked)}
                                className="w-4 h-4 rounded text-red-600 cursor-pointer"
                            />
                            <Label htmlFor="is_sold_out" className="cursor-pointer text-xs font-bold text-red-600">
                                Tandai sebagai HABIS TERJUAL (Sold Out)
                            </Label>
                        </div>
                    </div>

                    {/* IMAGES & GALLERY SLIDER */}
                    <div className="p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
                        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                            <span>Gambar Cover &amp; Slider Galeri Foto Fisik</span>
                        </h3>

                        <div className="space-y-1.5">
                            <Label htmlFor="cover_image" className="text-xs font-semibold">
                                URL Cover Utama Produk * <span className="text-[11px] font-normal text-neutral-400">(Otomatis dijadikan foto Cover Depan galeri)</span>
                            </Label>
                            <Input
                                id="cover_image"
                                value={data.cover_image}
                                onChange={(e) => handleCoverImageChange(e.target.value)}
                                placeholder="https://images.unsplash.com/... atau link gambar"
                            />
                            {data.cover_image && (
                                <div className="mt-2 flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg border">
                                    <img src={data.cover_image} alt="Preview" className="w-12 h-16 object-cover rounded shadow-2xs" />
                                    <span className="text-xs text-neutral-500">Preview Cover Utama &amp; Cover Depan</span>
                                </div>
                            )}
                        </div>

                        {/* Carousel / Slider Images (Up to 4) */}
                        <div className="space-y-3 pt-2">
                            <Label className="text-xs font-semibold block">
                                4 Foto Galeri Slider Detail Kondisi Fisik (Untuk Tampilan Detail Kios):
                            </Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {data.carousel_images.map((img, idx) => (
                                    <div key={idx} className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border space-y-2">
                                        <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300">
                                            <span>Foto Slide #{idx + 1} {idx === 0 && <span className="text-emerald-500 font-normal text-[10px]">(Cover Depan)</span>}</span>
                                        </div>
                                        <Input
                                            value={img}
                                            onChange={(e) => handleCarouselImageChange(idx, e.target.value)}
                                            placeholder={`URL Foto Slide ${idx + 1}`}
                                            className="text-xs h-8"
                                        />
                                        <Input
                                            value={data.carousel_labels[idx] || ''}
                                            onChange={(e) => handleCarouselLabelChange(idx, e.target.value)}
                                            placeholder="Label Caption (e.g. Cover Depan, Spine)"
                                            className="text-xs h-8"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* MARKETPLACE LINKS */}
                    <div className="p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
                        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-orange-600" />
                            <span>Link Pembelian Marketplace</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="shopee_url" className="text-xs font-semibold text-[#EE4D2D]">Link Toko Shopee</Label>
                                <Input
                                    id="shopee_url"
                                    value={data.shopee_url}
                                    onChange={(e) => setData('shopee_url', e.target.value)}
                                    placeholder="https://shopee.co.id/..."
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="tokopedia_url" className="text-xs font-semibold text-[#03AC0E]">Link Toko Tokopedia</Label>
                                <Input
                                    id="tokopedia_url"
                                    value={data.tokopedia_url}
                                    onChange={(e) => setData('tokopedia_url', e.target.value)}
                                    placeholder="https://tokopedia.com/..."
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="gramedia_url" className="text-xs font-semibold text-[#00519E]">Link Toko Gramedia</Label>
                                <Input
                                    id="gramedia_url"
                                    value={data.gramedia_url}
                                    onChange={(e) => setData('gramedia_url', e.target.value)}
                                    placeholder="https://gramedia.com/..."
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="toco_url" className="text-xs font-semibold text-[#D49B00] dark:text-[#FFD400] flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD400] inline-block shrink-0 shadow-2xs"></span>
                                    Link Toko Toco
                                </Label>
                                <Input
                                    id="toco_url"
                                    value={data.toco_url}
                                    onChange={(e) => setData('toco_url', e.target.value)}
                                    placeholder="https://toco.id/..."
                                    className="focus-visible:ring-[#FFD400]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* DESKRIPSI PRODUK & REVIEW NOTES */}
                    <div className="p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
                        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                            <span>Deskripsi Produk &amp; Catatan Kondisi Fisik</span>
                        </h3>

                        <div className="space-y-1.5">
                            <Label htmlFor="deskripsi_produk" className="text-xs font-semibold">Deskripsi Produk</Label>
                            <Textarea
                                id="deskripsi_produk"
                                rows={4}
                                value={data.deskripsi_produk}
                                onChange={(e) => setData('deskripsi_produk', e.target.value)}
                                placeholder="Tuliskan deskripsi lengkap komik, buku, atau spesifikasi merchandise..."
                            />
                            {errors.deskripsi_produk && <p className="text-xs text-red-500">{errors.deskripsi_produk}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="notes" className="text-xs font-semibold">Catatan Kondisi Fisik Reviewer (Preloved)</Label>
                            <Textarea
                                id="notes"
                                rows={3}
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Contoh: Kondisi 98% seperti baru. Hanya dibuka segel untuk review kertas, jaket komik mulus tanpa tekukan..."
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <Link href={route('admin.kios.index')}>
                            <Button type="button" variant="outline" className="text-xs font-bold">
                                Batal
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 text-xs font-bold px-6"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan...' : 'Perbarui Item Kios'}</span>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
