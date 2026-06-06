-- Larry Nguyen portfolio Supabase schema
-- Run this whole file in the Supabase SQL Editor after creating your project.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_order integer not null default 0,
  title text not null,
  subtitle text default '',
  summary text not null,
  description text not null,
  features text[] not null default '{}',
  tech text[] not null default '{}',
  tags text[] not null default '{}',
  contributions text[] not null default '{}',
  github_url text not null,
  demo_url text default '',
  screenshot_url text default '',
  featured boolean not null default false,
  color text not null default 'yellow' check (color in ('yellow', 'green', 'blue', 'pink', 'purple', 'teal')),
  rotation text not null default '0deg',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_reviews (
  id uuid primary key default gen_random_uuid(),
  media_type text not null check (media_type in ('movie', 'album')),
  title text not null,
  creator text not null,
  review_date date not null,
  rating numeric(2,1) not null check (rating >= 0 and rating <= 5),
  review text not null,
  image_url text default '',
  color text not null default 'purple' check (color in ('yellow', 'green', 'blue', 'pink', 'purple', 'teal')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_media_reviews_updated_at on public.media_reviews;
create trigger set_media_reviews_updated_at
before update on public.media_reviews
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.media_reviews enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
on public.projects for select
to anon, authenticated
using (true);

drop policy if exists "Only Larry can insert projects" on public.projects;
create policy "Only Larry can insert projects"
on public.projects for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Only Larry can update projects" on public.projects;
create policy "Only Larry can update projects"
on public.projects for update
to authenticated
using ((auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com')
with check ((auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Only Larry can delete projects" on public.projects;
create policy "Only Larry can delete projects"
on public.projects for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Public can read media reviews" on public.media_reviews;
create policy "Public can read media reviews"
on public.media_reviews for select
to anon, authenticated
using (true);

drop policy if exists "Only Larry can insert media reviews" on public.media_reviews;
create policy "Only Larry can insert media reviews"
on public.media_reviews for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Only Larry can update media reviews" on public.media_reviews;
create policy "Only Larry can update media reviews"
on public.media_reviews for update
to authenticated
using ((auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com')
with check ((auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Only Larry can delete media reviews" on public.media_reviews;
create policy "Only Larry can delete media reviews"
on public.media_reviews for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

-- Public buckets for uploaded covers and optional project screenshots.
insert into storage.buckets (id, name, public)
values
  ('media-assets', 'media-assets', true),
  ('project-screenshots', 'project-screenshots', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read media assets" on storage.objects;
create policy "Public read media assets"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'media-assets');

drop policy if exists "Larry uploads media assets" on storage.objects;
create policy "Larry uploads media assets"
on storage.objects for insert
to authenticated
with check (bucket_id = 'media-assets' and (auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Larry updates media assets" on storage.objects;
create policy "Larry updates media assets"
on storage.objects for update
to authenticated
using (bucket_id = 'media-assets' and (auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com')
with check (bucket_id = 'media-assets' and (auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Larry deletes media assets" on storage.objects;
create policy "Larry deletes media assets"
on storage.objects for delete
to authenticated
using (bucket_id = 'media-assets' and (auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Public read project screenshots" on storage.objects;
create policy "Public read project screenshots"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'project-screenshots');

drop policy if exists "Larry uploads project screenshots" on storage.objects;
create policy "Larry uploads project screenshots"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-screenshots' and (auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Larry updates project screenshots" on storage.objects;
create policy "Larry updates project screenshots"
on storage.objects for update
to authenticated
using (bucket_id = 'project-screenshots' and (auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com')
with check (bucket_id = 'project-screenshots' and (auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

drop policy if exists "Larry deletes project screenshots" on storage.objects;
create policy "Larry deletes project screenshots"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-screenshots' and (auth.jwt() ->> 'email') = 'larrynguyen4567@gmail.com');

-- Initial project seed. Safe to re-run; existing rows update by slug.
insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'intelliroute',
  1,
  'IntelliRoute',
  'Distributed LLM routing control plane',
  'A distributed control plane that routes LLM requests across providers based on intent, latency, cost, health, and budget limits.',
  'IntelliRoute sits between client apps and LLM providers. It classifies requests, picks a provider with a multi-objective policy, enforces distributed rate limits, handles provider failures, tracks costs, and exposes system state through a live dashboard.',
  array['Intent-aware routing for interactive, reasoning, batch, and code requests', 'Leader-elected token bucket rate limiting across three replicas', 'Circuit breakers, fallback logic, brownout handling, and cost tracking']::text[],
  array['Python', 'FastAPI', 'HTTPX', 'Pydantic', 'pytest', 'HTML', 'JavaScript']::text[],
  array['Distributed Systems', 'Backend', 'API']::text[],
  array['Router service', 'routing policy', 'intent classifier', 'provider registry', 'online weight tuning']::text[],
  'https://github.com/LarryTNguyen/IntelliRoute-team',
  'https://intelli-route-team.vercel.app/',
  '',
  true,
  'yellow',
  '-1.1deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'citibike',
  2,
  'CitiBike Availability Predictor',
  'Station availability modeling for bike sharing',
  'A data science project that models CitiBike station availability using trip, weather, station, and capacity data.',
  'This project explores CitiBike availability as a forecasting and state-modeling problem. The notebooks clean and combine trip data, weather data, and station metadata, then test modeling approaches for predicting whether stations will have enough bikes or docks available.',
  array['Cleaned and combined large bike-share and weather datasets', 'Explored station-level availability, capacity, and journey patterns', 'Built follow-on experiments for improved availability prediction']::text[],
  array['Python', 'Jupyter Notebook', 'Pandas', 'Parquet', 'scikit-learn', 'XGBoost']::text[],
  array['Machine Learning', 'Data Science']::text[],
  array['data cleaning', 'EDA', 'feature engineering', 'modeling experiments']::text[],
  'https://github.com/LarryTNguyen/CMPE255Project',
  '',
  '',
  true,
  'green',
  '0.8deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'firebank',
  3,
  'Fire Incident Distributed Query System',
  'Fault-tolerant geospatial search',
  'A Python and C++ distributed query service that searches fire incident records with leader, team leader, and worker processes.',
  'This project uses a six-process distributed layout to process fire incident data. A leader accepts a query, team leaders split work, and workers load data through a compiled C++ module. The Mini-3 version adds a heartbeat system so the client can still receive results after worker or team leader failures.',
  array['Leader, team leader, and worker hierarchy for distributed search', 'gRPC-based process communication and C++ data loading module', 'Heartbeat-driven failure detection and failover test cases']::text[],
  array['Python', 'C++', 'gRPC', 'CMake', 'Pybind', 'CSV']::text[],
  array['Distributed Systems', 'Backend', 'API']::text[],
  array['leader-worker architecture', 'heartbeat system', 'gRPC services', 'failure testing']::text[],
  'https://github.com/LarryTNguyen/FireBankDistSystemsProject',
  '',
  '',
  true,
  'blue',
  '-0.6deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'cifar-transfer',
  4,
  'CIFAR-10 Transfer Learning Classifier',
  'Computer vision model training',
  'A transfer learning project that fine-tunes image classification models for CIFAR-10.',
  'This project compares computer vision training approaches on CIFAR-10. It includes transfer learning with a pretrained convolutional model and additional notebook experiments for custom CNN modeling and final evaluation.',
  array['Prepared CIFAR-10 training notebooks for transfer learning experiments', 'Compared pretrained and custom convolutional model workflows', 'Tracked model performance through final training notebooks']::text[],
  array['Python', 'TensorFlow', 'Keras', 'Xception', 'CNN', 'Jupyter Notebook']::text[],
  array['Machine Learning', 'Computer Vision']::text[],
  array['model training', 'transfer learning', 'evaluation', 'notebook experiments']::text[],
  'https://github.com/LarryTNguyen/CMPE252_TransferLearning',
  '',
  '',
  true,
  'pink',
  '1.3deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'campus-marketplace',
  5,
  'Campus Marketplace',
  'MERN marketplace for students',
  'A full-stack marketplace where students can post listings, search items, message sellers, and manage reports.',
  'Campus Marketplace is a MERN app designed for college students buying and selling school supplies. Users can create and manage listings, search by filters, negotiate through listing-specific messages, and report invalid listings for admin review. It also includes an AI search feature powered by the Gemini API.',
  array['Listing creation, editing, sold status, deletion, and report handling', 'JWT authentication with protected buyer, seller, and admin flows', 'Natural-language search support with Gemini API prompt engineering']::text[],
  array['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Gemini API', 'AWS EC2']::text[],
  array['Full Stack', 'Backend', 'Web Development', 'Cloud', 'API', 'NLP']::text[],
  array['backend APIs', 'Gemini search', 'messaging flow', 'Postman testing', 'server-side access control']::text[],
  'https://github.com/LarryTNguyen/CampusMarketplace',
  '',
  '',
  false,
  'teal',
  '-0.4deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'translation-nlp',
  6,
  'English-Spanish Translation Fine-Tuning',
  'MarianMT NLP training notebook',
  'An NLP project that fine-tunes Helsinki-NLP/opus-mt-en-es on English-Spanish Europarl sentence pairs.',
  'This notebook continues training a MarianMT translation model from a saved checkpoint. The training pipeline uses cleaned English-Spanish sentence pairs, Hugging Face Transformers, Seq2SeqTrainer, sacreBLEU evaluation, and checkpoint-based training in Google Colab.',
  array['Fine-tuned Helsinki-NLP/opus-mt-en-es for English to Spanish translation', 'Used 500,000 Europarl sentence pairs with validation and test splits', 'Evaluated translation quality with BLEU scores during training']::text[],
  array['Python', 'Transformers', 'Hugging Face Datasets', 'PyTorch', 'sacreBLEU', 'Google Colab']::text[],
  array['Machine Learning', 'NLP', 'Data Science']::text[],
  array['data preprocessing', 'model fine-tuning', 'BLEU evaluation', 'checkpoint training']::text[],
  'https://github.com/LarryTNguyen/CMPE252NLPProject',
  '',
  '',
  false,
  'purple',
  '0.7deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'pricestocker',
  7,
  'PriceStocker',
  'Stock portfolio web app',
  'A React and Supabase stock portfolio app with authentication, dashboard pages, transactions, and charting.',
  'PriceStocker is a Vite React application for tracking stock activity. The codebase includes authentication pages, dashboard and profile pages, stock and portfolio screens, transaction views, Supabase integration, and charting libraries for market-style visual displays.',
  array['Authentication, protected routes, profile, and dashboard screens', 'Portfolio, stock detail, transaction, and bid input pages', 'Supabase-backed data layer with React Query and chart components']::text[],
  array['React', 'Vite', 'Supabase', 'TanStack Query', 'Recharts', 'Tailwind CSS']::text[],
  array['Full Stack', 'Web Development', 'Cloud', 'API']::text[],
  array['React pages', 'data flow', 'Supabase integration', 'chart UI']::text[],
  'https://github.com/LarryTNguyen/CMPE272Project',
  '',
  '',
  false,
  'yellow',
  '-0.8deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'trialize',
  8,
  'Trialize',
  'Clinical trial matching mobile app',
  'A hackathon app that helps patients match with clinical trials through existing healthcare application flows.',
  'Trialize was built for the 2024 Big Data Hackathon by Team 118, Sixth Sense. The idea is to make it simple and secure for potential participants to find clinical trials through healthcare apps, with a focus on new patient experience and culturally competent care.',
  array['Patient-to-trial matching concept for healthcare applications', 'Mobile frontend and API-backed architecture', 'Hackathon proposal focused on access, trust, and patient experience']::text[],
  array['React Native', 'TypeScript', 'Python', 'MongoDB', 'AWS DocumentDB']::text[],
  array['Full Stack', 'Cloud', 'API']::text[],
  array['system architecture', 'React Native screens', 'database planning', 'healthcare API simulation']::text[],
  'https://github.com/LarryTNguyen/Team-118',
  '',
  '',
  false,
  'green',
  '0.5deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'yelpcamp',
  9,
  'YelpCamp',
  'Campground review web app',
  'A full-stack app where users can create, review, edit, delete, and map campgrounds.',
  'YelpCamp is a Node, Express, MongoDB, and EJS application for sharing campsites. Users can register, log in, upload campgrounds, leave reviews, and view campground locations on a Mapbox-powered interactive map.',
  array['User authentication and authorization with Passport.js', 'CRUD routes for campgrounds and nested reviews', 'Mapbox geocoding and campground map display']::text[],
  array['Node.js', 'Express', 'MongoDB', 'EJS', 'Mapbox API', 'Passport.js']::text[],
  array['Full Stack', 'Backend', 'Web Development', 'API']::text[],
  array['CRUD routes', 'auth flow', 'map integration', 'deployment']::text[],
  'https://github.com/LarryTNguyen/YelpCamp',
  'https://yelpcamp-d39s.onrender.com/',
  '',
  false,
  'blue',
  '-0.3deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'spotify-lyrics',
  10,
  'Spotify Lyrics Genre Predictor',
  'Genre classification from lyrics',
  'A machine learning notebook that predicts song genres using text analysis on lyrics.',
  'This project studies whether lyrics can be used to predict a song''s genre. The notebook frames genre classification as a text-analysis problem, then prepares song lyric features for model training and comparison.',
  array['Prepared lyrics for genre classification experiments', 'Explored text-based features for music genre prediction', 'Compared unsupervised and supervised ML-style workflows in notebooks']::text[],
  array['Python', 'Jupyter Notebook', 'scikit-learn', 'NLP', 'Pandas']::text[],
  array['Machine Learning', 'NLP', 'Data Science']::text[],
  array['text preprocessing', 'feature engineering', 'model experiments', 'analysis']::text[],
  'https://github.com/LarryTNguyen/Song_Project',
  '',
  '',
  false,
  'pink',
  '0.8deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

insert into public.projects (slug, display_order, title, subtitle, summary, description, features, tech, tags, contributions, github_url, demo_url, screenshot_url, featured, color, rotation)
values (
  'through-the-haze',
  11,
  'Through the Haze',
  'Air quality and respiratory illness analysis',
  'A data science project studying environmental influences on respiratory illness.',
  'Through the Haze investigates how air quality and environmental variables relate to respiratory illness. The notebook uses public data sources, explores AQI and PM2.5 context, and builds an analysis around whether poorer air quality is associated with respiratory health outcomes.',
  array['Combined public environmental and health-related datasets', 'Explored AQI, PM2.5, and respiratory illness context', 'Documented ethical considerations around public data coverage and equity']::text[],
  array['Python', 'Jupyter Notebook', 'Pandas', 'Data Visualization', 'Statistics']::text[],
  array['Data Science']::text[],
  array['data analysis', 'visualization', 'research framing', 'ethics review']::text[],
  'https://github.com/LarryTNguyen/DataScienceProject',
  '',
  '',
  false,
  'teal',
  '-0.5deg'
)
on conflict (slug) do update set
  display_order = excluded.display_order,
  title = excluded.title,
  subtitle = excluded.subtitle,
  summary = excluded.summary,
  description = excluded.description,
  features = excluded.features,
  tech = excluded.tech,
  tags = excluded.tags,
  contributions = excluded.contributions,
  github_url = excluded.github_url,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  color = excluded.color,
  rotation = excluded.rotation;

