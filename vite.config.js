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
    build: {
        cssCodeSplit: true,
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('motion')) return 'vendor-motion';
                        if (id.includes('lucide-react')) return 'vendor-lucide';
                        if (id.includes('@tiptap')) return 'vendor-tiptap';
                        if (id.includes('date-fns') || id.includes('react-day-picker')) return 'vendor-date';
                        if (id.includes('@radix-ui') || id.includes('@headlessui') || id.includes('cmdk') || id.includes('sonner')) return 'vendor-ui';
                        return 'vendor-react';
                    }
                    // Pisahkan halaman admin (berat: tiptap, editor) dari bundle user
                    if (id.includes('resources/js/pages/Admin')) return 'admin-pages';
                },
            },
        },
    },
});