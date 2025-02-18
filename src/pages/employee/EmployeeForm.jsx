import { useState } from 'react'
import { BASE_URL } from '../../servers/config'
import { useNavigate } from 'react-router-dom'

const EmployeeForm = ({
  user,
  departments,
  employees,
  setEmployees,
  setShowForm
}) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    departmentId: '',
    status: '',
    image: null,
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('position', formData.position)
    formDataToSend.append('image', formData.image)
    formDataToSend.append('companyId', user._id)
    formDataToSend.append('departmentId', formData.departmentId)
    formDataToSend.append('status', formData.status)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('password', formData.password)

    try {
      const response = await fetch(`${BASE_URL}/employees/new`, {
        method: 'POST',
        body: formDataToSend
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Failed to add employee: ${data.error}`)
      }

      setEmployees([...employees, data.employee])
      setShowForm(false)
      navigate('/employees')
    } catch (error) {
      console.error('Error adding employee:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] }))
  }

  return (
    <div className="SignupPage">
      <div className="SignupForm">
        <div className="SignupBorders">
          <form onSubmit={handleSubmit} className="SignupFormClass">
            <h2>Add New Employee</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              required
            />
            <label>Profile Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
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
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select a Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeForm
