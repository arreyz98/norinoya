import { useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = (appearance: Appearance) => {
    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());

    document.documentElement.classList.toggle('dark', isDark);
};

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

let systemListenerAttached = false;

const isAdminRoute = () =>
    window.location.pathname.startsWith('/dashboard') ||
    window.location.pathname.startsWith('/admin') ||
    window.location.pathname.startsWith('/settings');

export function applyStoredTheme() {
    // Only apply admin/dashboard saved theme if we are in admin/dashboard area or if user explicitly requested it
    if (!isAdminRoute()) {
        const userDark = sessionStorage.getItem('norinoya-dark-mode');
        document.documentElement.classList.toggle('dark', userDark === 'true');
        return;
    }

    const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
    applyTheme(savedAppearance);
}

export function initializeTheme() {
    applyStoredTheme();

    if (isAdminRoute() && !systemListenerAttached) {
        // Add the event listener for system theme changes...
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        systemListenerAttached = true;
    }
}

let currentAppearance: Appearance =
    typeof window !== 'undefined' ? ((localStorage.getItem('appearance') as Appearance) || 'system') : 'system';

const listeners = new Set<(value: Appearance) => void>();

export function updateAppearance(mode: Appearance) {
    currentAppearance = mode;
    localStorage.setItem('appearance', mode);
    applyTheme(mode);
    listeners.forEach((listener) => listener(mode));
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>(currentAppearance);

    useEffect(() => {
        const listener = (value: Appearance) => setAppearance(value);
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    }, []);

    return { appearance, updateAppearance };
}
