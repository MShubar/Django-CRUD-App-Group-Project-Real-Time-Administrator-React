import { useState } from 'react'
import Employee from '../../components/Employee'
import { NavLink } from 'react-router-dom'
import EmployeeForm from './EmployeeForm'
import EmployeeDetails from './EmployeeDetails'
import { BASE_URL } from '../../servers/config'

const EmployeeList = ({ employees, user, departments, setEmployees }) => {
  //console.log("departments==============",departments);

  const [showForm, setShowForm] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee)
  }

  const handleCloseDetails = () => {
    setSelectedEmployee(null)
  }

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
