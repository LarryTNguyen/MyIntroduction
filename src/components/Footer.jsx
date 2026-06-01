import { profile } from '../data/profile.js';
import { SocialLinks } from './SocialLinks.jsx';

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-title">Larry Nguyen</p>
        <p>Software engineering, ML, and distributed systems.</p>
      </div>
      <div className="footer-actions">
        <SocialLinks showEmail />
        <a href={`mailto:${profile.email}`} className="footer-mail">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
