import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'

const DepartmentForm = ({ departments, setDepartments }) => {
  const navigate = useNavigate()

  const initialState = {
    name: '',
    description: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${BASE_URL}/department`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
      })

      if (!response.ok) {
        throw new Error('Failed to create department')
      }

      const data = await response.json()
      setDepartments([...departments, data])
      setFormValues(initialState)
      navigate('/departmentlist')
    } catch (error) {
      console.error('Error adding department:', error)
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  return (
    <div className="page">
      <div className="SigninForm">
        <div className="SigninBorders">
          <form onSubmit={handleSubmit} className="signup-form">
            <h2>Create a Department</h2>

            <label htmlFor="name" className="form-label">
              Department Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-control border border-success rounded-3 shadow-sm"
              value={formValues.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              id="description"
              className="form-control border border-success rounded-3 shadow-sm"
              value={formValues.description}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary btn-lg w-100">
              Create Department
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DepartmentForm
