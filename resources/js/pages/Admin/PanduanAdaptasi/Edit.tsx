import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, GitBranch } from 'lucide-react';
import { useState } from 'react';

import type { PanduanAdaptasi } from '@/types/panduanAdaptasi';

import { Button } from '@/components/ui/button';

import PanduanForm, {
    type PanduanFormSubmitPayload,
} from './components/PanduanForm';
import type { EnumOption } from './components/panduan-form-types';
import type { ValidationErrors } from './components/panduan-form-utils';

interface EditPanduanAdaptasiProps {
    panduanAdaptasi: PanduanAdaptasi;
    linkCategories: EnumOption[];
    linkStatuses: EnumOption[];
}

export default function EditPanduanAdaptasi({
    panduanAdaptasi,
    linkCategories,
    linkStatuses,
}: EditPanduanAdaptasiProps) {
    const { errors } = usePage().props as unknown as { errors: ValidationErrors };
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (payload: PanduanFormSubmitPayload) => {
        router.put(
            route('admin.panduan-adaptasi.update', panduanAdaptasi.id),
            payload as unknown as Record<string, never>,
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            },
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Panduan Adaptasi', href: '/admin/panduan-adaptasi' },
        { title: `Edit ${panduanAdaptasi.title}`, href: `/admin/panduan-adaptasi/${panduanAdaptasi.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${panduanAdaptasi.title}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
                            <GitBranch className="h-6 w-6 text-[#112A12] dark:text-emerald-400" />
                            Edit Panduan Adaptasi
                        </h1>

                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            Perbarui informasi panduan, node timeline, dan link di dalamnya.
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
                    initialPanduan={{
                        title: panduanAdaptasi.title,
                        description: panduanAdaptasi.description,
                        nodes: panduanAdaptasi.nodes,
                    }}
                    linkCategories={linkCategories}
                    linkStatuses={linkStatuses}
                    submitLabel="Simpan Perubahan"
                    processing={processing}
                    errors={errors || {}}
                    onSubmit={handleSubmit}
                    onCancel={() => router.get(route('admin.panduan-adaptasi.index'))}
                />
            </div>
        </AppLayout>
    );
}
