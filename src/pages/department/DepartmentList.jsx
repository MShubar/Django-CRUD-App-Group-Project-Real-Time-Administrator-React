import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'
import '../../styles/home/Department.css'
const DepartmentList = () => {
  const [departments, setDepartments] = useState([])

  useEffect(() => {
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

    fetchDepartments()
  }, [])

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: 'white' }}>Departments List</h1>
        <Link to="/newdepartment" className="createButton">
          Create Department
        </Link>
      </div>

      <section className="department-list">
        <div className="row gy-3">
          {departments.map((department) => (
            <div className="col-12" key={department._id}>
              <Link
                to={`/departments/${department._id}`}
                className="text-decoration-none"
              >
                <div className="card p-3 border">
                  <h5 className="card-title">{department.name}</h5>
                  <p className="card-text">{department.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DepartmentList
