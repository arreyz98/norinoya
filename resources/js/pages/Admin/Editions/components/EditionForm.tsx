import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditionFormProps {
    initialValues?: {
        name: string;
    };

    submitLabel: string;

    onSubmit: (
        form: ReturnType<
            typeof useForm<{
                name: string;
            }>
        >,
    ) => void;
}

export default function EditionForm({
    initialValues,
    submitLabel,
    onSubmit,
}: EditionFormProps) {
    const form = useForm({
        name: initialValues?.name ?? '',
    });

    const handleSubmit = (
        event: FormEvent,
    ) => {
        event.preventDefault();

        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="name">
                    Nama Edisi
                </Label>

                <Input
                    id="name"
                    value={form.data.name}
                    onChange={(event) =>
                        form.setData(
                            'name',
                            event.target.value,
                        )
                    }
                    placeholder="Contoh: Regular Edition"
                    disabled={form.processing}
                />

                {form.errors.name && (
                    <p className="text-sm text-destructive">
                        {form.errors.name}
                    </p>
                )}
            </div>

            <div className="flex gap-2">
                <Button
                    type="submit"
                    disabled={
                        form.processing ||
                        !form.data.name.trim()
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