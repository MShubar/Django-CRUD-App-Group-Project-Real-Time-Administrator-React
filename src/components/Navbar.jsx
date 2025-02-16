import { NavLink } from 'react-router-dom'
import '../styles/components/Navbar.css'
import LightDark from './Dark-Light-Button'
import Logo from '../styles/Logo.svg'

function Navbar({ isAuthenticated, role, onLogout }) {
  const handleClick = () => {
    onLogout()
  }

  return (
    <>
      <section className="navbar">
        <div className="nav-links">
          <NavLink to={isAuthenticated ? '/dashboard' : '/'} className="logo">
            <img src={Logo} alt="logo" />
          </NavLink>

          {!isAuthenticated && <NavLink to="/">Home</NavLink>}
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}

          {/* Company can see everything */}
          {role === 'company' && (
            <NavLink to="/departmentlist">Department</NavLink>
          )}
          {role === 'company' && <NavLink to="/shift">Shift</NavLink>}
          {(role === 'company' || role === 'employee') && (
            <NavLink to="/employees">Employee</NavLink>
          )}
        </div>

        <div className="reg-btn">
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

      <nav className="bottom-nav">
        <NavLink to="/" className="logo">
          RTA
        </NavLink>

        {!isAuthenticated ? (
          <>
            <NavLink to="/">Home</NavLink>
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
      </nav>
    </>
  )
}

export default Navbar
