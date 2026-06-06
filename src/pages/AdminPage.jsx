import { useState } from 'react';
import { EditorModal } from '../components/EditorModal.jsx';
import { MediaReviewForm } from '../components/MediaReviewForm.jsx';
import { ProjectForm } from '../components/ProjectForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { profile } from '../data/profile.js';
import { formatReviewDate } from '../lib/dateFormat.js';
import { useMediaReviews } from '../hooks/useMediaReviews.js';
import { useProjects } from '../hooks/useProjects.js';

function AdminGate({ children }) {
  const { authError, isAdmin, isSupabaseConfigured, loading, signInWithGoogle, signOut, user } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <div className="admin-card sticky-media sm-yellow">
        <h2>Supabase is not connected yet</h2>
        <p>
          Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to a local <code>.env.local</code> file, then restart Vite.
          The public pages still work with local fallback data until those values are set.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-card sticky-media sm-teal">
        <h2>Checking login...</h2>
        <p>Looking for an active Supabase session.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-card sticky-media sm-teal">
        <h2>Admin login</h2>
        <p>Use Google login. Only <strong>{profile.adminEmail}</strong> is allowed to edit projects and reviews.</p>
        {authError ? <p className="form-error">{authError}</p> : null}
        <button type="button" className="btn-primary-warm" onClick={signInWithGoogle}>
          continue with Google
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-card sticky-media sm-pink">
        <h2>Signed in, but not allowed</h2>
        <p>
          You are signed in as <strong>{user.email}</strong>. This site only allows <strong>{profile.adminEmail}</strong> to edit content.
        </p>
        <button type="button" className="btn-resume" onClick={signOut}>
          sign out
        </button>
      </div>
    );
  }

  return children;
}

function ProjectsManager() {
  const { projects, loading, error, source, saveProject, removeProject } = useProjects();
  const [editingProject, setEditingProject] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [actionError, setActionError] = useState('');

  function openProject(project = null) {
    setEditingProject(project ?? { displayOrder: projects.length + 1 });
    setShowEditor(true);
    setActionError('');
  }

  async function handleDelete(project) {
    const confirmed = window.confirm(`Permanently delete ${project.title}?`);
    if (!confirmed) return;

    try {
      await removeProject(project.id);
    } catch (nextError) {
      setActionError(nextError.message || 'Unable to delete this project.');
    }
  }

  return (
    <section className="admin-manager sticky-media sm-yellow" aria-labelledby="admin-projects-heading">
      <div className="manager-head">
        <div>
          <h2 id="admin-projects-heading">projects</h2>
          <p>Manual order controls the projects page and featured projects appear on the home page.</p>
        </div>
        <button type="button" className="btn-primary-warm compact-action" onClick={() => openProject()}>
          add project +
        </button>
      </div>

      <p className="admin-status">data source: {source}{loading ? ' · loading' : ''}</p>
      {error ? <p className="inline-warning">Showing fallback data because Supabase returned: {error}</p> : null}
      {actionError ? <p className="form-error">{actionError}</p> : null}

      <div className="admin-list">
        {projects.map((project) => (
          <article className="admin-list-row" key={project.id}>
            <div>
              <strong>{project.number} · {project.title}</strong>
              <span>{project.featured ? 'featured' : 'not featured'} · {project.tech?.slice(0, 4).join(', ')}</span>
            </div>
            <div className="admin-row-actions">
              <button type="button" onClick={() => openProject(project)}>edit</button>
              <button type="button" className="danger-action" onClick={() => handleDelete(project)}>delete</button>
            </div>
          </article>
        ))}
      </div>

      {showEditor ? (
        <EditorModal title={editingProject?.id ? 'edit project' : 'add project'} onClose={() => setShowEditor(false)}>
          <ProjectForm
            initialProject={editingProject}
            onSubmit={async (project) => {
              await saveProject(project);
              setShowEditor(false);
            }}
            onCancel={() => setShowEditor(false)}
            submitLabel={editingProject?.id ? 'save changes' : 'create project'}
          />
        </EditorModal>
      ) : null}
    </section>
  );
}

function MediaManager() {
  const { reviews, loading, error, source, saveMediaReview, removeMediaReview } = useMediaReviews();
  const [editingReview, setEditingReview] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [actionError, setActionError] = useState('');

  function openReview(review = null) {
    setEditingReview(review);
    setShowEditor(true);
    setActionError('');
  }

  async function handleDelete(review) {
    const confirmed = window.confirm(`Permanently delete ${review.title}?`);
    if (!confirmed) return;

    try {
      await removeMediaReview(review.id);
    } catch (nextError) {
      setActionError(nextError.message || 'Unable to delete this review.');
    }
  }

  return (
    <section className="admin-manager sticky-media sm-teal" aria-labelledby="admin-media-heading">
      <div className="manager-head">
        <div>
          <h2 id="admin-media-heading">media reviews</h2>
          <p>Movie and album lists sort newest-first by review date. The home page uses the latest movie and latest album.</p>
        </div>
        <button type="button" className="btn-primary-warm compact-action" onClick={() => openReview()}>
          add review +
        </button>
      </div>

      <p className="admin-status">data source: {source}{loading ? ' · loading' : ''}</p>
      {error ? <p className="inline-warning">Reviews could not load from Supabase: {error}</p> : null}
      {actionError ? <p className="form-error">{actionError}</p> : null}

      <div className="admin-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <article className="admin-list-row" key={review.id}>
              <div>
                <strong>{review.title}</strong>
                <span>{review.type} · {formatReviewDate(review.reviewDate)} · {review.rating}/5</span>
              </div>
              <div className="admin-row-actions">
                <button type="button" onClick={() => openReview(review)}>edit</button>
                <button type="button" className="danger-action" onClick={() => handleDelete(review)}>delete</button>
              </div>
            </article>
          ))
        ) : (
          <p className="inline-warning">No media reviews yet.</p>
        )}
      </div>

      {showEditor ? (
        <EditorModal title={editingReview?.id ? 'edit review' : 'add review'} onClose={() => setShowEditor(false)}>
          <MediaReviewForm
            initialReview={editingReview}
            onSubmit={async (review) => {
              await saveMediaReview(review);
              setShowEditor(false);
            }}
            onCancel={() => setShowEditor(false)}
            submitLabel={editingReview?.id ? 'save changes' : 'create review'}
          />
        </EditorModal>
      ) : null}
    </section>
  );
}

export function AdminPage() {
  const { signOut, user } = useAuth();

  return (
    <section className="section-pad page-section admin-page" aria-labelledby="admin-heading">
      <p className="tag-line">hidden route</p>
      <h1 id="admin-heading" className="page-title">
        Admin
      </h1>
      <p className="page-intro">
        Manage projects and media reviews from one place. Public pages also show inline edit controls when you are signed in as the admin.
      </p>

      <AdminGate>
        <div className="signed-in-row">
          <span>signed in as {user?.email}</span>
          <button type="button" className="btn-resume" onClick={signOut}>
            sign out
          </button>
        </div>
        <div className="admin-dashboard-grid">
          <ProjectsManager />
          <MediaManager />
        </div>
      </AdminGate>
    </section>
  );
}
