import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'front' },
  { to: '/projects', label: 'projects' },
  { to: '/media', label: 'media' },
];

export function NavBar() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link to="/" className="nav-brand" aria-label="Larry Nguyen home">
        LN <span aria-hidden="true">✦</span>
      </Link>
      <div className="nav-right">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/contact" className="btn-nav">
          contact me
        </Link>
      </div>
    </nav>
  );
}
