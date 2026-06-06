# MyIntroduction

Personal portfolio website for Larry Nguyen, built with React, Vite, React Router, and Supabase.

## What is included

- Front page with Larry's bio, profile photo, resume link, social links, featured projects, and latest movie/album review slots.
- Projects page with wide sticky-note cards for all current GitHub projects.
- Media page with independent movie and album columns that sort newest-first by review date.
- Contact page with a mailto call to action.
- Hidden `/admin` route with Google login, admin-only CRUD, and manual image uploads through Supabase Storage.
- Inline add/edit/delete controls on public pages while signed in as the admin.
- Supabase schema in `supabase/schema.sql` with tables, RLS policies, Storage buckets, and initial project seed data.
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

## Supabase setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run `supabase/schema.sql`.
3. Enable Google login in Supabase Auth.
4. Add redirect URLs for local development, GitHub Pages, and your future custom domain:
   - `http://localhost:5173/admin`
   - `https://LarryTNguyen.github.io/MyIntroduction/admin`
   - `https://your-custom-domain.com/admin`
5. Copy `.env.example` to `.env.local` and fill in your project values:

```bash
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

The site still builds without these environment variables. Public pages fall back to local data until Supabase is configured.

## Admin behavior

- Only `larrynguyen4567@gmail.com` can write data.
- Everyone can read published projects and reviews.
- Project ordering is manual through the `manual order` field.
- Media reviews sort newest-first by `review date`.
- The home page automatically shows the newest movie review and newest album review by review date.
- Deletes are permanent.
- Media cover images upload to the public `media-assets` bucket.
- Optional project screenshots upload to the public `project-screenshots` bucket.

## GitHub Pages deployment

This project is configured for a repository named `MyIntroduction` through `vite.config.js`:

```js
base: '/MyIntroduction/'
```

The included GitHub Actions workflow builds the Vite app and deploys the `dist` folder to GitHub Pages whenever changes are pushed to `main`.

In GitHub, enable Pages with GitHub Actions as the deployment source.

When moving to a custom domain at the root path, update `vite.config.js` to use `base: '/'`, then update the Supabase redirect URLs to match the custom domain.
