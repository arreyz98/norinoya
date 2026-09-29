<?php

namespace App\Enums;

enum AgeRating: string
{
    case CHILDREN_PARENTAL_GUIDANCE = 'Anak & Bimbingan Orang Tua';
    case TEEN = 'Remaja';
    case LIGHT_ADULT = 'Dewasa Ringan';
    case HEAVY_ADULT = 'Dewasa Berat';

    public function label(): string
    {
        return match ($this) {
            self::CHILDREN_PARENTAL_GUIDANCE => 'Anak & Bimbingan Orang Tua',
            self::TEEN => 'Remaja',
            self::LIGHT_ADULT => 'Dewasa Ringan',
            self::HEAVY_ADULT => 'Dewasa Berat',
        };
    }
}