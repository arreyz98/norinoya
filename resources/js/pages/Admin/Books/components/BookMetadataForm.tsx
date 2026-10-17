import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { FieldError } from './FieldError';
import { type BookFormData, type BookFormSectionProps } from './book-form-types';

interface BookMetadataFormProps extends BookFormSectionProps {
    form: BookFormData;
    updateField: <K extends keyof BookFormData>(field: K, value: BookFormData[K]) => void;
}

export default function BookMetadataForm({ form, updateField, activeErrors, getFieldProps }: BookMetadataFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Spesifikasi &amp; Adaptasi Buku</CardTitle>

                <CardDescription>Detail fisik buku seperti ISBN, jumlah halaman, jenis kertas, ukuran, dan info adaptasi.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                    {/* ISBN */}
                    <div className="space-y-2">
                        <Label htmlFor="isbn">ISBN</Label>

                        <Input
                            id="isbn"
                            {...getFieldProps('isbn')}
                            value={form.isbn}
                            onChange={(event) => updateField('isbn', event.target.value)}
                            placeholder="Contoh: 978-623-87-002-6"
                        />

                        <FieldError field="isbn" errors={activeErrors} />
                    </div>

                    {/* Jumlah Halaman */}
                    <div className="space-y-2">
                        <Label htmlFor="page_count">Jumlah Halaman</Label>

                        <Input
                            id="page_count"
                            {...getFieldProps('page_count')}
                            type="number"
                            min="1"
                            value={form.page_count}
                            onChange={(event) => updateField('page_count', event.target.value)}
                            placeholder="Contoh: 208"
                        />

                        <FieldError field="page_count" errors={activeErrors} />
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* Jenis Kertas */}
                    <div className="space-y-2">
                        <Label htmlFor="paper_type">Jenis Kertas</Label>

                        <Input
                            id="paper_type"
                            {...getFieldProps('paper_type')}
                            value={form.paper_type}
                            onChange={(event) => updateField('paper_type', event.target.value)}
                            placeholder="Contoh: Bookpaper 55g"
                        />

                        <FieldError field="paper_type" errors={activeErrors} />
                    </div>

                    {/* Ukuran Buku / Dimensions */}
                    <div className="space-y-2">
                        <Label htmlFor="dimensions">Ukuran Buku (Dimensi)</Label>

                        <Input
                            id="dimensions"
                            {...getFieldProps('dimensions')}
                            value={form.dimensions}
                            onChange={(event) => updateField('dimensions', event.target.value)}
                            placeholder="Contoh: 13 x 18 cm"
                        />

                        <FieldError field="dimensions" errors={activeErrors} />
                    </div>
                </div>

                {/* Adaptasi */}
                <div className="space-y-2">
                    <Label>Adaptasi Media</Label>

                    <Select value={form.adaptation || 'all'} onValueChange={(value) => updateField('adaptation', value === 'all' ? '' : value)}>
                        <SelectTrigger {...getFieldProps('adaptation')}>
                            <SelectValue placeholder="Pilih adaptasi" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">Semua Adaptasi</SelectItem>
                            <SelectItem value="anime">Anime</SelectItem>
                            <SelectItem value="live_action">Live Action</SelectItem>
                            <SelectItem value="manga">Manga</SelectItem>
                        </SelectContent>
                    </Select>

                    <FieldError field="adaptation" errors={activeErrors} />
                </div>

                {/* Checkbox / Toggle Item Segera Rilis */}
                <div className="border-border/60 border-t pt-3">
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-neutral-50/50 p-3.5 transition-colors hover:bg-neutral-50 dark:bg-neutral-900/50 dark:hover:bg-neutral-900">
                        <input
                            type="checkbox"
                            checked={form.is_upcoming}
                            onChange={(e) => updateField('is_upcoming', e.target.checked)}
                            className="text-primary focus:ring-primary mt-0.5 h-4 w-4 rounded"
                        />
                        <div className="space-y-0.5">
                            <span className="text-foreground flex items-center gap-1.5 text-sm font-semibold">
                                <span>Tampilkan di Section "Item Segera Rilis"</span>
                                <span className="rounded bg-orange-100 px-2 py-0.5 font-mono text-[10px] font-bold text-orange-700 uppercase dark:bg-orange-950 dark:text-orange-300">
                                    Highlight User
                                </span>
                            </span>
                            <p className="text-muted-foreground text-xs">
                                Jika dicentang, buku ini akan dimunculkan pada banner khusus "ITEM SEGERA RILIS" di bagian atas halaman katalog user.
                            </p>
                        </div>
                    </label>
                </div>
            </CardContent>
        </Card>
    );
}
