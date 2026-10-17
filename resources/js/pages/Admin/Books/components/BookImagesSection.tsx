import { Plus, Trash2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FieldError } from './FieldError';
import { type BookFormData, type BookFormSectionProps } from './book-form-types';

interface BookImagesSectionProps extends BookFormSectionProps {
    form: BookFormData;
    addImage: () => void;
    removeImage: (index: number) => void;
    updateImage: (index: number, value: string) => void;
}

export default function BookImagesSection({ form, addImage, removeImage, updateImage, activeErrors, getFieldProps }: BookImagesSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gambar Buku</CardTitle>

                <CardDescription>Masukkan maksimal 5 URL gambar untuk buku.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {form.images.map((image, index) => (
                    <div key={index} className="flex gap-3">
                        <div className="flex-1 space-y-2">
                            <Label>Gambar {index + 1}</Label>

                            <div className="relative">
                                <Input
                                    {...getFieldProps(`images.${index}.image_url`, [], 'pr-10')}
                                    value={image.image_url}
                                    onChange={(event) => updateImage(index, event.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />

                                {image.image_url.trim() !== '' && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        aria-label={`Kosongkan link gambar ${index + 1}`}
                                        onClick={() => updateImage(index, '')}
                                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 size-8 -translate-y-1/2"
                                    >
                                        <X className="size-4" />
                                    </Button>
                                )}
                            </div>

                            <FieldError field={`images.${index}.image_url`} errors={activeErrors} />

                            {image.image_url && (
                                <div className="mt-3 flex items-center gap-4">
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
                                        <img
                                            src={image.image_url}
                                            alt={`Preview gambar ${index + 1}`}
                                            className="block h-full w-full object-cover"
                                            onError={(event) => {
                                                (event.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <span className="text-muted-foreground text-xs">Preview gambar</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-end">
                            {form.images.length > 1 && (
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}>
                                    <Trash2 className="size-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                ))}

                <Button type="button" variant="outline" onClick={addImage} disabled={form.images.length >= 5}>
                    <Plus className="mr-2 size-4" />
                    Tambah Gambar
                </Button>

                <p className="text-muted-foreground text-xs">{form.images.length}/5 gambar digunakan.</p>

                <FieldError field="images" errors={activeErrors} />
            </CardContent>
        </Card>
    );
}
