import { useCallback, useEffect, useMemo, useState } from 'react';
import { albumReviews as staticAlbumReviews, movieReviews as staticMovieReviews } from '../data/media.js';
import {
  deleteMediaReviewFromSupabase,
  fetchMediaReviewsFromSupabase,
  upsertMediaReviewToSupabase,
} from '../lib/contentApi.js';
import { isSupabaseConfigured } from '../lib/supabaseClient.js';

function sortNewestFirst(reviews) {
  return [...reviews].sort((a, b) => String(b.reviewDate || b.dateAccessed || '').localeCompare(String(a.reviewDate || a.dateAccessed || '')));
}

export function useMediaReviews() {
  const [reviews, setReviews] = useState([...staticMovieReviews, ...staticAlbumReviews]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState('');
  const [source, setSource] = useState(isSupabaseConfigured ? 'loading' : 'static');

  const loadReviews = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setReviews(sortNewestFirst([...staticMovieReviews, ...staticAlbumReviews]));
      setSource('static');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const remoteReviews = await fetchMediaReviewsFromSupabase();
      setReviews(sortNewestFirst(remoteReviews));
      setSource('supabase');
    } catch (nextError) {
      setReviews(sortNewestFirst([...staticMovieReviews, ...staticAlbumReviews]));
      setSource('static-error');
      setError(nextError.message || 'Unable to load media reviews from Supabase.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const movieReviews = useMemo(() => reviews.filter((review) => review.type === 'movie'), [reviews]);
  const albumReviews = useMemo(() => reviews.filter((review) => review.type === 'album'), [reviews]);
  const latestMovieReview = movieReviews[0] ?? null;
  const latestAlbumReview = albumReviews[0] ?? null;

  async function saveMediaReview(review) {
    const saved = await upsertMediaReviewToSupabase(review);
    await loadReviews();
    return saved;
  }

  async function removeMediaReview(reviewId) {
    await deleteMediaReviewFromSupabase(reviewId);
    await loadReviews();
  }

  return {
    reviews,
    movieReviews,
    albumReviews,
    latestMovieReview,
    latestAlbumReview,
    loading,
    error,
    source,
    isUsingFallback: source !== 'supabase',
    reloadReviews: loadReviews,
    saveMediaReview,
    removeMediaReview,
  };
}
