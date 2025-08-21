import { jsx as _jsx } from "react/jsx-runtime";
// src/components/DataModeToggle.tsx
import React from 'react';
import { getDataMode, setDataMode } from '@/lib/mode';
export default function DataModeToggle() {
    const [mode, setMode] = React.useState(getDataMode());
    function flip() {
        const next = mode === 'static' ? 'api' : 'static';
        setDataMode(next);
        setMode(next);
    }
    return (_jsx("button", { onClick: flip, title: "Toggle Data Mode (Static/API)", style: {
            position: 'fixed', right: 12, bottom: 12, zIndex: 9999,
            borderRadius: 999, padding: '10px 14px', fontWeight: 700,
            border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,.15)', cursor: 'pointer',
            background: mode === 'api' ? '#22c55e' : '#64748b', color: 'white'
        }, children: mode.toUpperCase() }));
}
