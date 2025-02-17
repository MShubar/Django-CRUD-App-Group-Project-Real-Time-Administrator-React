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
import DepartmentDeleteConfirm from './pages/department/DepartmentDeleteConfirm'
import ShiftForm from './pages/shift/ShiftForm'
import ShiftList from './pages/shift/ShiftList'
import ShiftDetails from './pages/shift/ShiftDetails'
import ShiftUpdateForm from './pages/shift/ShiftUpdateForm'
import ShiftDeleteConfirm from './pages/shift/ShiftDeleteConfirm'
import EmployeeForm from './pages/employee/EmployeeForm'
import EmployeeList from './pages/employee/EmployeeList'
import EmployeeDetails from './pages/employee/EmployeeDetails'
import EmployeeUpdateForm from './pages/employee/EmployeeUpdateForm'
import DeleteEmployee from './pages/employee/DeleteEmployee'
import { useState, useEffect } from 'react'
import { BASE_URL } from './servers/config'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFound from './pages/NotFound'
import CompanyProfile from './pages/home/CompanyProfile'

function App() {
  const [user, setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [shifts, setShifts] = useState([])
  const fetchDepartments = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${BASE_URL}/department`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch departments')
      }

      const departmentData = await response.json()
      setDepartments(departmentData)
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchDepartments()
    }
  }, [isAuthenticated])

  const getShifts = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await fetch(`${BASE_URL}/shift`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        setShifts(data)
      } catch (error) {
        console.error('Error fetching shifts:', error)
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getShifts()
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
      <Navbar
        isAuthenticated={isAuthenticated}
        role={user?.role}
        onLogout={handleLogout}
      />
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
            <Route
              path="/departments/:id"
              element={<DepartmentDetails departments={departments} />}
            />
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
            <Route
              path="/deletedepartment/:id"
              element={
                <DepartmentDeleteConfirm
                  departments={departments}
                  setDepartments={setDepartments}
                />
              }
            />
          </>
        ) : null}

        {user ? (
          <>
            <Route path="/shift" element={<ShiftList />} />
            <Route path="/shift/:id" element={<ShiftDetails />} />
            <Route
              path="/newshift"
              element={<ShiftForm shifts={shifts} setShifts={setShifts} />}
            />
            <Route
              path="/updateshift/:id"
              element={
                <ShiftUpdateForm shifts={shifts} setShifts={setShifts} />
              }
            />
            <Route
              path="/deleteshift/:id"
              element={
                <ShiftDeleteConfirm shifts={shifts} setShifts={setShifts} />
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
                setEmployees={setEmployees}
              />
            }
          />
        ) : null}
        {user ? (
          <Route
            path="/employees/:employeeId"
            element={
              <EmployeeDetails
                employees={employees}
                user={user}
                departments={departments}
              />
            }
          />
        ) : null}
        {user ? (
          <Route
            path="/employees/new"
            element={
              <EmployeeForm
                user={user}
                departments={departments}
                setEmployees={setEmployees}
              />
            }
          />
        ) : null}

        {user ? (
          <Route
            path="/employees/update/:id"
            element={
              <EmployeeUpdateForm
                employees={employees}
                user={user}
                departments={departments}
                setEmployees={setEmployees}
              />
            }
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
        {user ? (
          <Route path="/editProfile" element={<CompanyProfile />} />
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer isAuthenticated={isAuthenticated} role={user?.role} />
    </>
  )
}

export default App
