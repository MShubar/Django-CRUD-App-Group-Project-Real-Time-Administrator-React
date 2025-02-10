import { NavLink } from 'react-router-dom'
import '../styles/components/Navbar.css'
import LightDark from './Dark-Light-Button'

function Navbar({ isAuthenticated, onLogout }) {
  const handleClick = () => {
    onLogout()
  }
  return (
    <>
      <section className="navbar">
        <div className="nav-links">
          {!isAuthenticated && (
            <NavLink to="/" className="logo">
              RTA
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/dashboard" className="logo">
              RTA
            </NavLink>
          )}
          {!isAuthenticated && <NavLink to="/">Home</NavLink>}
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
          {isAuthenticated && <NavLink to="/employees">Employee</NavLink>}
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
