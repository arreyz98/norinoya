<?php

namespace App\Enums;

enum PanduanLinkStatus: string
{
    case GRATIS = 'gratis';
    case SUBSCRIPTION = 'subscription';
    case DIGITAL = 'digital';
    case FISIK = 'fisik';
    case PENERBIT = 'penerbit';

    public function label(): string
    {
        return match ($this) {
            self::GRATIS => 'Gratis',
            self::SUBSCRIPTION => 'Subscription',
            self::DIGITAL => 'Digital',
            self::FISIK => 'Fisik',
            self::PENERBIT => 'Penerbit',
        };
    }
}
