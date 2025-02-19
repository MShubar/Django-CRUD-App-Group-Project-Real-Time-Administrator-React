import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'
import '../../styles/home/Department.css'
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
          <form onSubmit={handleSubmit} className="form-group">
            <h2>Create a Department</h2>
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default DepartmentForm
