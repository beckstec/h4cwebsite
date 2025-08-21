import { jsx as _jsx } from "react/jsx-runtime";
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// type Props = { file: string };
// function executeScripts(container: HTMLElement) {
//   const scripts = Array.from(container.querySelectorAll('script'));
//   for (const old of scripts) {
//     const script = document.createElement('script');
//     // copy attributes
//     Array.from(old.attributes).forEach(a => script.setAttribute(a.name, a.value));
//     // inline code
//     if (old.textContent) script.textContent = old.textContent;
//     old.parentNode?.replaceChild(script, old);
//   }
// }
// function rewriteLinks(container: HTMLElement, navigate: (p: string)=>void) {
//   const anchors = Array.from(container.querySelectorAll('a[href]')) as HTMLAnchorElement[];
//   anchors.forEach(a => {
//     const href = a.getAttribute('href') || '';
//     if (!href) return;
//     // handle links to *.html -> route path
//     const m = href.match(/^([^#?]+)\.html(?:[?#].*)?$/i);
//     if (m) {
//       const stem = m[1];
//       const path = stem.toLowerCase() === 'index' ? '/' : '/' + stem.toLowerCase().replace(/[\s_]+/g, '-');
//       a.addEventListener('click', (e) => {
//         e.preventDefault();
//         navigate(path);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }, { once: true });
//     }
//   });
// }
// export default function StaticPage({ file }: Props) {
//   const [html, setHtml] = useState<string>('');
//   const nav = useNavigate();
//   const loc = useLocation();
//   useEffect(() => {
//     let active = true;
//     fetch(`/static/${file}`, { cache: 'no-cache' })
//       .then(r => r.text())
//       .then(txt => {
//         if (!active) return;
//         setHtml(txt);
//       })
//       .catch(() => setHtml('<div style="padding:2rem;color:red">Failed to load page.</div>'));
//     return () => { active = false; };
//   }, [file, loc.pathname]);
//   useEffect(() => {
//     // after injected, run scripts and rewire anchors
//     const container = document.getElementById('static-root');
//     if (container) {
//       executeScripts(container);
//       rewriteLinks(container, nav);
//     }
//   }, [html]);
//   return <div id="static-root" dangerouslySetInnerHTML={{ __html: html }} />;
// }
// src/StaticPage.tsx
import { useEffect, useRef } from 'react';
import { hydrateAll, runInlineScripts } from '@/lib/hydrate';
import { getDataMode, onModeChange } from '@/lib/mode';
export default function StaticPage({ file }) {
    const ref = useRef(null);
    async function loadAndMaybeHydrate() {
        const el = ref.current;
        // fetch the raw HTML from public/static/<file>
        const res = await fetch(`/static/${file}`, { cache: 'no-store' });
        const html = await res.text();
        el.innerHTML = html;
        // execute inline scripts embedded in that HTML (for animations/plugins)
        runInlineScripts(el);
        // if in API mode, hydrate sections (replace inner HTML of specific blocks)
        if (getDataMode() === 'api') {
            await hydrateAll(el);
        }
    }
    useEffect(() => {
        loadAndMaybeHydrate();
        const unsub = onModeChange(() => loadAndMaybeHydrate());
        return () => unsub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);
    return _jsx("div", { ref: ref });
}
