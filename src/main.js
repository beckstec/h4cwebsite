import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DataModeToggle from '@/components/DataModeToggle';
// IMPORTANT: global CSS/JS from your theme are in index.html (unchanged)
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsxs(BrowserRouter, { children: [_jsx(App, {}), _jsx(DataModeToggle, {})] }) }));
