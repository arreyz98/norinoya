import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { KiosPartnerData } from './Index';

interface KiosPartnerEditProps {
    partner: KiosPartnerData;
}

export default function KiosPartnerEdit({ partner }: KiosPartnerEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Toko Partner Kios', href: '/admin/kios-partners' },
        { title: 'Edit Toko Partner', href: `/admin/kios-partners/${partner.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: partner.name || '',
        slug: partner.slug || '',
        logo_url: partner.logo_url || '',
        description: partner.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.kios-partners.update', partner.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Toko Partner - ${partner.name}`} />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('admin.kios-partners.index')}>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
                            Edit Toko Partner Kios
                        </h1>
                        <p className="text-xs text-neutral-500">
                            ID #{partner.id} • {partner.name}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-xs font-semibold">Nama Toko Partner *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: geekmode.id / Preloved @konotasi / animate"
                                required
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="slug" className="text-xs font-semibold">Slug Identifier (Unik)</Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="Contoh: geekmode / preloved / animate"
                            />
                            {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="logo_url" className="text-xs font-semibold">URL Logo Toko (Opsional)</Label>
                            <Input
                                id="logo_url"
                                value={data.logo_url}
                                onChange={(e) => setData('logo_url', e.target.value)}
                                placeholder="https://... URL gambar/logo"
                            />
                            {data.logo_url && (
                                <div className="mt-2 flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg border">
                                    <img src={data.logo_url} alt="Preview" className="w-10 h-10 object-contain rounded bg-white p-1" />
                                    <span className="text-xs text-neutral-500">Preview Logo</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="description" className="text-xs font-semibold">Deskripsi / Keterangan Toko</Label>
                            <Textarea
                                id="description"
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Keterangan singkat partner atau official store..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <Link href={route('admin.kios-partners.index')}>
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
                            <span>{processing ? 'Menyimpan...' : 'Perbarui Toko Partner'}</span>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
