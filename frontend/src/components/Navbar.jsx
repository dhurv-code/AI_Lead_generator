import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="brand-block">
        <div className="brand-mark">LF</div>
        <div>
          <p className="brand-title">LeadForge AI</p>
          <p className="brand-subtitle">Lead Generation</p>
        </div>
      </div>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
