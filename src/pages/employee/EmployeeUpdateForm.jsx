import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'

const EmployeeUpdateForm = ({ departments, setEmployees }) => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [status, setStatus] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/employees/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch employee details')
        }

        const employeeData = await response.json()
        setEmployee(employeeData)
        setName(employeeData.name)
        setPosition(employeeData.position)
        setDepartmentId(employeeData.departmentId)
        setStatus(employeeData.status)
        setEmail(employeeData.email)
        // Do not set password initially for security reasons
      } catch (error) {
        console.error('Error fetching employee details:', error)
      }
    }

    fetchEmployeeDetails()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedEmployee = {
      name,
      position,
      departmentId,
      status,
      email
    }

    if (password) {
      updatedEmployee.password = password
    }

    try {
      const response = await fetch(`${BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedEmployee)
      })

      if (!response.ok) {
        throw new Error('Failed to update employee')
      }

      const updatedEmployeeData = await response.json() // Get the updated data from the response

      // Update the employees state
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === updatedEmployeeData._id ? updatedEmployeeData : emp
        )
      )

      navigate(`/employees/${id}`)
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  }

  if (!employee) {
    return <div>Loading...</div>
  }

  return (
    <div className="signup-container">
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <select
          id="departmentId"
          name="departmentId"
          className="form-control border border-success rounded-3 shadow-sm"
          onChange={(e) => setDepartmentId(e.target.value)}
          value={departmentId}
          required
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
        <select
          id="status"
          name="status"
          className="form-control border border-success rounded-3 shadow-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select a Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Blocked">Blocked</option>
        </select>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-warning btn-sm">
            Update
          </button>
          <button type="button" onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeUpdateForm
