import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/home/Dashboard'
import { useState, useEffect } from 'react'

import DepartmentForm from './pages/department/DepartmentForm'

function App() {
  const [user, setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [departments, setDepartments] = useState([])

  const getDepartments = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await fetch('/api/departments', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        setDepartments(data) 
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getDepartments()
    }
  }, [isAuthenticated])

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
          element={
            <Signin handleLogin={handleLogin} user={user} setUser={setUser} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        {user ? <Route path="/dashboard" element={<Dashboard />} /> : null}
        
        {user ? (
          <>
          <Route path="/newdepartment" element={<DepartmentForm departments={departments} setDepartments={setDepartments} />}/>
          </>
        ) : null }
      </Routes>
      <Footer />
    </>
  )
}

export default App
