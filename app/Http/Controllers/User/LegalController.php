<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function privacy(): Response
    {
        return Inertia::render('User/privasi', [
            'meta' => [
                'title' => 'Kebijakan Privasi - Norinoya',
                'description' => 'Kebijakan privasi Norinoya, termasuk penggunaan cookie iklan Google bila iklan ditayangkan.',
                'image' => url('/assets/images/logo-dark.png'),
                'url' => url('/privasi'),
                'type' => 'website',
            ],
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('User/kontak', [
            'meta' => [
                'title' => 'Kontak - Norinoya',
                'description' => 'Hubungi Norinoya di norinoya.official@gmail.com untuk koreksi, hak cipta, dan urusan situs.',
                'image' => url('/assets/images/logo-dark.png'),
                'url' => url('/kontak'),
                'type' => 'website',
            ],
        ]);
    }
}
