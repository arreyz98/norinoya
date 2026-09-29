import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { GripVertical, Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Books',
        href: '/admin/books',
    },
    {
        title: 'Volume Order',
        href: '/admin/books/volume-order',
    },
];

interface SeriesItem {
    id: number;
    title: string;
}

interface VolumeItem {
    id: number;
    title: string;
    volume: string;
    sort_order: number;
}

interface Props {
    seriesList: SeriesItem[];
}

export default function VolumeOrder({ seriesList }: Props) {
    const { errors } = usePage().props as unknown as { errors: Record<string, string> };
    const [selectedSeriesId, setSelectedSeriesId] = useState<string>('');
    const [volumes, setVolumes] = useState<VolumeItem[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [processing, setProcessing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const fetchVolumes = (seriesId: string) => {
        if (!seriesId || seriesId === 'none') {
            setVolumes([]);
            return;
        }

        fetch(route('admin.books.volume-order.volumes', seriesId))
            .then((res) => res.json())
            .then((data) => {
                const fetchedVolumes = data.volumes || [];
                setVolumes(fetchedVolumes);
                setHasChanges(false);
            })
            .catch(() => {
                toast.error('Gagal memuat data volume.');
            });
    };

    useEffect(() => {
        if (selectedSeriesId && selectedSeriesId !== 'none') {
            fetchVolumes(selectedSeriesId);
        } else {
            setVolumes([]);
        }
    }, [selectedSeriesId]);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, dragOverIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null) return;

        const newVolumes = [...volumes];
        const draggedItem = newVolumes[draggedIndex];
        const dragOverItem = newVolumes[dragOverIndex];

        newVolumes[draggedIndex] = dragOverItem;
        newVolumes[dragOverIndex] = draggedItem;

        setVolumes(newVolumes);
        setDraggedIndex(dragOverIndex);
        setHasChanges(true);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleSaveOrder = () => {
        if (volumes.length === 0) return;

        setProcessing(true);

        const orders = volumes.map((vol, index) => ({
            id: vol.id,
            sort_order: index,
        }));

        fetch(route('admin.books.volume-order.update'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ orders }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success(data.message || 'Urutan volume berhasil disimpan.');
                    setHasChanges(false);
                } else {
                    toast.error('Gagal menyimpan urutan volume.');
                }
            })
            .catch(() => {
                toast.error('Terjadi kesalahan saat menyimpan.');
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    const handleRefresh = () => {
        if (selectedSeriesId && selectedSeriesId !== 'none') {
            fetchVolumes(selectedSeriesId);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Atur Urutan Volume" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Atur Urutan Volume
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Seret dan lepas untuk mengatur urutan volume dalam sebuah series.
                    </p>
                </div>

                {errors?.error && (
                    <p className="text-destructive text-sm">{errors.error}</p>
                )}

                <div className="flex gap-4 items-end">
                    <div className="flex-1 max-w-xs">
                        <label className="text-sm font-medium mb-1 block">Pilih Series</label>
                        <Select value={selectedSeriesId} onValueChange={setSelectedSeriesId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih series" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Tidak ada</SelectItem>
                                {seriesList.map((item) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedSeriesId && selectedSeriesId !== 'none' && (
                        <>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRefresh}
                                disabled={processing}
                            >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Refresh
                            </Button>

                            {hasChanges && (
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={handleSaveOrder}
                                    disabled={processing}
                                >
                                    <Save className="w-4 h-4 mr-1" />
                                    {processing ? 'Menyimpan...' : 'Simpan Urutan'}
                                </Button>
                            )}
                        </>
                    )}
                </div>

                {selectedSeriesId && selectedSeriesId !== 'none' && (
                    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                        {volumes.length === 0 ? (
                            <div className="p-6 text-center text-neutral-500">
                                Tidak ada volume dalam series ini.
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-neutral-100 dark:bg-neutral-800">
                                    <tr>
                                        <th className="p-3 text-left text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase">
                                            Grip
                                        </th>
                                        <th className="p-3 text-left text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase">
                                            Volume
                                        </th>
                                        <th className="p-3 text-left text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase">
                                            Judul
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {volumes.map((vol, index) => (
                                        <tr
                                            key={vol.id}
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDragEnd={handleDragEnd}
                                            className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                        >
                                            <td className="p-3 cursor-grab">
                                                <GripVertical className="w-5 h-5 text-neutral-500" />
                                            </td>
                                            <td className="p-3 font-medium">{vol.volume}</td>
                                            <td className="p-3 text-sm text-neutral-600 dark:text-neutral-300">
                                                {vol.title}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
