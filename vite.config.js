import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {
    defineConfig
} from 'vite';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    optimizeDeps: {
        include: [
            'react',
            'react/jsx-runtime',
            'react-dom/client',
            'motion/react',
            'lucide-react',
            '@inertiajs/react',
            'ziggy-js',
        ],
    },
    server: {
        warmup: {
            clientFiles: [
                './resources/js/app.tsx',
                './resources/js/pages/User/home.tsx',
                './resources/js/pages/User/news.tsx',
                './resources/js/pages/User/kios.tsx',
                './resources/js/pages/User/bookmark.tsx',
            ],
        },
    },
});