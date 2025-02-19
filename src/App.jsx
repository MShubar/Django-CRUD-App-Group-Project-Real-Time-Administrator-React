import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
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
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFound from './pages/NotFound'
import CompanyProfile from './pages/home/CompanyProfile'
import CompanyUpdateForm from './pages/home/CompanyUpdateForm'
import CompanyDeleteConfirm from './pages/home/CompanyDeleteConfirm'

function App() {
  const [user, setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [shifts, setShifts] = useState([])

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
        user={user}
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
        {user ? (
          <Route
            path="/dashboard"
            element={
              <Dashboard isAuthenticated={isAuthenticated} role={user?.role} />
            }
          />
        ) : null}
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
          <Route path="/editProfile" element={<CompanyProfile user={user} />} />
        ) : null}
        {user ? (
          <Route
            path="/editProfile/update/:id"
            element={<CompanyUpdateForm user={user} />}
          />
        ) : null}
        {user ? (
          <Route
            path="/editProfile/delete/:id"
            element={
              <CompanyDeleteConfirm
                user={user}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer isAuthenticated={isAuthenticated} role={user?.role} />
    </>
  )
}

export default App
