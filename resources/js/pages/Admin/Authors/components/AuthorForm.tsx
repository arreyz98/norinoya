import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AuthorFormProps {
    initialValues?: {
        name: string;
        biography: string;
    };

    submitLabel: string;

    onSubmit: (
        form: ReturnType<
            typeof useForm<{
                name: string;
                biography: string;
            }>
        >
    ) => void;
}

export default function AuthorForm({
    initialValues,
    submitLabel,
    onSubmit,
}: AuthorFormProps) {
    const form = useForm({
        name: initialValues?.name ?? '',
        biography: initialValues?.biography ?? '',
    });

    const handleSubmit = (
        event: FormEvent
    ) => {
        event.preventDefault();

        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="name">
                    Nama Author
                </Label>

                <Input
                    id="name"
                    value={form.data.name}
                    onChange={(event) =>
                        form.setData(
                            'name',
                            event.target.value
                        )
                    }
                    placeholder="Contoh: Eiichiro Oda"
                    disabled={form.processing}
                />

                {form.errors.name && (
                    <p className="text-sm text-destructive">
                        {form.errors.name}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="biography">
                    Biografi
                </Label>

                <Textarea
                    id="biography"
                    value={form.data.biography}
                    onChange={(event) =>
                        form.setData(
                            'biography',
                            event.target.value
                        )
                    }
                    placeholder="Biografi author..."
                    rows={6}
                    disabled={form.processing}
                />

                {form.errors.biography && (
                    <p className="text-sm text-destructive">
                        {form.errors.biography}
                    </p>
                )}
            </div>

            <div className="flex justify-end">
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