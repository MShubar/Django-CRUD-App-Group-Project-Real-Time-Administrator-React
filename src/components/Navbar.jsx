import { NavLink } from 'react-router-dom'
import '../styles/components/Navbar.css'
import LightDark from './Dark-Light-Button'

function Navbar() {
  return (
    <>
      {/* Desktop Navbar (Only Visible on Desktop) */}
      <section className="navbar">
        <div className="nav-links">
          <NavLink to="/" className="logo">
            RTA
          </NavLink>
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="reg-btn">
          <LightDark />
          <NavLink to="/signin" className="signin">
            Sign In
          </NavLink>
          <NavLink to="/signup" className="signup">
            Sign Up
          </NavLink>
        </div>
      </section>

      {/* Mobile Bottom Navbar (Only Visible on Mobile) */}
      <nav className="bottom-nav">
        <NavLink to="/" className="logo">
          RTA
        </NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signin" className="signin">
          Sign In
        </NavLink>
        <NavLink to="/signup" className="signup">
          Sign Up
        </NavLink>
      </nav>
    </>
  )
}

export default Navbar
