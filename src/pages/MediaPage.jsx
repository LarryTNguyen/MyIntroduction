import { useState } from 'react';
import { AdminToolbar } from '../components/AdminToolbar.jsx';
import { EditorModal } from '../components/EditorModal.jsx';
import { MediaPlaceholder, MediaStickyNote } from '../components/MediaStickyNote.jsx';
import { MediaReviewForm } from '../components/MediaReviewForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { mediaPlaceholders } from '../data/media.js';
import { useMediaReviews } from '../hooks/useMediaReviews.js';

function ReviewColumn({ title, emptyItem, reviews, isAdmin, onEdit, onDelete }) {
  return (
    <section className="review-column" aria-labelledby={`${emptyItem.type}-reviews`}>
      <div className="column-pin" aria-hidden="true" />
      <h2 id={`${emptyItem.type}-reviews`} className="section-label">
        {title}
      </h2>
      <div className="review-scroll-area" tabIndex="0">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <MediaStickyNote key={review.id} item={review} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />
          ))
        ) : (
          <MediaPlaceholder item={emptyItem} />
        )}
      </div>
    </section>
  );
}

export function MediaPage() {
  const { isAdmin, isSupabaseConfigured } = useAuth();
  const { movieReviews, albumReviews, loading, error, source, saveMediaReview, removeMediaReview } = useMediaReviews();
  const [editingReview, setEditingReview] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [actionError, setActionError] = useState('');

  function openNewReviewEditor() {
    setEditingReview(null);
    setShowEditor(true);
    setActionError('');
  }

  function openEditReviewEditor(review) {
    setEditingReview(review);
    setShowEditor(true);
    setActionError('');
  }

  async function handleSaveReview(review) {
    await saveMediaReview(review);
    setShowEditor(false);
    setEditingReview(null);
  }

  async function handleDeleteReview(review) {
    const confirmed = window.confirm(`Permanently delete ${review.title}?`);
    if (!confirmed) return;

    try {
      await removeMediaReview(review.id);
    } catch (nextError) {
      setActionError(nextError.message || 'Unable to delete this review.');
    }
  }

  return (
    <section className="section-pad page-section" aria-labelledby="media-heading">
      <p className="tag-line">movie and music notes</p>
      <h1 id="media-heading" className="page-title">
        Media Reviews
      </h1>
      <p className="page-intro">
        A small space for movie and album reviews. The columns are ready for entries, and each side can scroll on its own once the lists grow.
      </p>

      {isAdmin ? (
        <AdminToolbar
          onAdd={openNewReviewEditor}
          addLabel="add review +"
          status={isSupabaseConfigured ? `data source: ${source}` : 'add Supabase env vars to save edits'}
        />
      ) : null}

      {loading ? <p className="inline-warning">Loading media reviews...</p> : null}
      {error ? <p className="inline-warning">Media reviews could not load from Supabase yet: {error}</p> : null}
      {actionError ? <p className="form-error">{actionError}</p> : null}

      <div className="media-columns">
        <ReviewColumn
          title="movies"
          emptyItem={mediaPlaceholders.movie}
          reviews={movieReviews}
          isAdmin={isAdmin}
          onEdit={openEditReviewEditor}
          onDelete={handleDeleteReview}
        />
        <ReviewColumn
          title="albums"
          emptyItem={mediaPlaceholders.album}
          reviews={albumReviews}
          isAdmin={isAdmin}
          onEdit={openEditReviewEditor}
          onDelete={handleDeleteReview}
        />
      </div>

      {showEditor ? (
        <EditorModal title={editingReview?.id ? 'edit review' : 'add review'} onClose={() => setShowEditor(false)}>
          <MediaReviewForm
            initialReview={editingReview}
            onSubmit={handleSaveReview}
            onCancel={() => setShowEditor(false)}
            submitLabel={editingReview?.id ? 'save changes' : 'create review'}
          />
        </EditorModal>
      ) : null}
    </section>
  );
}
