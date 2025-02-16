import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../../servers/config'
import { Link } from 'react-router-dom'

const DepartmentDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [department, setDepartment] = useState(null)

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(`${BASE_URL}/department/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch department details')
        }

        const data = await response.json()
        setDepartment(data)
      } catch (error) {
        console.error('Error fetching department details:', error)
      }
    }

    fetchDepartment()
  }, [id])

  const handleDelete = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${BASE_URL}/department/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete department')
      }

      navigate('/departments')
    } catch (error) {
      console.error('Error deleting department:', error)
    }
  }

  return (
    <div>
      {department ? (
        <>
          <h1>Department Details</h1>
          <section className="department-details">
            <h2>{department.name}</h2>
            <p>
              <strong>Description:</strong> {department.description}
            </p>

            <Link
              className="btn btn-primary btn-sm mb-2"
              to={`/updatedepartment/${department._id}`}
            >
              Update
            </Link>

            <Link
              className="btn btn-danger btn-sm mb-2"
              to={`/deletedepartment/${department._id}`}
            >
              Delete
            </Link>

            <button
              className="btn btn-secondary btn-sm mb-2"
              onClick={() => navigate('/departmentlist')} 
            >
              Back
            </button>
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default DepartmentDetails
