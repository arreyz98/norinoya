import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectList,
    MultiSelectSearch,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';

import { FieldError } from './FieldError';
import { type BookFormData, type BookFormSectionProps, type Option } from './book-form-types';

interface BookAuthorsGenresSectionProps extends BookFormSectionProps {
    form: BookFormData;
    authors: Option[];
    genres: Option[];
    authorOptions: Array<{ value: string; label: string }>;
    genreOptions: Array<{ value: string; label: string }>;
    updateField: <K extends keyof BookFormData>(field: K, value: BookFormData[K]) => void;
}

export default function BookAuthorsGenresSection({
    form,
    authors,
    genres,
    authorOptions,
    genreOptions,
    updateField,
    activeErrors,
    getFieldProps,
}: BookAuthorsGenresSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Author & Genre</CardTitle>

                <CardDescription>Pilih author cerita, author gambar, dan genre buku.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Story Author */}
                    <div className="space-y-2">
                        <Label>Author Story</Label>

                        <MultiSelect
                            values={form.story_authors}
                            options={authorOptions}
                            onValuesChange={(values: string[]) => updateField('story_authors', values)}
                        >
                            <MultiSelectTrigger {...getFieldProps('story_authors', [], 'w-full')}>
                                <MultiSelectValue placeholder="Pilih author story" />
                            </MultiSelectTrigger>

                            <MultiSelectContent>
                                <MultiSelectSearch placeholder="Cari author..." />

                                <MultiSelectList>
                                    <MultiSelectGroup>
                                        {authors.map((author) => (
                                            <MultiSelectItem key={author.id} value={String(author.id)}>
                                                {author.name}
                                            </MultiSelectItem>
                                        ))}
                                    </MultiSelectGroup>
                                </MultiSelectList>
                            </MultiSelectContent>
                        </MultiSelect>

                        <FieldError field="story_authors" errors={activeErrors} />
                    </div>

                    {/* Art Author */}
                    <div className="space-y-2">
                        <Label>Author Art</Label>

                        <MultiSelect
                            values={form.art_authors}
                            options={authorOptions}
                            onValuesChange={(values: string[]) => updateField('art_authors', values)}
                        >
                            <MultiSelectTrigger {...getFieldProps('art_authors', [], 'w-full')}>
                                <MultiSelectValue placeholder="Pilih author art" />
                            </MultiSelectTrigger>

                            <MultiSelectContent>
                                <MultiSelectSearch placeholder="Cari author..." />

                                <MultiSelectList>
                                    <MultiSelectGroup>
                                        {authors.map((author) => (
                                            <MultiSelectItem key={author.id} value={String(author.id)}>
                                                {author.name}
                                            </MultiSelectItem>
                                        ))}
                                    </MultiSelectGroup>
                                </MultiSelectList>
                            </MultiSelectContent>
                        </MultiSelect>

                        <FieldError field="art_authors" errors={activeErrors} />
                    </div>
                </div>

                {/* Genre */}
                <div className="space-y-2">
                    <Label>Genre</Label>

                    <MultiSelect values={form.genres} options={genreOptions} onValuesChange={(values: string[]) => updateField('genres', values)}>
                        <MultiSelectTrigger {...getFieldProps('genres', [], 'w-full')}>
                            <MultiSelectValue placeholder="Pilih genre" />
                        </MultiSelectTrigger>

                        <MultiSelectContent>
                            <MultiSelectSearch placeholder="Cari genre..." />

                            <MultiSelectList>
                                <MultiSelectGroup>
                                    {genres.map((genre) => (
                                        <MultiSelectItem key={genre.id} value={String(genre.id)}>
                                            {genre.name}
                                        </MultiSelectItem>
                                    ))}
                                </MultiSelectGroup>
                            </MultiSelectList>
                        </MultiSelectContent>
                    </MultiSelect>

                    <FieldError field="genres" errors={activeErrors} />
                </div>
            </CardContent>
        </Card>
    );
}
