# Supabase setup for MyIntroduction

Run `schema.sql` in the Supabase SQL Editor after creating the project. It creates:

- `projects`
- `media_reviews`
- public Storage buckets: `media-assets` and `project-screenshots`
- RLS policies with public reads and admin-only writes for `larrynguyen4567@gmail.com`
- initial project seed data copied from the current local project list

## Auth setup

In Supabase Auth, enable Google as a provider. Add these redirect URLs while developing and deploying:

- `http://localhost:5173/admin`
- your GitHub Pages URL ending in `/MyIntroduction/admin`
- your future custom domain URL ending in `/admin`

## Environment variables

Create `.env.local` from `.env.example` and fill in your Supabase project URL and anon key.
