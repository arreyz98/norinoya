import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { FieldError } from './FieldError';
import { type BookFormData, type BookFormSectionProps, type EnumOption, type VideoLink } from './book-form-types';

interface VideoLinksSectionProps extends BookFormSectionProps {
    form: BookFormData;
    videoAccessTypes: EnumOption[];
    addVideoLink: () => void;
    removeVideoLink: (index: number) => void;
    updateVideoLink: (index: number, field: keyof VideoLink, value: string) => void;
}

export default function VideoLinksSection({
    form,
    videoAccessTypes,
    addVideoLink,
    removeVideoLink,
    updateVideoLink,
    activeErrors,
    getFieldProps,
}: VideoLinksSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Link Video</CardTitle>

                <CardDescription>Tambahkan link video terkait buku ini.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {form.video_links.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-6 text-center">
                        <p className="text-muted-foreground text-sm">Belum ada link video.</p>
                    </div>
                ) : (
                    form.video_links.map((video, index) => (
                        <div key={index} className="space-y-3 rounded-lg border p-4">
                            <FieldError field={`video_links.${index}.id`} errors={activeErrors} />

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[220px_1fr_180px_1fr_auto]">
                                <div className="space-y-2">
                                    <Label htmlFor={`video_links.${index}.platform_name`}>Nama Platform</Label>

                                    <Input
                                        id={`video_links.${index}.platform_name`}
                                        {...getFieldProps(`video_links.${index}.platform_name`)}
                                        maxLength={255}
                                        name="video_platform_name"
                                        value={video.platform_name}
                                        onChange={(event) => updateVideoLink(index, 'platform_name', event.target.value)}
                                        placeholder="YouTube"
                                    />

                                    <FieldError field={`video_links.${index}.platform_name`} errors={activeErrors} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`video_links.${index}.title`}>Judul</Label>

                                    <Input
                                        id={`video_links.${index}.title`}
                                        {...getFieldProps(`video_links.${index}.title`)}
                                        maxLength={255}
                                        name="video_title"
                                        value={video.title || ''}
                                        onChange={(event) => updateVideoLink(index, 'title', event.target.value)}
                                        placeholder="Review volume 1"
                                    />

                                    <FieldError field={`video_links.${index}.title`} errors={activeErrors} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`video_links.${index}.access_type`}>Akses</Label>

                                    <Select value={video.access_type} onValueChange={(value) => updateVideoLink(index, 'access_type', value)}>
                                        <SelectTrigger id={`video_links.${index}.access_type`} {...getFieldProps(`video_links.${index}.access_type`)}>
                                            <SelectValue placeholder="Pilih akses" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {videoAccessTypes.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FieldError field={`video_links.${index}.access_type`} errors={activeErrors} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`video_links.${index}.url`}>Link</Label>

                                    <Input
                                        id={`video_links.${index}.url`}
                                        {...getFieldProps(`video_links.${index}.url`)}
                                        maxLength={2048}
                                        name="video_url"
                                        type="url"
                                        value={video.url}
                                        onChange={(event) => updateVideoLink(index, 'url', event.target.value)}
                                        placeholder="https://youtube.com/watch?v=..."
                                    />

                                    <FieldError field={`video_links.${index}.url`} errors={activeErrors} />
                                </div>

                                <div className="flex items-end">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        aria-label={`Hapus link video ${index + 1}`}
                                        onClick={() => removeVideoLink(index)}
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <Button type="button" variant="outline" onClick={addVideoLink} disabled={form.video_links.length >= 20}>
                    <Plus className="mr-2 size-4" />
                    Tambah Link Video
                </Button>

                <p className="text-muted-foreground text-xs">{form.video_links.length}/20 link video digunakan.</p>

                <FieldError field="video_links" errors={activeErrors} />
            </CardContent>
        </Card>
    );
}
