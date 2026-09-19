<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Primary Meta Tags --}}
        @php
            $metaData = $page['props']['meta'] ?? null;
            $metaTitle = !empty($metaData['title']) ? $metaData['title'] : config('app.name', 'Norinoya');
            $metaDesc = !empty($metaData['description']) ? $metaData['description'] : 'Norinoya - Database Manga, Komik, & Light Novel Indonesia. Temukan rilisan buku, berita terbaru, dan belanja komik preloved di Kios Norinoya.';
            $metaUrl = !empty($metaData['url']) ? $metaData['url'] : url()->current();
            $metaImage = !empty($metaData['image']) ? $metaData['image'] : asset('assets/images/logo-dark.png');
            $metaType = !empty($metaData['type']) ? $metaData['type'] : 'website';
            $siteName = 'Norinoya';
        @endphp

        <title inertia>{{ $metaTitle }}</title>
        <meta name="description" content="{{ $metaDesc }}">
        <link rel="canonical" href="{{ $metaUrl }}">

        {{-- Open Graph / Facebook / WhatsApp / Discord --}}
        <meta property="og:site_name" content="{{ $siteName }}">
        <meta property="og:type" content="{{ $metaType }}">
        <meta property="og:url" content="{{ $metaUrl }}">
        <meta property="og:title" content="{{ $metaTitle }}">
        <meta property="og:description" content="{{ $metaDesc }}">
        <meta property="og:image" content="{{ $metaImage }}">
        <meta property="og:image:alt" content="{{ $metaTitle }}">

        {{-- Twitter Card / Discord Large Preview --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $metaTitle }}">
        <meta name="twitter:description" content="{{ $metaDesc }}">
        <meta name="twitter:image" content="{{ $metaImage }}">

        {{-- Discord & Mobile Theme Accent --}}
        <meta name="theme-color" content="#E53935">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <style>
      /* Style untuk loader */
      #app:empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      #app:empty::after {
        content: "";
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
        </style>
        <script>
            (function() {
                try {
                    const isUserRoute = !window.location.pathname.startsWith('/dashboard') && 
                                        !window.location.pathname.startsWith('/admin') &&
                                        !window.location.pathname.startsWith('/settings');
                    if (isUserRoute) {
                        const userDark = sessionStorage.getItem('norinoya-dark-mode');
                        if (userDark === 'true') {
                            document.documentElement.classList.add('dark');
                        } else {
                            document.documentElement.classList.remove('dark');
                        }
                    } else {
                        const appearance = localStorage.getItem('appearance') || 'system';
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        if (appearance === 'dark' || (appearance === 'system' && prefersDark)) {
                            document.documentElement.classList.add('dark');
                        } else {
                            document.documentElement.classList.remove('dark');
                        }
                    }
                } catch (e) {}
            })();
        </script>

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#FEFFFE] dark:bg-[#202120] text-neutral-900 dark:text-neutral-50 transition-colors duration-150">
        @inertia
    </body>
</html>
