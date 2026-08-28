import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BookSeriesFormProps {
    mode: 'create' | 'edit';

    initialValues?: {
        title: string;
        description: string;
    };

    onSubmit: (
        form: ReturnType<typeof useForm<{
            title: string;
            description: string;
        }>>
    ) => void;

    submitLabel: string;
}

export default function BookSeriesForm({
    initialValues,
    onSubmit,
    submitLabel,
}: BookSeriesFormProps) {
    const form = useForm({
        title: initialValues?.title ?? '',
        description: initialValues?.description ?? '',
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="title">
                    Nama Series
                </Label>

                <Input
                    id="title"
                    value={form.data.title}
                    onChange={(event) =>
                        form.setData(
                            'title',
                            event.target.value
                        )
                    }
                    placeholder="Contoh: One Piece"
                    disabled={form.processing}
                />

                {form.errors.title && (
                    <p className="text-sm text-destructive">
                        {form.errors.title}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">
                    Deskripsi
                </Label>

                <Textarea
                    id="description"
                    value={form.data.description}
                    onChange={(event) =>
                        form.setData(
                            'description',
                            event.target.value
                        )
                    }
                    placeholder="Deskripsi singkat mengenai series..."
                    rows={6}
                    disabled={form.processing}
                />

                {form.errors.description && (
                    <p className="text-sm text-destructive">
                        {form.errors.description}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-end gap-3">
                <Button
                    type="submit"
                    disabled={
                        form.processing ||
                        !form.data.title.trim()
                    }
                >
                    {form.processing
                        ? 'Menyimpan...'
                        : submitLabel}
                </Button>
            </div>
        </form>
    );
}