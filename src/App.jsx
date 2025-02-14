import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/home/Dashboard'
import DepartmentForm from './pages/department/DepartmentForm'
import DepartmentDetails from './pages/department/DepartmentDetails'
import DepartmentList from './pages/department/DepartmentList'
import DepartmentUpdateForm from './pages/department/DepartmentUpdateForm'
import EmployeeList from './pages/employee/EmployeeList'
import EmployeeDetails from './pages/employee/EmployeeDetails'
import EmployeeUpdateForm from './pages/employee/EmployeeUpdateForm'
import DeleteEmployee from './pages/employee/DeleteEmployee'
import { useState, useEffect } from 'react'
import { BASE_URL } from './servers/config'

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

  const [employees, setEmployees] = useState([])
  const handleLogin = () => {
    setIsAuthenticated(true)
  }
  useEffect(() => {
    const getAllEmployees = async () => {
      const token = localStorage.getItem('token')
      //console.log("Token:", token);
      if (token) {
        try {
          const response = await fetch(`${BASE_URL}/employees`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          const data = await response.json()

          if (!response.ok) {
            console.error('Error fetching employees:', data.message) // Log any error messages
            if (response.status === 401) {
              console.error('Unauthorized access, redirecting to sign-in')
            }
            return
          }
          setEmployees(data) // Set the employees state
        } catch (error) {
          console.error('Error fetching employees:', error)
        }
      }
    }
    getAllEmployees()
  }, [])
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
            <Route path="/departmentlist" element={<DepartmentList />} />
            <Route path="/departments/:id" element={<DepartmentDetails />} />
            <Route
              path="/newdepartment"
              element={
                <DepartmentForm
                  departments={departments}
                  setDepartments={setDepartments}
                />
              }
            />
            <Route
              path="/updatedepartment/:id"
              element={
                <DepartmentUpdateForm
                  departments={departments}
                  setDepartments={setDepartments}
                />
              }
            />
          </>
        ) : null}
        {user ? (
          <Route
            path="/employees"
            element={
              <EmployeeList
                employees={employees}
                user={user}
                departments={departments}
              />
            }
          />
        ) : null}
        {user ? (
          <Route
            path="/employees/:id"
            element={<EmployeeDetails employees={employees} user={user} />}
          />
        ) : null}
        {user ? (
          <Route
            path="/employees/update/:id"
            element={<EmployeeUpdateForm employees={employees} user={user} />}
          />
        ) : null}
        {user ? (
          <Route
            path="/employees/delete/:id"
            element={
              <DeleteEmployee
                employees={employees}
                setEmployees={setEmployees}
                user={user}
              />
            }
          />
        ) : null}
      </Routes>
      <Footer isAuthenticated={isAuthenticated} />
    </>
  )
}

export default App
