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

    // Nilai terbaru disimpan di ref supaya listener `pagehide`/`beforeunload`
    // bisa menulis draf tanpa perlu dipasang ulang tiap keystroke.
    const dataRef = React.useRef(data);
    const isDirtyRef = React.useRef(isDirty);
    const snapshotRef = React.useRef(currentSnapshot);
    React.useEffect(() => {
        dataRef.current = data;
        isDirtyRef.current = isDirty;
        snapshotRef.current = currentSnapshot;
    }, [data, isDirty, currentSnapshot]);

    // `onRestore` biasanya arrow function inline dari pemanggil (identitas baru
    // tiap render), jadi disimpan di ref agar tidak memicu efek berulang.
    const onRestoreRef = React.useRef(onRestore);
    React.useEffect(() => {
        onRestoreRef.current = onRestore;
    }, [onRestore]);

    // Snapshot data saat draf dibuang / submit sukses. Draf tidak boleh ditulis
    // lagi selama data masih sama persis dengan snapshot ini — tetapi begitu user
    // mengetik lagi (snapshot berubah), autosave hidup kembali seperti biasa.
    const clearedSnapshotRef = React.useRef<string | null>(null);

    const autoRestoredRef = React.useRef(false);

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

        // Pulihkan otomatis sekali per mount, supaya isi form tidak hilang ketika
        // halaman di-refresh (F5) atau browser tertutup tak sengaja. Aman karena
        // draf hanya dipakai bila lebih baru dari data server, dan saat mount form
        // belum punya perubahan user yang bisa tertimpa.
        if (!autoRestoredRef.current) {
            autoRestoredRef.current = true;
            onRestoreRef.current(stored.data);
            setPendingDraft(null);
            return;
        }

        setPendingDraft(stored);
    }, [serverUpdatedAt, storageKey]);

    // Simpan dengan debounce, hanya setelah form benar-benar diubah, dan tidak
    // selagi masih ada draf yang menunggu keputusan user.
    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!isDirty || pendingDraft || clearedSnapshotRef.current === currentSnapshot) return;

        const timer = window.setTimeout(() => {
            try {
                window.localStorage.setItem(storageKey, JSON.stringify({ data, savedAt: Date.now() }));
            } catch {
                // Abaikan kegagalan penyimpanan (storage penuh / mode privat).
            }
        }, delay);

        return () => window.clearTimeout(timer);
    }, [data, delay, isDirty, pendingDraft, storageKey, currentSnapshot]);

    // Simpan paksa saat halaman akan ditinggalkan (refresh / tutup tab). Tanpa ini,
    // ketikan yang lebih muda dari `delay` detik ikut hilang saat F5 — penyebab
    // "isi berita hilang semua" setelah refresh.
    React.useEffect(() => {
        if (typeof window === 'undefined') return;

        const flush = () => {
            if (!isDirtyRef.current || clearedSnapshotRef.current === snapshotRef.current) return;

            try {
                window.localStorage.setItem(
                    storageKey,
                    JSON.stringify({ data: dataRef.current, savedAt: Date.now() }),
                );
            } catch {
                // Abaikan: tidak ada yang bisa dilakukan saat storage tidak bisa diakses.
            }
        };

        window.addEventListener('pagehide', flush);
        window.addEventListener('beforeunload', flush);

        return () => {
            window.removeEventListener('pagehide', flush);
            window.removeEventListener('beforeunload', flush);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey]);

    const clearDraft = React.useCallback(() => {
        // Tandai snapshot saat ini agar draf tidak langsung tertulis ulang.
        clearedSnapshotRef.current = snapshotRef.current;
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
