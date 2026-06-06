import { useMemo, useState } from 'react';
import { uploadPublicFile } from '../lib/contentApi.js';

const colorOptions = ['yellow', 'green', 'blue', 'pink', 'purple', 'teal'];

const emptyProject = {
  displayOrder: 1,
  title: '',
  subtitle: '',
  summary: '',
  description: '',
  features: [],
  tech: [],
  tags: [],
  contributions: [],
  githubUrl: '',
  demoUrl: '',
  screenshotUrl: '',
  featured: false,
  color: 'yellow',
  rotation: '-0.5deg',
};

function arrayToMultiline(value) {
  return Array.isArray(value) ? value.join('\n') : value || '';
}

function arrayToCommaList(value) {
  return Array.isArray(value) ? value.join(', ') : value || '';
}

function multilineToArray(value) {
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function commaListToArray(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProjectForm({ initialProject, onSubmit, onCancel, submitLabel = 'save project' }) {
  const seed = useMemo(() => ({ ...emptyProject, ...(initialProject ?? {}) }), [initialProject]);
  const [form, setForm] = useState(() => ({
    ...seed,
    featuresText: arrayToMultiline(seed.features),
    techText: arrayToCommaList(seed.tech),
    tagsText: arrayToCommaList(seed.tags),
    contributionsText: arrayToCommaList(seed.contributions),
  }));
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      let screenshotUrl = form.screenshotUrl;
      if (screenshotFile) {
        screenshotUrl = await uploadPublicFile({
          bucket: 'project-screenshots',
          folder: 'screenshots',
          file: screenshotFile,
        });
      }

      await onSubmit({
        ...form,
        screenshotUrl,
        displayOrder: Number(form.displayOrder || 0),
        features: multilineToArray(form.featuresText),
        tech: commaListToArray(form.techText),
        tags: commaListToArray(form.tagsText),
        contributions: commaListToArray(form.contributionsText),
      });
    } catch (nextError) {
      setError(nextError.message || 'Unable to save this project.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="editor-form" onSubmit={handleSubmit}>
      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-grid two-col">
        <label>
          project title
          <input value={form.title} onChange={(event) => updateField('title', event.target.value)} required />
        </label>
        <label>
          subtitle
          <input value={form.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} />
        </label>
      </div>

      <label>
        short summary
        <textarea value={form.summary} onChange={(event) => updateField('summary', event.target.value)} rows="2" required />
      </label>

      <label>
        detailed description
        <textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} rows="4" required />
      </label>

      <div className="form-grid two-col">
        <label>
          features, one per line
          <textarea value={form.featuresText} onChange={(event) => updateField('featuresText', event.target.value)} rows="4" />
        </label>
        <label>
          contributions, comma separated
          <textarea value={form.contributionsText} onChange={(event) => updateField('contributionsText', event.target.value)} rows="4" />
        </label>
      </div>

      <div className="form-grid two-col">
        <label>
          tech stack, comma separated
          <input value={form.techText} onChange={(event) => updateField('techText', event.target.value)} required />
        </label>
        <label>
          tags, comma separated
          <input value={form.tagsText} onChange={(event) => updateField('tagsText', event.target.value)} />
        </label>
      </div>

      <div className="form-grid two-col">
        <label>
          GitHub URL
          <input type="url" value={form.githubUrl} onChange={(event) => updateField('githubUrl', event.target.value)} required />
        </label>
        <label>
          demo URL
          <input type="url" value={form.demoUrl} onChange={(event) => updateField('demoUrl', event.target.value)} />
        </label>
      </div>

      <label>
        project screenshot URL
        <input type="url" value={form.screenshotUrl} onChange={(event) => updateField('screenshotUrl', event.target.value)} />
      </label>

      <label>
        upload project screenshot
        <input type="file" accept="image/*" onChange={(event) => setScreenshotFile(event.target.files?.[0] ?? null)} />
      </label>

      <div className="form-grid three-col">
        <label>
          manual order
          <input type="number" min="1" value={form.displayOrder} onChange={(event) => updateField('displayOrder', event.target.value)} />
        </label>
        <label>
          color
          <select value={form.color} onChange={(event) => updateField('color', event.target.value)}>
            {colorOptions.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </label>
        <label>
          rotation
          <input value={form.rotation} onChange={(event) => updateField('rotation', event.target.value)} placeholder="-0.5deg" />
        </label>
      </div>

      <label className="checkbox-field">
        <input type="checkbox" checked={form.featured} onChange={(event) => updateField('featured', event.target.checked)} />
        show on the home page
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
