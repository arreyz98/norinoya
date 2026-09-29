import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/**
 * Menampilkan skeleton hanya saat Inertia benar-benar sedang memuat rute baru.
 *
 * - Load pertama tidak memakai skeleton, karena props halaman sudah tersedia
 *   bersamaan dengan mount komponen.
 * - Delay singkat mencegah skeleton berkedip pada navigasi yang cepat.
 */
const SKELETON_DELAY_MS = 150;

export function usePageLoading(): boolean {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        const clearPending = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };

        const unbindStart = router.on('start', () => {
            clearPending();
            timer = setTimeout(() => setIsLoading(true), SKELETON_DELAY_MS);
        });

        const unbindFinish = router.on('finish', () => {
            clearPending();
            setIsLoading(false);
        });

        return () => {
            clearPending();
            unbindStart();
            unbindFinish();
        };
    }, []);

    return isLoading;
}
