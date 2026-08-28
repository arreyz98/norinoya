<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

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
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#FEFFFE] dark:bg-[#202120] text-neutral-900 dark:text-neutral-50 transition-colors duration-150">
        @inertia
    </body>
</html>
