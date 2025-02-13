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
          'Authorization': `Bearer ${token}`
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
    <div>
      <h1>Create a Department</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Department Name:</label>
        <input
          type="text"
          id="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={formValues.description}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Create Department</button>
      </form>
    </div>
  )
}

export default DepartmentForm
