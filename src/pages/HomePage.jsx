import { Link } from 'react-router-dom';
import { ProjectStickyNote } from '../components/ProjectStickyNote.jsx';
import { MediaPlaceholder } from '../components/MediaStickyNote.jsx';
import { SocialLinks } from '../components/SocialLinks.jsx';
import { profile } from '../data/profile.js';
import { featuredProjects } from '../data/projects.js';
import { mediaPlaceholders } from '../data/media.js';

export function HomePage() {
  return (
    <>
      <section className="hero section-pad" id="about" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="tag-line">✦ {profile.tagline}</p>
          <h1 id="hero-heading">{profile.heroTitle}</h1>
          <svg className="scribble" viewBox="0 0 260 18" aria-hidden="true" focusable="false">
            <path d="M3 12 C38 4 80 16 122 10 S195 4 257 12" />
            <path d="M12 15 C45 9 90 17 130 13 S198 9 248 15" />
          </svg>
          <p className="body-text">{profile.heroBio}</p>
          <div className="cta-row">
            <Link to="/projects" className="btn-primary-warm">
              see my work →
            </Link>
            <a href={profile.resumePath} className="btn-resume" target="_blank" rel="noreferrer">
              grab my résumé
            </a>
          </div>
          <SocialLinks />
        </div>

        <aside className="photo-col" aria-label="Profile photo">
          <figure className="polaroid">
            <img src={profile.photoPath} alt="Larry Nguyen smiling outside Geisel Library" className="polaroid-img" />
            <figcaption className="polaroid-caption">- Larry Nguyen</figcaption>
          </figure>
          <div className="sticky-note-small">currently building: a better portfolio notebook</div>
        </aside>
      </section>

      <section className="home-grid section-pad" aria-labelledby="featured-heading">
        <div>
          <div className="section-head">
            <h2 id="featured-heading" className="section-label">
              ✦ featured projects
            </h2>
            <Link to="/projects" className="section-link">
              all projects →
            </Link>
          </div>
          <div className="sticky-board compact-board">
            {featuredProjects.map((project) => (
              <ProjectStickyNote key={project.id} project={project} />
            ))}
          </div>
        </div>

        <aside className="recent-panel" aria-labelledby="recent-heading">
          <div className="section-head">
            <h2 id="recent-heading" className="section-label">
              ✦ recently consumed
            </h2>
            <Link to="/media" className="section-link">
              media page →
            </Link>
          </div>
          <div className="media-sticky-board home-media-board">
            <MediaPlaceholder item={mediaPlaceholders.movie} />
            <MediaPlaceholder item={mediaPlaceholders.album} />
          </div>
        </aside>
      </section>
    </>
  );
}
