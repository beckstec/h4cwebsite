# Hungry 4 Change — Vite + React (Exact Theme Port)

This app serves your original HTML pages **as-is** inside a React Router SPA, preserving the exact structure and styling from your zip.

## Run
```bash
npm i
npm run dev
```

## Notes
- All original assets are under `public/assets/`.
- All original HTML files are in `public/static/` and loaded per route.
- Routes generated:
  - /.-about -> /static/._about.html
  - /.-blog-classic -> /static/._blog-classic.html
  - /.-blog-single -> /static/._blog-single.html
  - /.-blog -> /static/._blog.html
  - /.-cause-list -> /static/._cause-list.html
  - /.-cause-single -> /static/._cause-single.html
  - /.-cause -> /static/._cause.html
  - /.-contact -> /static/._contact.html
  - /.-error -> /static/._error.html
  - /.-event-list -> /static/._event-list.html
  - /.-event-single -> /static/._event-single.html
  - /.-event -> /static/._event.html
  - /.-faq -> /static/._faq.html
  - /.-index -> /static/._index.html
  - /.-project-single -> /static/._project-single.html
  - /.-project -> /static/._project.html
  - /.-team-single -> /static/._team-single.html
  - /.-team -> /static/._team.html
  - /about -> /static/about.html
  - /blog-classic -> /static/blog-classic.html
  - /blog-single -> /static/blog-single.html
  - /blog -> /static/blog.html
  - /cause-list -> /static/cause-list.html
  - /cause-single -> /static/cause-single.html
  - /cause -> /static/cause.html
  - /contact -> /static/contact.html
  - /error -> /static/error.html
  - /event-list -> /static/event-list.html
  - /event-single -> /static/event-single.html
  - /event -> /static/event.html
  - /faq -> /static/faq.html
  - / -> /static/index.html
  - /project-single -> /static/project-single.html
  - /project -> /static/project.html
  - /team-single -> /static/team-single.html
  - /team -> /static/team.html
