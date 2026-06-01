# MyIntroduction

Personal portfolio website for Larry Nguyen, built with React, Vite, and React Router.

## What is included

- Front page with Larry's bio, profile photo, resume link, social links, featured projects, and blank media placeholders.
- Projects page with wide sticky-note cards for all current GitHub projects.
- Media page with independent movie and album columns, ready for future review entries.
- Contact page with a mailto call to action.
- Hidden `/admin` route with a placeholder for the next Supabase pass.
- GitHub Pages configuration for the `MyIntroduction` project path and a SPA 404 redirect for clean URLs.

## Local development

```bash
npm install
npm run dev
```

Then open the URL Vite prints in the terminal.

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

This project is configured for a repository named `MyIntroduction` through `vite.config.js`:

```js
base: '/MyIntroduction/'
```

The included GitHub Actions workflow builds the Vite app and deploys the `dist` folder to GitHub Pages whenever changes are pushed to `main`.

In GitHub, enable Pages with GitHub Actions as the deployment source.

## Admin roadmap for next pass

The current `/admin` route is only a placeholder. Next pass can add:

- Supabase project setup.
- Google login through Supabase Auth.
- Email whitelist for `larrynguyen4567@gmail.com`.
- Tables for profile content, projects, media reviews, and uploaded media paths.
- Supabase Storage bucket for posters, album covers, and project images.
- Row-level security so visitors can read public data while only Larry can write.
