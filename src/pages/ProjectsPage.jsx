import { useState } from 'react';
import { AdminToolbar } from '../components/AdminToolbar.jsx';
import { EditorModal } from '../components/EditorModal.jsx';
import { ProjectForm } from '../components/ProjectForm.jsx';
import { ProjectStickyNote } from '../components/ProjectStickyNote.jsx';
import { tagOptions } from '../data/projects.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useProjects } from '../hooks/useProjects.js';

export function ProjectsPage() {
  const { isAdmin, isSupabaseConfigured } = useAuth();
  const { projects, loading, error, source, saveProject, removeProject } = useProjects();
  const [editingProject, setEditingProject] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [actionError, setActionError] = useState('');

  function openNewProjectEditor() {
    setEditingProject({ displayOrder: projects.length + 1 });
    setShowEditor(true);
    setActionError('');
  }

  function openEditProjectEditor(project) {
    setEditingProject(project);
    setShowEditor(true);
    setActionError('');
  }

  async function handleSaveProject(project) {
    await saveProject(project);
    setShowEditor(false);
    setEditingProject(null);
  }

  async function handleDeleteProject(project) {
    const confirmed = window.confirm(`Permanently delete ${project.title}?`);
    if (!confirmed) return;

    try {
      await removeProject(project.id);
    } catch (nextError) {
      setActionError(nextError.message || 'Unable to delete this project.');
    }
  }

  return (
    <section className="section-pad page-section" aria-labelledby="projects-heading">
      <p className="tag-line">project notebook</p>
      <div className="page-title-row">
        <div>
          <h1 id="projects-heading" className="page-title">
            Projects
          </h1>
          <p className="page-intro">
            A balanced mix of distributed systems, machine learning, full-stack apps, and data science work from my classes and side projects.
          </p>
        </div>
      </div>

      {isAdmin ? (
        <AdminToolbar
          onAdd={openNewProjectEditor}
          addLabel="add project +"
          status={isSupabaseConfigured ? `data source: ${source}` : 'add Supabase env vars to save edits'}
        />
      ) : null}

      {loading ? <p className="inline-warning">Loading projects...</p> : null}
      {error ? <p className="inline-warning">Showing local project data because Supabase returned: {error}</p> : null}
      {actionError ? <p className="form-error">{actionError}</p> : null}

      <div className="filter-note" aria-label="Project tag options">
        {tagOptions.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-wide-board">
        {projects.map((project) => (
          <ProjectStickyNote
            key={project.id}
            project={project}
            variant="wide"
            isAdmin={isAdmin}
            onEdit={openEditProjectEditor}
            onDelete={handleDeleteProject}
          />
        ))}
      </div>

      {showEditor ? (
        <EditorModal title={editingProject?.id ? 'edit project' : 'add project'} onClose={() => setShowEditor(false)}>
          <ProjectForm
            initialProject={editingProject}
            onSubmit={handleSaveProject}
            onCancel={() => setShowEditor(false)}
            submitLabel={editingProject?.id ? 'save changes' : 'create project'}
          />
        </EditorModal>
      ) : null}
    </section>
  );
}
