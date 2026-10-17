import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, GitBranch } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import PanduanForm, {
    type PanduanFormSubmitPayload,
} from './components/PanduanForm';
import type { EnumOption } from './components/panduan-form-types';
import type { ValidationErrors } from './components/panduan-form-utils';

interface CreatePanduanAdaptasiProps {
    linkCategories: EnumOption[];
    linkStatuses: EnumOption[];
}

export default function CreatePanduanAdaptasi({
    linkCategories,
    linkStatuses,
}: CreatePanduanAdaptasiProps) {
    const { errors } = usePage().props as unknown as { errors: ValidationErrors };
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (payload: PanduanFormSubmitPayload) => {
        router.post(route('admin.panduan-adaptasi.store'), payload as unknown as Record<string, never>, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Panduan Adaptasi', href: '/admin/panduan-adaptasi' },
        { title: 'Tambah Panduan', href: '/admin/panduan-adaptasi/create' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Panduan Adaptasi" />

            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
                            <GitBranch className="h-6 w-6 text-[#112A12] dark:text-emerald-400" />
                            Tambah Panduan Adaptasi
                        </h1>

                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            Buat panduan baru beserta node timeline-nya.
                        </p>
                    </div>

                    <Button variant="outline" asChild className="border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Link href={route('admin.panduan-adaptasi.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <PanduanForm
                    linkCategories={linkCategories}
                    linkStatuses={linkStatuses}
                    submitLabel="Simpan Panduan"
                    processing={processing}
                    errors={errors || {}}
                    onSubmit={handleSubmit}
                    onCancel={() => router.get(route('admin.panduan-adaptasi.index'))}
                />
            </div>
        </AppLayout>
    );
}
