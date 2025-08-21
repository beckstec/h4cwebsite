import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import StaticPage from './StaticPage'

export default function App() {
  return (
    <Routes>
      <Route path="/about" element={<StaticPage file="about.html" />} />
      <Route path="/blog-classic" element={<StaticPage file="blog-classic.html" />} />
      <Route path="/blog-single" element={<StaticPage file="blog-single.html" />} />
      <Route path="/blog" element={<StaticPage file="blog.html" />} />
      <Route path="/cause-list" element={<StaticPage file="cause-list.html" />} />
      <Route path="/cause-single" element={<StaticPage file="cause-single.html" />} />
      <Route path="/cause" element={<StaticPage file="cause.html" />} />
      <Route path="/contact" element={<StaticPage file="contact.html" />} />
      <Route path="/error" element={<StaticPage file="error.html" />} />
      <Route path="/event-list" element={<StaticPage file="event-list.html" />} />
      <Route path="/event-single" element={<StaticPage file="event-single.html" />} />
      <Route path="/event" element={<StaticPage file="event.html" />} />
      <Route path="/faq" element={<StaticPage file="faq.html" />} />
      <Route path="/" element={<StaticPage file="index.html" />} />
      <Route path="/project-single" element={<StaticPage file="project-single.html" />} />
      <Route path="/project" element={<StaticPage file="project.html" />} />
      <Route path="/team-single" element={<StaticPage file="team-single.html" />} />
      <Route path="/team" element={<StaticPage file="team.html" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
