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
    <div className="page">
      <div className="SigninForm">
        <div className="SigninBorders">
          <form onSubmit={handleSubmit} className="SignupFormClass">
            <h2>Add New Employee</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Position
              </label>
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="SignupUpload">
              <label>Profile Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="mb-3">
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
            </div>
            <div className="mb-3">
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
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeForm
