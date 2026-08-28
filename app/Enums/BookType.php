<?php

namespace App\Enums;

enum BookType: string
{
    case MANGA = 'Manga';
    case KOMIK = 'Komik';
    case LIGHT_NOVEL = 'Light Novel';
    case NOVEL = 'Novel';

    public function label(): string
    {
        return match ($this) {
            self::MANGA => 'Manga',
            self::KOMIK => 'Komik',
            self::LIGHT_NOVEL => 'Light Novel',
            self::NOVEL => 'Novel',
        };
    }
}