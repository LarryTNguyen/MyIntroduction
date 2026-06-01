import { profile } from '../data/profile.js';

export function AdminPage() {
  return (
    <section className="section-pad page-section admin-page" aria-labelledby="admin-heading">
      <p className="tag-line">hidden route</p>
      <h1 id="admin-heading" className="page-title">
        Admin
      </h1>
      <div className="admin-card sticky-media sm-teal">
        <h2>Supabase admin flow comes next pass</h2>
        <p>
          This route is intentionally hidden from the main navigation. The next pass can connect Supabase Auth with Google login,
          whitelist <strong>{profile.adminEmail}</strong>, and enable project and media CRUD.
        </p>
        <div className="admin-plan">
          <span>planned auth: Google login</span>
          <span>allowed email: {profile.adminEmail}</span>
          <span>public reads: projects and reviews</span>
          <span>private writes: admin only</span>
        </div>
      </div>
    </section>
  );
}
