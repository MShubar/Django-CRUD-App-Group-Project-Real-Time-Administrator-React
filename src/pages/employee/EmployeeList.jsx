import { useState, useEffect } from 'react'
import Employee from '../../components/Employee'
import EmployeeForm from './EmployeeForm'
import { BASE_URL } from '../../servers/config'

const EmployeeList = ({ employees, user, departments, setEmployees }) => {
  //console.log("departments==============",departments);

  const [showForm, setShowForm] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
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
  const handleRowClick = (employee) => {
    setSelectedEmployee(employee)
  }

  const handleCloseDetails = () => {
    setSelectedEmployee(null)
  }
useEffect(() => {
    
      getAllEmployees()
   
  }, [])
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Employees List</h1>
        <button
          className="btn btn-success"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? 'Cancel' : 'New Employee'}
        </button>
      </div>
      {showForm && (
        <EmployeeForm
          user={user}
          departments={departments}
          setEmployees={setEmployees}
          employees={employees}
          setShowForm={setShowForm}
        />
      )}

      <section className="employee-list">
        <div className="row gy-3">
          {employees.map((employee) => (
            <div
              className="col-12"
              key={employee._id}
              
            >
              <Employee employee={employee} departments={departments} />
            </div>
          ))}
        </div>
      </section>

      </div>
  )
}

export default EmployeeList
