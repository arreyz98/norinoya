import * as React from 'react';

export interface FormDraft<T> {
    data: T;
    savedAt: number;
}

interface UseFormDraftOptions<T> {
    /** Kunci penyimpanan di localStorage. */
    storageKey: string;
    /** Data form saat ini. */
    data: T;
    /** Nilai awal form, dipakai untuk mendeteksi form sudah diubah atau belum. */
    initialData: T;
    /**
     * Timestamp (ms) data server. Draf yang lebih tua dari ini dianggap
     * kedaluwarsa dan langsung dibuang, supaya draf lokal tidak menimpa
     * data yang lebih baru di server.
     */
    serverUpdatedAt?: number;
    /** Jeda debounce penyimpanan, default 1200 ms. */
    delay?: number;
    /** Dipanggil saat user memilih memulihkan draf. */
    onRestore: (data: T) => void;
}

interface UseFormDraftResult<T> {
    /** Draf yang menunggu keputusan user; null bila tidak ada. */
    pendingDraft: FormDraft<T> | null;
    restoreDraft: () => void;
    discardDraft: () => void;
    /** Hapus draf tanpa menyentuh form (mis. setelah submit sukses). */
    clearDraft: () => void;
}

const readDraft = <T,>(storageKey: string): FormDraft<T> | null => {
    if (typeof window === 'undefined') return null;

    try {
        const raw = window.localStorage.getItem(storageKey);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as Partial<FormDraft<T>>;

        if (!parsed || typeof parsed.savedAt !== 'number' || parsed.data === undefined) {
            window.localStorage.removeItem(storageKey);
            return null;
        }

        return { data: parsed.data as T, savedAt: parsed.savedAt };
    } catch {
        // localStorage bisa penuh atau dinonaktifkan browser.
        return null;
    }
};

const removeDraft = (storageKey: string): void => {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.removeItem(storageKey);
    } catch {
        // Abaikan: tidak ada yang bisa dilakukan bila storage tidak bisa diakses.
    }
};

/**
 * Autosave draf form ke localStorage.
 *
 * Aman untuk halaman Edit: draf hanya ditawarkan bila lebih baru dari data
 * server, dan penyimpanan tidak pernah menimpa form secara diam-diam.
 */
export function useFormDraft<T>({
    storageKey,
    data,
    initialData,
    serverUpdatedAt,
    delay = 1200,
    onRestore,
}: UseFormDraftOptions<T>): UseFormDraftResult<T> {
    const [pendingDraft, setPendingDraft] = React.useState<FormDraft<T> | null>(null);

    // Snapshot awal dihitung sebagai string supaya identitas objek (yang bisa
    // berubah tiap render) tidak memengaruhi hasil perbandingan.
    const initialSnapshot = JSON.stringify(initialData);
    const currentSnapshot = JSON.stringify(data);
    const isDirty = currentSnapshot !== initialSnapshot;

    // Baca draf sekali saat mount (atau bila storageKey berubah).
    React.useEffect(() => {
        const stored = readDraft<T>(storageKey);

        if (!stored) {
            setPendingDraft(null);
            return;
        }

        // Draf lebih lama dari data server -> sudah kedaluwarsa.
        if (serverUpdatedAt && stored.savedAt <= serverUpdatedAt) {
            removeDraft(storageKey);
            setPendingDraft(null);
            return;
        }

        setPendingDraft(stored);
    }, [serverUpdatedAt, storageKey]);

    // Simpan dengan debounce, hanya setelah form benar-benar diubah, dan tidak
    // selagi masih ada draf yang menunggu keputusan user.
    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!isDirty || pendingDraft) return;

        const timer = window.setTimeout(() => {
            try {
                window.localStorage.setItem(storageKey, JSON.stringify({ data, savedAt: Date.now() }));
            } catch {
                // Abaikan kegagalan penyimpanan (storage penuh / mode privat).
            }
        }, delay);

        return () => window.clearTimeout(timer);
    }, [data, delay, isDirty, pendingDraft, storageKey]);

    const clearDraft = React.useCallback(() => {
        setPendingDraft(null);
        removeDraft(storageKey);
    }, [storageKey]);

    const restoreDraft = React.useCallback(() => {
        if (!pendingDraft) return;

        onRestore(pendingDraft.data);
        clearDraft();
    }, [clearDraft, onRestore, pendingDraft]);

    return { pendingDraft, restoreDraft, discardDraft: clearDraft, clearDraft };
}
