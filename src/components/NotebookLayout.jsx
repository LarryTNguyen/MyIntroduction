import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar.jsx';
import { Footer } from './Footer.jsx';

const stitches = Array.from({ length: 40 }, (_, index) => index);

export function NotebookLayout() {
  return (
    <div className="outer">
      <aside className="binding" aria-hidden="true">
        <span className="binding-line" />
        {stitches.map((stitch) => (
          <span key={stitch} className="stitch" style={{ top: `${16 + stitch * 44}px` }} />
        ))}
      </aside>
      <div className="page-main">
        <div className="lined-bg" aria-hidden="true" />
        <div className="margin-note" aria-hidden="true">
          portfolio draft - 2026
        </div>
        <div className="content">
          <NavBar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
