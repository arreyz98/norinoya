import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { FieldError } from './FieldError';
import { type BookFormData, type BookFormSectionProps, type EnumOption, type Option } from './book-form-types';

interface BookBasicInfoProps extends BookFormSectionProps {
    form: BookFormData;
    mode: 'create' | 'edit';
    book?: {
        slug?: string;
    };
    series: Option[];
    editions: Option[];
    storyStatuses: Option[];
    publishers: Option[];
    bookTypes: EnumOption[];
    ageRatings: EnumOption[];
    displayedSlug: string;
    hasSlugInput: boolean;
    updateField: <K extends keyof BookFormData>(field: K, value: BookFormData[K]) => void;
    clearFieldError: (field: string) => void;
}

export default function BookBasicInfo({
    form,
    mode,
    book,
    series,
    editions,
    storyStatuses,
    publishers,
    bookTypes,
    ageRatings,
    displayedSlug,
    hasSlugInput,
    updateField,
    clearFieldError,
    activeErrors,
    getFieldProps,
}: BookBasicInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informasi Buku</CardTitle>

                <CardDescription>Informasi utama mengenai buku.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                {/* Judul */}
                <div className="space-y-2">
                    <Label htmlFor="title">
                        Judul Buku{' '}
                        <span aria-hidden="true" className="text-destructive">
                            *
                        </span>
                    </Label>

                    <Input
                        id="title"
                        {...getFieldProps('title')}
                        value={form.title}
                        onChange={(event) => updateField('title', event.target.value)}
                        placeholder="Masukkan judul buku"
                    />

                    <FieldError field="title" errors={activeErrors} />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* Series */}
                    <div className="space-y-2">
                        <Label>Series</Label>

                        <Select
                            value={form.series_id || 'none'}
                            onValueChange={(value) => {
                                updateField('series_id', value === 'none' ? '' : value);
                                clearFieldError('volume');
                            }}
                        >
                            <SelectTrigger {...getFieldProps('series_id')}>
                                <SelectValue placeholder="Pilih series" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="none">Tidak ada</SelectItem>

                                {series.map((item) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.title || item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError field="series_id" errors={activeErrors} />
                    </div>

                    {/* Volume */}
                    <div className="space-y-2">
                        <Label htmlFor="volume">
                            Volume{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Input
                            id="volume"
                            {...getFieldProps('volume')}
                            type="text"
                            value={form.volume}
                            onChange={(event) => updateField('volume', event.target.value)}
                            placeholder="Contoh: 1, 16.5, Limited Edition"
                        />

                        <FieldError field="volume" errors={activeErrors} />

                        <p className="text-muted-foreground text-xs">
                            Volume tidak boleh sama dalam series yang sama. Boleh berupa angka (mis. 1, 16.5) atau teks (mis. Limited Edition).
                        </p>
                    </div>
                </div>

                {/* Slug preview: mengikuti aturan Str::slug + sufiks unik backend */}
                <div className="rounded-lg border border-dashed bg-neutral-50/60 p-3.5 dark:bg-neutral-900/40">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">Slug URL</span>

                        {mode === 'edit' && book?.slug && displayedSlug !== book.slug && (
                            <span className="text-muted-foreground max-w-full truncate font-mono text-[11px]">Sebelumnya: {book.slug}</span>
                        )}
                    </div>

                    <p className="mt-1 truncate font-mono text-sm">/buku/{hasSlugInput ? displayedSlug || '…' : '…'}</p>

                    <p className="text-muted-foreground mt-1 text-xs">
                        Slug dibentuk dari judul dan volume dengan aturan yang sama seperti server (termasuk sufiks unik bila slug sudah dipakai),
                        lalu diperbarui otomatis saat formulir disimpan sehingga URL selalu mengikuti data terbaru.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* Edition */}
                    <div className="space-y-2">
                        <Label>
                            Edisi Cetakan{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Select value={form.edition_id} onValueChange={(value) => updateField('edition_id', value)}>
                            <SelectTrigger {...getFieldProps('edition_id')}>
                                <SelectValue placeholder="Pilih edisi" />
                            </SelectTrigger>

                            <SelectContent>
                                {editions.map((item) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError field="edition_id" errors={activeErrors} />
                    </div>

                    {/* Book Type */}
                    <div className="space-y-2">
                        <Label>
                            Tipe Buku{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Select value={form.book_type} onValueChange={(value) => updateField('book_type', value)}>
                            <SelectTrigger {...getFieldProps('book_type')}>
                                <SelectValue placeholder="Pilih tipe buku" />
                            </SelectTrigger>

                            <SelectContent>
                                {(bookTypes && bookTypes.length > 0
                                    ? bookTypes
                                    : [
                                          // Nilai (bukan sekadar label) harus sama persis dengan backing value
                                          // App\Enums\BookType, karena kolom book_type di-cast ke enum tersebut.
                                          { value: 'Manga', label: 'Manga' },
                                          { value: 'Komik', label: 'Komik' },
                                          { value: 'Light Novel', label: 'Light Novel' },
                                          { value: 'Novel', label: 'Novel' },
                                          { value: 'Komik Lokal', label: 'Komik Lokal' },
                                          { value: 'J Lit', label: 'J Lit' },
                                      ]
                                ).map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError field="book_type" errors={activeErrors} />
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    {/* Story Status */}
                    <div className="space-y-2">
                        <Label>
                            Status Cerita{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Select value={form.story_status_id} onValueChange={(value) => updateField('story_status_id', value)}>
                            <SelectTrigger {...getFieldProps('story_status_id')}>
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>

                            <SelectContent>
                                {storyStatuses.map((item) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError field="story_status_id" errors={activeErrors} />
                    </div>

                    {/* Age Rating */}
                    <div className="space-y-2">
                        <Label>
                            Rating Umur{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Select value={form.age_rating} onValueChange={(value) => updateField('age_rating', value)}>
                            <SelectTrigger {...getFieldProps('age_rating')}>
                                <SelectValue placeholder="Pilih rating umur" />
                            </SelectTrigger>

                            <SelectContent>
                                {ageRatings.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError field="age_rating" errors={activeErrors} />
                    </div>

                    {/* Publisher */}
                    <div className="space-y-2">
                        <Label>
                            Penerbit{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Select value={form.publisher_id} onValueChange={(value) => updateField('publisher_id', value)}>
                            <SelectTrigger {...getFieldProps('publisher_id')}>
                                <SelectValue placeholder="Pilih penerbit" />
                            </SelectTrigger>

                            <SelectContent>
                                {publishers.map((item) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError field="publisher_id" errors={activeErrors} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
