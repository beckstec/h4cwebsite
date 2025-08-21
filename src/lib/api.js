// src/lib/api.ts
export const API = import.meta.env?.VITE_API_URL || 'http://localhost:4000';
export async function getJSON(path) {
    try {
        const res = await fetch(`${API}${path}`);
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        return await res.json();
    }
    catch (e) {
        console.warn('[h4c] fetch failed:', path, e);
        return null;
    }
}
export function imgSrc(url) {
    if (!url)
        return '/assets/images/placeholder.png';
    if (url.startsWith('http'))
        return url;
    return `${API}${url.startsWith('/') ? '' : '/'}${url}`;
}
export function fmtMoney(n) {
    if (n == null || isNaN(n))
        return '$0';
    if (n >= 1000000)
        return `$${(n / 1000000).toFixed(1)}m`;
    if (n >= 1000)
        return `$${(n / 1000).toFixed(0)}k`;
    return `$${n.toLocaleString()}`;
}
export function percent(raised, goal) {
    if (!goal || goal <= 0)
        return 0;
    return Math.min(100, Math.round(((raised || 0) / goal) * 100));
}
export function escapeHtml(s) {
    return (s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function escapeAttr(s) { return escapeHtml(String(s ?? '')); }
export function socialIconsHtml(s) {
    return ['facebook', 'instagram', 'linkedin', 'twitter'].map((k, i) => {
        const icon = k === 'facebook' ? 'fa-facebook-f' : k === 'instagram' ? 'fa-instagram' : k === 'linkedin' ? 'fa-linkedin-in' : 'fa-twitter';
        const active = i === 1 ? ' class="active"' : '';
        const href = s?.[k];
        return href ? `<a${active} href="${escapeAttr(href)}"><i class="fa-brands ${icon}"></i></a>` : '';
    }).join('');
}
export function linkIcon(url, icon, active = false) {
    if (!url)
        return '';
    return `<a ${active ? 'class="active"' : ''} href="${escapeAttr(url)}"><i class="fa-brands ${icon}"></i></a>`;
}
export function formatDate(d) {
    if (!d)
        return '';
    const dt = new Date(d);
    if (isNaN(dt.getTime()))
        return '';
    const month = dt.toLocaleString(undefined, { month: 'short' });
    return `${dt.getDate()}, ${month} ${dt.getFullYear()}`;
}
export function dateRange(a, b) {
    if (!a && !b)
        return '';
    const start = a ? new Date(a) : null;
    const end = b ? new Date(b) : null;
    if (start && !end)
        return formatDate(a);
    if (!start && end)
        return formatDate(b);
    if (start && end) {
        const sameDay = start.toDateString() === end.toDateString();
        if (sameDay)
            return `${formatDate(a)}`;
        return `${formatDate(a)} - ${formatDate(b)}`;
    }
    return '';
}
