import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'

const DepartmentUpdateForm = ({ departments, setDepartments }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const department = departments.find((dept) => dept._id === id)
  if (!department) {
    return <p>No department found</p>
  }

  const [formValues, setFormValues] = useState({
    name: department.name,
    description: department.description
  })

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`${BASE_URL}/department/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
      })

      if (!response.ok) {
        throw new Error('Failed to update department')
      }

      const updatedDept = await response.json()

      setDepartments(
        departments.map((dept) => (dept._id === id ? updatedDept : dept))
      )

      navigate(`/departments/${id}`)
    } catch (error) {
      console.error('Error updating department:', error)
    }
  }

  return (
    <div className="page">
      <div className="SigninForm">
        <div className="SigninBorders">
          <h1>Update Department</h1>
          <form onSubmit={handleSubmit} className="form-group">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Department Name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                id="description"
                className="form-control"
                value={formValues.description}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="createButton"
              style={{ width: '100%' }}
            >
              Create Department
            </button>
            <button onClick={() => navigate(`/shift/${id}`)}>Back</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DepartmentUpdateForm
