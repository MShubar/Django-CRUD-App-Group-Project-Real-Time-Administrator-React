import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
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
      const response = await axios.post(
        `${BASE_URL}/departments`, 
        formValues, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setDepartments([...departments, response.data]) 
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
