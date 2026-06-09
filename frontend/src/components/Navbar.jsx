import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="brand-block">
        <div className="brand-mark">AL</div>
        <div>
          <p className="brand-title">Apex Leads</p>
          <p className="brand-subtitle">AI lead generation</p>
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
