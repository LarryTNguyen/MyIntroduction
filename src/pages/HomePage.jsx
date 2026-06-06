import { Link } from 'react-router-dom';
import { MediaPlaceholder, MediaStickyNote } from '../components/MediaStickyNote.jsx';
import { ProjectStickyNote } from '../components/ProjectStickyNote.jsx';
import { SocialLinks } from '../components/SocialLinks.jsx';
import { mediaPlaceholders } from '../data/media.js';
import { profile } from '../data/profile.js';
import { useMediaReviews } from '../hooks/useMediaReviews.js';
import { useProjects } from '../hooks/useProjects.js';

export function HomePage() {
  const { featuredProjects, error: projectError } = useProjects();
  const { latestMovieReview, latestAlbumReview, error: mediaError } = useMediaReviews();

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

      <section className="home-projects section-pad" aria-labelledby="featured-heading">
        <div className="section-head">
          <h2 id="featured-heading" className="section-label">
            ✦ featured projects
          </h2>
          <Link to="/projects" className="section-link">
            all projects →
          </Link>
        </div>
        {projectError ? <p className="inline-warning">Showing local project data because Supabase returned: {projectError}</p> : null}
        <div className="sticky-board compact-board">
          {featuredProjects.map((project) => (
            <ProjectStickyNote key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="home-recent section-pad" aria-labelledby="recent-heading">
        <div className="section-head">
          <h2 id="recent-heading" className="section-label">
            ✦ recently consumed
          </h2>
          <Link to="/media" className="section-link">
            media page →
          </Link>
        </div>
        {mediaError ? <p className="inline-warning">Media reviews could not load from Supabase yet.</p> : null}
        <div className="media-sticky-board home-media-board">
          {latestMovieReview ? <MediaStickyNote item={latestMovieReview} /> : <MediaPlaceholder item={mediaPlaceholders.movie} />}
          {latestAlbumReview ? <MediaStickyNote item={latestAlbumReview} /> : <MediaPlaceholder item={mediaPlaceholders.album} />}
        </div>
      </section>
    </>
  );
}
