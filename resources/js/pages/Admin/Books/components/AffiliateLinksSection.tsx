import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { FieldError } from './FieldError';
import { type AffiliateLink, type BookFormData, type BookFormSectionProps, type Option } from './book-form-types';

interface AffiliateLinksSectionProps extends BookFormSectionProps {
    form: BookFormData;
    affiliateStores: Option[];
    addAffiliateLink: () => void;
    removeAffiliateLink: (index: number) => void;
    updateAffiliateLink: (index: number, field: keyof AffiliateLink, value: string) => void;
}

export default function AffiliateLinksSection({
    form,
    affiliateStores,
    addAffiliateLink,
    removeAffiliateLink,
    updateAffiliateLink,
    activeErrors,
    getFieldProps,
}: AffiliateLinksSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Affiliate Links</CardTitle>

                <CardDescription>Tambahkan link pembelian dari berbagai toko.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {form.affiliate_links.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-6 text-center">
                        <p className="text-muted-foreground text-sm">Belum ada affiliate link.</p>
                    </div>
                ) : (
                    form.affiliate_links.map((link, index) => (
                        <div key={index} className="rounded-lg border p-4">
                            <div className="grid gap-4 md:grid-cols-[220px_1fr_auto]">
                                <div className="space-y-2">
                                    <Label>Toko</Label>

                                    <Select
                                        value={link.affiliate_store_id}
                                        onValueChange={(value) => updateAffiliateLink(index, 'affiliate_store_id', value)}
                                    >
                                        <SelectTrigger {...getFieldProps(`affiliate_links.${index}.affiliate_store_id`)}>
                                            <SelectValue placeholder="Pilih toko" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {affiliateStores.map((store) => (
                                                <SelectItem key={store.id} value={String(store.id)}>
                                                    {store.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FieldError field={`affiliate_links.${index}.affiliate_store_id`} errors={activeErrors} />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Nama Toko</Label>

                                        <Input
                                            id={`affiliate_links.${index}.store_name`}
                                            name="affiliate_store_name"
                                            autoComplete="on"
                                            value={link.store_name || ''}
                                            onChange={(event) => updateAffiliateLink(index, 'store_name', event.target.value)}
                                            placeholder="Official Store"
                                        />

                                        <FieldError field={`affiliate_links.${index}.store_name`} errors={activeErrors} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Lokasi</Label>

                                        <Input
                                            id={`affiliate_links.${index}.location`}
                                            name="affiliate_store_location"
                                            autoComplete="on"
                                            value={link.location || ''}
                                            onChange={(event) => updateAffiliateLink(index, 'location', event.target.value)}
                                            placeholder="Indonesia"
                                        />

                                        <FieldError field={`affiliate_links.${index}.location`} errors={activeErrors} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Link</Label>

                                    <Input
                                        id={`affiliate_links.${index}.url`}
                                        name="affiliate_store_url"
                                        autoComplete="on"
                                        type="url"
                                        value={link.url}
                                        onChange={(event) => updateAffiliateLink(index, 'url', event.target.value)}
                                        placeholder="https://tokopedia.com/..."
                                    />

                                    <FieldError field={`affiliate_links.${index}.url`} errors={activeErrors} />
                                </div>

                                <div className="flex items-end">
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeAffiliateLink(index)}>
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <Button type="button" variant="outline" onClick={addAffiliateLink}>
                    <Plus className="mr-2 size-4" />
                    Tambah Affiliate Link
                </Button>

                <FieldError field="affiliate_links" errors={activeErrors} />
            </CardContent>
        </Card>
    );
}
