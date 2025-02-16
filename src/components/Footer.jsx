import '../styles/components/Footer.css'
import { NavLink } from 'react-router-dom'
function Footer({ isAuthenticated }) {
  return (
    <>
      <section className="footer">
        <div className="column">
          <h2>Pages</h2>
          {!isAuthenticated && (
            <NavLink to="/" className="column-text">
              Home
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink to="/signin" className="column-text">
              Sign In
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink to="/signup" className="column-text">
              Sign Up
            </NavLink>
          )}
        </div>
        <div className="column">
          <h2>Scan to Download</h2>
        </div>
        <div className="column">
          <h2>Social Links</h2>
          <a href="mailto:mohsen@ict-bh.tech" className="column-text">
            Email
          </a>
        </div>
      </section>
      <section className="copyright">
        <div className="column2">
          Copyright Real-Time-Administrator © 2025 - All Rights Reserved
        </div>
      </section>
    </>
  )
}

export default Footer
