// EmployeeDetails.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'
import { Link } from 'react-router-dom'

const EmployeeDetails = () => {
  const { id } = useParams() // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/employees/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token if needed
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch employee details')
        }

        const employeeData = await response.json()
        setEmployee(employeeData)
      } catch (error) {
        console.error('Error fetching employee details:', error)
      }
    }

    fetchEmployeeDetails()
  }, [id])

  if (!employee) {
    return <div>Loading...</div>
  }

  return (
    <div className="signup-container">
      <h2>Employee Details</h2>
      <p>
        <strong>Name:</strong> {employee.name}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
      <p>
        <strong>Company ID:</strong> {employee.companyId}
      </p>
      <p>
        <strong>Department ID:</strong> {employee.departmentId}
      </p>
      <p>
        <strong>Status:</strong> {employee.status}
      </p>
      <button onClick={() => window.history.back()}>Back</button>{' '}
      {/* Use back button to go to the previous page */}
      <div className="d-flex justify-content-between mt-3">
        <Link
          className="btn btn-warning btn-sm"
          to={`/employees/update/${employee._id}`}
        >
          Update
        </Link>
        <Link
          className="btn btn-danger btn-sm"
          to={`/employees/delete/${employee._id}`}
        >
          Delete
        </Link>
      </div>
    </div>
  )
}

export default EmployeeDetails
