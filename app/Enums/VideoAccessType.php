<?php

namespace App\Enums;

enum VideoAccessType: string
{
    case FREE = 'free';
    case SUBSCRIPTION = 'subscription';

    public function label(): string
    {
        return match ($this) {
            self::FREE => 'Gratis',
            self::SUBSCRIPTION => 'Subscription',
        };
    }
}
