import { NavLink } from 'react-router-dom'
import '../styles/components/Navbar.css'
import LightDark from './Dark-Light-Button'
import Logo from '../styles/Logo.svg'
import Profile from './Profile'

function Navbar({ isAuthenticated, role, onLogout, user }) {
  const handleClick = () => {
    onLogout()
  }
  return (
    <>
      <section className="navbar">
        <div className="nav-links">
          {isAuthenticated && (
            <NavLink to="/dashboard">
              <img src={Logo} alt="logo" />
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink to="/">
              <img src={Logo} alt="logo" />
            </NavLink>
          )}
          {!isAuthenticated && <NavLink to="/">Home</NavLink>}
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}

          {/* Company can see everything */}
          {isAuthenticated && role === 'company' && (
            <NavLink to="/departmentlist">Department</NavLink>
          )}
          {isAuthenticated && role === 'company' && (
            <NavLink to="/shift">Shift</NavLink>
          )}
          {isAuthenticated && role === 'company' && (
            <NavLink to="/employees">Employee</NavLink>
          )}
        </div>

        <div className="reg-btn">
          {isAuthenticated && <Profile user={user} />}
          <LightDark />
          {!isAuthenticated ? (
            <>
              <NavLink to="/signin" className="signin">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="signup">
                Sign Up
              </NavLink>
            </>
          ) : (
            <NavLink to="/" onClick={handleClick} className="signup">
              Log out
            </NavLink>
          )}
        </div>
      </section>
    </>
  )
}

export default Navbar
