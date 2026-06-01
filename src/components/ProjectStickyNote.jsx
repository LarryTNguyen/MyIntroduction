export function ProjectStickyNote({ project, variant = 'compact' }) {
  const noteClass = variant === 'wide' ? 'sticky-proj sticky-proj-wide' : 'sticky-proj';

  return (
    <article className={`${noteClass} s-${project.color}`} style={{ '--rotate': project.rotation }}>
      <span className="sticky-proj-num" aria-hidden="true">
        {project.number}
      </span>
      <div>
        <h3 className="sticky-proj-title">{project.title}</h3>
        {project.subtitle ? <p className="sticky-proj-subtitle">{project.subtitle}</p> : null}
      </div>
      <p className="sticky-proj-desc">{variant === 'wide' ? project.description : project.summary}</p>

      {variant === 'wide' ? (
        <div className="project-detail-grid">
          <div>
            <h4>features</h4>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>my work</h4>
            <div className="contribution-list">
              {project.contributions.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="sticky-tech" aria-label="Tech stack">
        {project.tech.map((tech) => (
          <span className="sticky-pill" key={tech}>
            {tech}
          </span>
        ))}
      </div>

      {variant === 'wide' ? (
        <div className="sticky-tech tags-row" aria-label="Project tags">
          {project.tags.map((tag) => (
            <span className="sticky-pill tag-pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="sticky-link-row">
        <a href={project.githubUrl} className="sticky-link" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        {project.demoUrl ? (
          <a href={project.demoUrl} className="sticky-link" target="_blank" rel="noreferrer">
            demo ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
