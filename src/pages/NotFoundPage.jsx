import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="section-pad page-section" aria-labelledby="not-found-heading">
      <p className="tag-line">lost page</p>
      <h1 id="not-found-heading" className="page-title">
        Page not found
      </h1>
      <p className="page-intro">This note does not exist yet.</p>
      <Link to="/" className="btn-primary-warm">
        back to front →
      </Link>
    </section>
  );
}
