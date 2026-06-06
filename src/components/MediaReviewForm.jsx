import { useMemo, useState } from 'react';
import { uploadPublicFile } from '../lib/contentApi.js';

const emptyReview = {
  type: 'movie',
  title: '',
  creator: '',
  reviewDate: new Date().toISOString().slice(0, 10),
  rating: 4,
  review: '',
  imageUrl: '',
  color: 'purple',
};

export function MediaReviewForm({ initialReview, onSubmit, onCancel, submitLabel = 'save review' }) {
  const seed = useMemo(() => ({ ...emptyReview, ...(initialReview ?? {}) }), [initialReview]);
  const [form, setForm] = useState(seed);
  const [imageFile, setImageFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'type' ? { color: value === 'album' ? 'teal' : 'purple' } : {}),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      let imageUrl = form.imageUrl;
      if (imageFile) {
        imageUrl = await uploadPublicFile({
          bucket: 'media-assets',
          folder: form.type === 'album' ? 'albums' : 'movies',
          file: imageFile,
        });
      }

      await onSubmit({
        ...form,
        imageUrl,
        rating: Number(form.rating || 0),
      });
    } catch (nextError) {
      setError(nextError.message || 'Unable to save this review.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="editor-form" onSubmit={handleSubmit}>
      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-grid two-col">
        <label>
          type
          <select value={form.type} onChange={(event) => updateField('type', event.target.value)}>
            <option value="movie">movie</option>
            <option value="album">album</option>
          </select>
        </label>
        <label>
          review date
          <input type="date" value={form.reviewDate} onChange={(event) => updateField('reviewDate', event.target.value)} required />
        </label>
      </div>

      <div className="form-grid two-col">
        <label>
          title
          <input value={form.title} onChange={(event) => updateField('title', event.target.value)} required />
        </label>
        <label>
          creator / artist / director
          <input value={form.creator} onChange={(event) => updateField('creator', event.target.value)} required />
        </label>
      </div>

      <div className="form-grid two-col">
        <label>
          rating out of 5
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={form.rating}
            onChange={(event) => updateField('rating', event.target.value)}
            required
          />
        </label>
        <label>
          sticky color
          <select value={form.color} onChange={(event) => updateField('color', event.target.value)}>
            <option value="purple">purple</option>
            <option value="teal">teal</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="pink">pink</option>
          </select>
        </label>
      </div>

      <label>
        poster / album cover URL
        <input type="url" value={form.imageUrl} onChange={(event) => updateField('imageUrl', event.target.value)} />
      </label>

      <label>
        upload poster / album cover
        <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] ?? null)} />
      </label>

      <label>
        review
        <textarea value={form.review} onChange={(event) => updateField('review', event.target.value)} rows="5" required />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn-primary-warm" disabled={busy}>
          {busy ? 'saving...' : submitLabel}
        </button>
        <button type="button" className="btn-resume" onClick={onCancel} disabled={busy}>
          cancel
        </button>
      </div>
    </form>
  );
}
