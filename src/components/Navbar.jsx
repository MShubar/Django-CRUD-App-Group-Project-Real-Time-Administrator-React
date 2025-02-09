import { NavLink } from 'react-router-dom'
import '../styles/components/Navbar.css'
import LightDark from './Dark-Light-Button'

function Navbar({ isAuthenticated, onLogout }) {
  const handleClick = () => {
    onLogout()
  }
  return (
    <>
      {/* Desktop Navbar (Only Visible on Desktop) */}
      <section className="navbar">
        <div className="nav-links">
          <NavLink to="/" className="logo">
            RTA
          </NavLink>
          {!isAuthenticated && <NavLink to="/">Home</NavLink>}
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        </div>
        <div className="reg-btn">
          <LightDark />
          {!isAuthenticated && (
            <NavLink to="/signin" className="signin">
              Sign In
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink to="/signup" className="signup">
              Sign Up
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/" onClick={handleClick} className="signin">
              Log out
            </NavLink>
          )}
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
        <NavLink to="/" onClick={handleClick} className="signin">
          Log out
        </NavLink>
      </nav>
    </>
  )
}

export default Navbar
