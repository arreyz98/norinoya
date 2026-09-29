import { useState, useEffect, useCallback } from 'react';

export interface BookmarkStore {
  comics: string[];
  news: string[];
  kios: string[];
}

const STORAGE_KEY = 'norinoya_saved_bookmarks_v2';
const EVENT_NAME = 'norinoya_bookmarks_updated';

// Clean initial bookmarks
const getInitialBookmarks = (): BookmarkStore => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        comics: Array.isArray(parsed.comics) ? parsed.comics : [],
        news: Array.isArray(parsed.news) ? parsed.news : [],
        kios: Array.isArray(parsed.kios) ? parsed.kios : [],
      };
    }
  } catch (e) {
    console.error('Error reading bookmarks from localStorage', e);
  }
  
  return {
    comics: [],
    news: [],
    kios: [],
  };
};

export const bookmarkStorage = {
  get: (): BookmarkStore => {
    return getInitialBookmarks();
  },

  set: (store: BookmarkStore) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: store }));
    } catch (e) {
      console.error('Error saving bookmarks to localStorage', e);
    }
  },

  isBookmarked: (type: 'comics' | 'news' | 'kios', id: string): boolean => {
    const current = bookmarkStorage.get();
    return current[type].includes(id);
  },

  toggle: (type: 'comics' | 'news' | 'kios', id: string): boolean => {
    const current = bookmarkStorage.get();
    const exists = current[type].includes(id);
    let nextList: string[];
    
    if (exists) {
      nextList = current[type].filter(item => item !== id);
    } else {
      nextList = [id, ...current[type]];
    }

    const updated = {
      ...current,
      [type]: nextList,
    };
    bookmarkStorage.set(updated);
    return !exists;
  },

  remove: (type: 'comics' | 'news' | 'kios', id: string) => {
    const current = bookmarkStorage.get();
    const updated = {
      ...current,
      [type]: current[type].filter(item => item !== id),
    };
    bookmarkStorage.set(updated);
  },

  clear: (type?: 'comics' | 'news' | 'kios') => {
    const current = bookmarkStorage.get();
    let updated: BookmarkStore;
    if (type) {
      updated = {
        ...current,
        [type]: [],
      };
    } else {
      updated = {
        comics: [],
        news: [],
        kios: [],
      };
    }
    bookmarkStorage.set(updated);
  }
};

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkStore>(() => bookmarkStorage.get());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<BookmarkStore>;
      if (customEvent.detail) {
        setBookmarks(customEvent.detail);
      } else {
        setBookmarks(bookmarkStorage.get());
      }
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const toggle = useCallback((type: 'comics' | 'news' | 'kios', id: string) => {
    return bookmarkStorage.toggle(type, id);
  }, []);

  const remove = useCallback((type: 'comics' | 'news' | 'kios', id: string) => {
    bookmarkStorage.remove(type, id);
  }, []);

  const clear = useCallback((type?: 'comics' | 'news' | 'kios') => {
    bookmarkStorage.clear(type);
  }, []);

  const isSaved = useCallback((type: 'comics' | 'news' | 'kios', id: string) => {
    return bookmarks[type].includes(id);
  }, [bookmarks]);

  const totalCount = bookmarks.comics.length + bookmarks.news.length + bookmarks.kios.length;

  return {
    bookmarks,
    isSaved,
    toggle,
    remove,
    clear,
    counts: {
      comics: bookmarks.comics.length,
      news: bookmarks.news.length,
      kios: bookmarks.kios.length,
      total: totalCount,
    }
  };
}
