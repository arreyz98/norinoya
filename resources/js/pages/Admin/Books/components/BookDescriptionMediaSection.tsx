import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { FieldError } from './FieldError';
import { type BookFormData, type BookFormSectionProps, type InstagramEmbed, type NewsLink } from './book-form-types';

interface BookDescriptionMediaSectionProps extends BookFormSectionProps {
    form: BookFormData;
    updateField: <K extends keyof BookFormData>(field: K, value: BookFormData[K]) => void;
    addNewsLink: () => void;
    removeNewsLink: (index: number) => void;
    updateNewsLink: (index: number, field: keyof NewsLink, value: string) => void;
    addTiktokEmbed: () => void;
    removeTiktokEmbed: (index: number) => void;
    updateTiktokEmbed: (index: number, field: 'name' | 'embed_url' | 'url_video', value: string) => void;
    addInstagramEmbed: () => void;
    removeInstagramEmbed: (index: number) => void;
    updateInstagramEmbed: (index: number, field: keyof InstagramEmbed, value: string) => void;
    applyInstagramEmbedHtml: (index: number, raw: string) => void;
}

export default function BookDescriptionMediaSection({
    form,
    updateField,
    addNewsLink,
    removeNewsLink,
    updateNewsLink,
    addTiktokEmbed,
    removeTiktokEmbed,
    updateTiktokEmbed,
    addInstagramEmbed,
    removeInstagramEmbed,
    updateInstagramEmbed,
    applyInstagramEmbedHtml,
    activeErrors,
    getFieldProps,
}: BookDescriptionMediaSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Deskripsi & Media</CardTitle>

                <CardDescription>Informasi deskripsi dan embed media tambahan buku.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                {/* Synopsis */}
                <div className="space-y-2">
                    <Label htmlFor="synopsis">
                        Sinopsis{' '}
                        <span aria-hidden="true" className="text-destructive">
                            *
                        </span>
                    </Label>

                    <Textarea
                        id="synopsis"
                        {...getFieldProps('synopsis')}
                        value={form.synopsis}
                        onChange={(event) => updateField('synopsis', event.target.value)}
                        placeholder="Masukkan sinopsis buku"
                        rows={6}
                    />

                    <FieldError field="synopsis" errors={activeErrors} />
                </div>

                <div className="grid gap-5">
                    {/* Link Berita (bisa lebih dari satu) */}
                    <div className="space-y-3">
                        <Label>Link Berita</Label>
                        <CardDescription>
                            Bisa menambahkan lebih dari satu link (maksimal 10) — berita Norinoya maupun artikel dari situs lain. Tiap link tampil
                            sebagai card terpisah di halaman detail buku.
                        </CardDescription>

                        {form.news_links.map((item, index) => (
                            <div key={index} className="bg-muted/20 space-y-3 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                        Link Berita #{index + 1}
                                    </Label>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="h-7 px-2 text-xs"
                                        onClick={() => removeNewsLink(index)}
                                    >
                                        <Trash2 className="mr-1 size-3.5" />
                                        Hapus
                                    </Button>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Judul (opsional)</Label>
                                        <Input
                                            {...getFieldProps(`news_links.${index}.title`)}
                                            value={item.title || ''}
                                            onChange={(e) => updateNewsLink(index, 'title', e.target.value)}
                                            placeholder="Contoh: Review Lengkap Volume 1"
                                        />
                                        <FieldError field={`news_links.${index}.title`} errors={activeErrors} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs">URL Berita</Label>
                                        <Input
                                            {...getFieldProps(`news_links.${index}.url`)}
                                            type="url"
                                            value={item.url || ''}
                                            onChange={(e) => updateNewsLink(index, 'url', e.target.value)}
                                            placeholder="https://situs.com/news/judul-berita"
                                        />
                                        <FieldError field={`news_links.${index}.url`} errors={activeErrors} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button type="button" variant="outline" onClick={addNewsLink} disabled={form.news_links.length >= 10}>
                            <Plus className="mr-2 size-4" />
                            Tambah Link Berita
                        </Button>

                        <FieldError field="news_links" errors={activeErrors} />
                    </div>

                    {/* MSRP */}
                    <div className="space-y-2">
                        <Label htmlFor="msrp">
                            Harga MSRP{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Input
                            id="msrp"
                            {...getFieldProps('msrp')}
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.msrp}
                            onChange={(event) => updateField('msrp', event.target.value)}
                            placeholder="Contoh: 45000"
                        />

                        <FieldError field="msrp" errors={activeErrors} />
                    </div>
                </div>

                {/* TikTok Embeds */}
                <div className="space-y-3 pt-2">
                    <Label>TikTok Video Links & Review</Label>
                    <CardDescription>
                        Masukkan Judul dan Link video/photo TikTok (maksimal 10 link). Link otomatis dibersihkan saat di-paste.
                    </CardDescription>

                    {form.tiktok_embeds.map((item, index) => (
                        <div key={index} className="bg-muted/20 space-y-3 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                    Video TikTok #{index + 1}
                                </Label>

                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    onClick={() => removeTiktokEmbed(index)}
                                >
                                    <Trash2 className="mr-1 size-3.5" />
                                    Hapus
                                </Button>
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Judul Video</Label>
                                    <Input
                                        {...getFieldProps(`tiktok_embeds.${index}.name`)}
                                        value={item.name || ''}
                                        onChange={(e) => updateTiktokEmbed(index, 'name', e.target.value)}
                                        placeholder="Contoh: Bedah Detail Kertas Jilid 1"
                                    />
                                    <FieldError field={`tiktok_embeds.${index}.name`} errors={activeErrors} />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs">Link TikTok</Label>
                                    <Input
                                        {...getFieldProps(`tiktok_embeds.${index}.url_video`, [`tiktok_embeds.${index}.embed_url`])}
                                        value={item.url_video || item.embed_url || ''}
                                        onChange={(e) => updateTiktokEmbed(index, 'url_video', e.target.value)}
                                        placeholder="https://www.tiktok.com/@norinoya.official/photo/..."
                                    />
                                    <FieldError field={`tiktok_embeds.${index}.url_video`} errors={activeErrors} />
                                    <FieldError field={`tiktok_embeds.${index}.embed_url`} errors={activeErrors} />
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addTiktokEmbed} disabled={form.tiktok_embeds.length >= 10}>
                        <Plus className="mr-2 size-4" />
                        Tambah TikTok Link
                    </Button>

                    <FieldError field="tiktok_embeds" errors={activeErrors} />
                </div>

                {/* Instagram Embeds */}
                <div className="space-y-3 pt-2">
                    <Label>Instagram Post Links & Review</Label>
                    <CardDescription>
                        Tempel <strong>kode embed HTML</strong> dari Microlink (maksimal 10 postingan). Judul & deskripsi terisi otomatis; thumbnail
                        opsional — kalau dikosongkan, kartu tampil sebagai teks saja.
                    </CardDescription>

                    {form.instagram_embeds.map((item, index) => (
                        <div key={index} className="bg-muted/20 space-y-3 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                    Postingan Instagram #{index + 1}
                                </Label>

                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    onClick={() => removeInstagramEmbed(index)}
                                >
                                    <Trash2 className="mr-1 size-3.5" />
                                    Hapus
                                </Button>
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Nama (opsional)</Label>
                                    <Input
                                        {...getFieldProps(`instagram_embeds.${index}.name`)}
                                        value={item.name || ''}
                                        onChange={(e) => updateInstagramEmbed(index, 'name', e.target.value)}
                                        placeholder="Contoh: Review Instagram Jilid 1"
                                    />
                                    <FieldError field={`instagram_embeds.${index}.name`} errors={activeErrors} />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs">Link Instagram (terisi otomatis)</Label>
                                    <Input
                                        {...getFieldProps(`instagram_embeds.${index}.url`)}
                                        value={item.url || ''}
                                        onChange={(e) => updateInstagramEmbed(index, 'url', e.target.value)}
                                        placeholder="https://www.instagram.com/reel/..."
                                    />
                                    <FieldError field={`instagram_embeds.${index}.url`} errors={activeErrors} />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs">Embed HTML Instagram</Label>
                                <Textarea
                                    value={item.embed_html || ''}
                                    onChange={(e) => applyInstagramEmbedHtml(index, e.target.value)}
                                    placeholder="Tempel kode embed HTML dari https://microlink.io/tools/embed-url/instagram di sini…"
                                    rows={4}
                                    className="font-mono text-xs"
                                />
                                <p className="text-muted-foreground text-xs">
                                    Buka <span className="font-medium">microlink.io/tools/embed-url/instagram</span> → tempel link postingan →
                                    Generate → salin kode HTML-nya ke kolom ini.
                                </p>
                            </div>

                            <div className="flex gap-3 rounded-lg border p-3">
                                <div className="bg-muted flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md">
                                    {item.thumbnail_url ? (
                                        <img
                                            src={item.thumbnail_url}
                                            alt={item.title || ''}
                                            referrerPolicy="no-referrer"
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-muted-foreground text-[10px]">Tidak ada gambar</span>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1 space-y-1.5">
                                    <Input
                                        {...getFieldProps(`instagram_embeds.${index}.thumbnail_url`)}
                                        value={item.thumbnail_url || ''}
                                        onChange={(e) => updateInstagramEmbed(index, 'thumbnail_url', e.target.value)}
                                        placeholder="URL Thumbnail (opsional)"
                                    />
                                    <Input
                                        {...getFieldProps(`instagram_embeds.${index}.title`)}
                                        value={item.title || ''}
                                        onChange={(e) => updateInstagramEmbed(index, 'title', e.target.value)}
                                        placeholder="Judul (terisi otomatis)"
                                    />
                                    <Textarea
                                        {...getFieldProps(`instagram_embeds.${index}.description`)}
                                        value={item.description || ''}
                                        onChange={(e) => updateInstagramEmbed(index, 'description', e.target.value)}
                                        placeholder="Deskripsi (terisi otomatis)"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addInstagramEmbed} disabled={form.instagram_embeds.length >= 10}>
                        <Plus className="mr-2 size-4" />
                        Tambah Instagram Link
                    </Button>

                    <FieldError field="instagram_embeds" errors={activeErrors} />
                </div>
            </CardContent>
        </Card>
    );
}
