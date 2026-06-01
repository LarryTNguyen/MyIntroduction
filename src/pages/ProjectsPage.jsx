import { ProjectStickyNote } from '../components/ProjectStickyNote.jsx';
import { projects, tagOptions } from '../data/projects.js';

export function ProjectsPage() {
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

      <div className="filter-note" aria-label="Project tag options">
        {tagOptions.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-wide-board">
        {projects.map((project) => (
          <ProjectStickyNote key={project.id} project={project} variant="wide" />
        ))}
      </div>
    </section>
  );
}
