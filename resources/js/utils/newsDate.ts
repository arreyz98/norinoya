const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export function parseNewsDate(value?: string | null): number | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) return parsed;

  const lower = trimmed.toLowerCase();

  if (
    lower.includes('just now') ||
    lower.includes('baru saja') ||
    lower.includes('sekarang') ||
    lower === 'now'
  ) {
    return Date.now();
  }

  const amount = parseInt(lower.match(/\d+/)?.[0] || '1', 10) || 1;

  if (lower.includes('menit') || lower.includes('minute') || lower.includes('min')) {
    return Date.now() - amount * MINUTE;
  }
  if (lower.includes('jam') || lower.includes('hour')) {
    return Date.now() - amount * HOUR;
  }
  if (lower.includes('hari') || lower.includes('day')) {
    return Date.now() - amount * DAY;
  }
  if (lower.includes('minggu') || lower.includes('week') || lower.includes('pekan')) {
    return Date.now() - amount * WEEK;
  }
  if (lower.includes('bulan') || lower.includes('month')) {
    return Date.now() - amount * MONTH;
  }
  if (lower.includes('tahun') || lower.includes('year')) {
    return Date.now() - amount * YEAR;
  }

  return null;
}

export function isPostToday(ms: number | null): boolean {
  if (ms === null) return false;
  const date = new Date(ms);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function isPostWithinDays(ms: number | null, days: number): boolean {
  if (ms === null) return false;
  const now = Date.now();
  return ms >= now - days * DAY && ms <= now + DAY;
}

export function formatTimeAgo(value?: string | null): string {
  const ms = parseNewsDate(value);
  if (ms === null) return 'Baru saja';

  const diff = Date.now() - ms;
  if (diff < MINUTE) return 'Baru saja';
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} menit yang lalu`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)} jam yang lalu`;
  if (diff < WEEK) return `${Math.floor(diff / DAY)} hari yang lalu`;

  return new Date(ms).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}