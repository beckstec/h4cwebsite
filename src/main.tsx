// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import DataModeToggle from '@/components/DataModeToggle'

// IMPORTANT: global CSS/JS from your theme are in index.html (unchanged)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <DataModeToggle />
    </BrowserRouter>
  </React.StrictMode>,
)
