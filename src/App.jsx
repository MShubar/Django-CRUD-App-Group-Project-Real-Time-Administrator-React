import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/home/Dashboard'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={<Signin handleLogin={handleLogin} setUser={setUser} />}
        />
        <Route path="/signup" element={<Signup />} />
        {user ? <Route path="/dashboard" element={<Dashboard />} /> : null}
      </Routes>
      <Footer />
    </>
  )
}

export default App
