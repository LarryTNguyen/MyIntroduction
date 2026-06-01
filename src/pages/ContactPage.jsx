import { profile } from '../data/profile.js';
import { SocialLinks } from '../components/SocialLinks.jsx';

export function ContactPage() {
  return (
    <section className="section-pad page-section contact-page" aria-labelledby="contact-heading">
      <p className="tag-line">say hello</p>
      <h1 id="contact-heading" className="page-title">
        Contact Me
      </h1>
      <div className="contact-card sticky-media sm-yellow">
        <h2>Best way to reach me</h2>
        <p>
          I am open to software engineering, backend, distributed systems, full-stack, and ML-related opportunities.
          Email is the easiest way to reach me.
        </p>
        <a href={`mailto:${profile.email}`} className="btn-primary-warm contact-mail">
          email {profile.email}
        </a>
        <SocialLinks showEmail />
      </div>
    </section>
  );
}
