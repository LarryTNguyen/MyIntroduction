import { supabase } from './supabaseClient.js';

const projectSelect = '*';
const mediaSelect = '*';

function ensureSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add your Vite Supabase environment variables first.');
  }
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatNumber(order, fallbackIndex = 0) {
  const number = Number(order || fallbackIndex + 1);
  return String(number).padStart(2, '0');
}

export function toUiProject(row, index = 0) {
  return {
    id: row.id,
    slug: row.slug,
    number: formatNumber(row.display_order, index),
    displayOrder: row.display_order ?? index + 1,
    title: row.title ?? '',
    subtitle: row.subtitle ?? '',
    summary: row.summary ?? '',
    description: row.description ?? '',
    features: normalizeArray(row.features),
    tech: normalizeArray(row.tech),
    tags: normalizeArray(row.tags),
    contributions: normalizeArray(row.contributions),
    githubUrl: row.github_url ?? '',
    demoUrl: row.demo_url ?? '',
    screenshotUrl: row.screenshot_url ?? '',
    featured: Boolean(row.featured),
    color: row.color ?? 'yellow',
    rotation: row.rotation ?? '0deg',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toProjectRecord(project) {
  return {
    slug: project.slug || slugify(project.title),
    display_order: Number(project.displayOrder || 0),
    title: project.title?.trim() || '',
    subtitle: project.subtitle?.trim() || '',
    summary: project.summary?.trim() || '',
    description: project.description?.trim() || '',
    features: normalizeArray(project.features),
    tech: normalizeArray(project.tech),
    tags: normalizeArray(project.tags),
    contributions: normalizeArray(project.contributions),
    github_url: project.githubUrl?.trim() || '',
    demo_url: project.demoUrl?.trim() || '',
    screenshot_url: project.screenshotUrl?.trim() || '',
    featured: Boolean(project.featured),
    color: project.color || 'yellow',
    rotation: project.rotation || '0deg',
  };
}

export function toUiMediaReview(row) {
  const mediaType = row.media_type ?? row.type ?? 'movie';

  return {
    id: row.id,
    type: mediaType,
    typeLabel: mediaType === 'album' ? 'latest album review' : 'latest movie review',
    title: row.title ?? '',
    creator: row.creator ?? '',
    reviewDate: row.review_date ?? '',
    dateAccessed: row.review_date ?? '',
    rating: Number(row.rating ?? 0),
    maxRating: 5,
    review: row.review ?? '',
    imageUrl: row.image_url ?? '',
    color: row.color ?? (mediaType === 'album' ? 'teal' : 'purple'),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toMediaReviewRecord(review) {
  return {
    media_type: review.type || review.mediaType || 'movie',
    title: review.title?.trim() || '',
    creator: review.creator?.trim() || '',
    review_date: review.reviewDate || review.dateAccessed || new Date().toISOString().slice(0, 10),
    rating: Number(review.rating || 0),
    review: review.review?.trim() || '',
    image_url: review.imageUrl?.trim() || '',
    color: review.color || ((review.type || review.mediaType) === 'album' ? 'teal' : 'purple'),
  };
}

export async function fetchProjectsFromSupabase() {
  ensureSupabase();
  const { data, error } = await supabase
    .from('projects')
    .select(projectSelect)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []).map(toUiProject);
}

export async function upsertProjectToSupabase(project) {
  ensureSupabase();
  const record = toProjectRecord(project);
  const query = project.id
    ? supabase.from('projects').update(record).eq('id', project.id).select(projectSelect).single()
    : supabase.from('projects').insert(record).select(projectSelect).single();

  const { data, error } = await query;
  if (error) throw error;
  return toUiProject(data);
}

export async function deleteProjectFromSupabase(projectId) {
  ensureSupabase();
  const { error } = await supabase.from('projects').delete().eq('id', projectId);
  if (error) throw error;
}

export async function fetchMediaReviewsFromSupabase() {
  ensureSupabase();
  const { data, error } = await supabase
    .from('media_reviews')
    .select(mediaSelect)
    .order('review_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toUiMediaReview);
}

export async function upsertMediaReviewToSupabase(review) {
  ensureSupabase();
  const record = toMediaReviewRecord(review);
  const query = review.id
    ? supabase.from('media_reviews').update(record).eq('id', review.id).select(mediaSelect).single()
    : supabase.from('media_reviews').insert(record).select(mediaSelect).single();

  const { data, error } = await query;
  if (error) throw error;
  return toUiMediaReview(data);
}

export async function deleteMediaReviewFromSupabase(reviewId) {
  ensureSupabase();
  const { error } = await supabase.from('media_reviews').delete().eq('id', reviewId);
  if (error) throw error;
}

export async function uploadPublicFile({ bucket, folder, file }) {
  ensureSupabase();
  if (!file) return '';

  const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : 'jpg';
  const safeFolder = folder ? folder.replace(/^\/+|\/+$/g, '') : 'uploads';
  const path = `${safeFolder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export function slugify(value) {
  return String(value || 'entry')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}
