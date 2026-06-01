import { GitHubIcon, LinkedInIcon, MailIcon } from './SocialIcons.jsx';
import { profile } from '../data/profile.js';

export function SocialLinks({ showEmail = false }) {
  return (
    <div className="social-links" aria-label="Social links">
      <a href={profile.links.linkedin} className="social-link" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
        <LinkedInIcon />
      </a>
      <a href={profile.links.github} className="social-link" target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <GitHubIcon />
      </a>
      {showEmail ? (
        <a href={`mailto:${profile.email}`} className="social-link" aria-label="Email Larry Nguyen">
          <MailIcon />
        </a>
      ) : null}
    </div>
  );
}
