// src/lib/mode.ts
export type DataMode = 'static' | 'api';
const KEY = 'h4cDataMode';

export function getDataMode(): DataMode {
  const url = new URL(window.location.href);
  const q = url.searchParams.get('data');
  if (q === 'api' || q === 'static') {
    localStorage.setItem(KEY, q);
    return q;
  }
  const stored = localStorage.getItem(KEY);
  if (stored === 'api' || stored === 'static') return stored;
  return 'static';
}

export function setDataMode(mode: DataMode) {
  localStorage.setItem(KEY, mode);
  window.dispatchEvent(new CustomEvent('h4c:dataModeChanged', { detail: mode }));
}

export function onModeChange(cb: (m: DataMode) => void) {
  const handler = (e: Event) => cb((e as CustomEvent).detail as DataMode);
  window.addEventListener('h4c:dataModeChanged', handler);
  return () => window.removeEventListener('h4c:dataModeChanged', handler);
}
