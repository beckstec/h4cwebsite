// src/lib/api.ts
export const API = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export type Cause = { id: string; title: string; slug?: string; category?: string; goalAmount?: number; raisedAmount?: number; imageUrl?: string; summary?: string; };
export type Volunteer = { id: string; name: string; role?: string; imageUrl?: string; bio?: string; socialLinks?: { facebook?: string; instagram?: string; twitter?: string; linkedin?: string } };
export type EventItem = { id: string; title: string; imageUrl?: string; startsAt?: string; endsAt?: string; location?: string; description?: string; };
export type Blog = { id: string; title: string; slug?: string; imageUrl?: string; tag?: string; excerpt?: string; createdAt?: string; };
export type Testimonial = { id: string; name: string; role?: string; imageUrl?: string; message: string; };
export type Contact = { phone?: string; email?: string; address?: string; socialLinks?: { facebook?: string; instagram?: string; linkedin?: string; twitter?: string } };

export async function getJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('[h4c] fetch failed:', path, e);
    return null;
  }
}

export function imgSrc(url?: string): string {
  if (!url) return '/assets/images/placeholder.png';
  if (url.startsWith('http')) return url;
  return `${API}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function fmtMoney(n?: number): string {
  if (n == null || isNaN(n)) return '$0';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

export function percent(raised?: number, goal?: number): number {
  if (!goal || goal <= 0) return 0;
  return Math.min(100, Math.round(((raised || 0) / goal) * 100));
}

export function escapeHtml(s: string): string {
  return (s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[c]);
}
export function escapeAttr(s?: string): string { return escapeHtml(String(s ?? '')); }

export function socialIconsHtml(s?: Contact['socialLinks']): string {
  return ['facebook', 'instagram', 'linkedin', 'twitter'].map((k, i) => {
    const icon = k === 'facebook' ? 'fa-facebook-f' : k === 'instagram' ? 'fa-instagram' : k === 'linkedin' ? 'fa-linkedin-in' : 'fa-twitter';
    const active = i === 1 ? ' class="active"' : '';
    const href = (s as any)?.[k];
    return href ? `<a${active} href="${escapeAttr(href)}"><i class="fa-brands ${icon}"></i></a>` : '';
  }).join('');
}

export function linkIcon(url?: string, icon?: string, active = false): string {
  if (!url) return '';
  return `<a ${active ? 'class="active"' : ''} href="${escapeAttr(url)}"><i class="fa-brands ${icon}"></i></a>`;
}

export function formatDate(d?: string): string {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return '';
  const month = dt.toLocaleString(undefined, { month: 'short' });
  return `${dt.getDate()}, ${month} ${dt.getFullYear()}`;
}

export function dateRange(a?: string, b?: string): string {
  if (!a && !b) return '';
  const start = a ? new Date(a) : null;
  const end = b ? new Date(b) : null;
  if (start && !end) return formatDate(a);
  if (!start && end) return formatDate(b);
  if (start && end) {
    const sameDay = start.toDateString() === end.toDateString();
    if (sameDay) return `${formatDate(a)}`;
    return `${formatDate(a)} - ${formatDate(b)}`;
  }
  return '';
}
