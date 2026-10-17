<?php

namespace App\Enums;

enum PanduanLinkCategory: string
{
    case TAKARIR = 'takarir';
    case DUBBING = 'dubbing';
    case BACA = 'baca';

    public function label(): string
    {
        return match ($this) {
            self::TAKARIR => 'Takarir Indonesia',
            self::DUBBING => 'Dubbing Indonesia',
            self::BACA => 'Rekomendasi Tempat Baca',
        };
    }
}
