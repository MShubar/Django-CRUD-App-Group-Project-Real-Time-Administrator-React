import { useState } from 'react'
import { BASE_URL } from '../../servers/config'
import { useNavigate } from 'react-router-dom';

const EmployeeForm = ({ user, departments, employees, setEmployees , setShowForm}) => {
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

    // Check if formData is populated correctly
    console.log('Current formData:', formData)

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('position', formData.position)
    formDataToSend.append('image', formData.image)
    formDataToSend.append('companyId', user._id)
    formDataToSend.append('departmentId', formData.departmentId)
    formDataToSend.append('status', formData.status)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('password', formData.password)

    // Log FormData contents

    //console.log('Submitting new employee:==========>>');

    formDataToSend.forEach((value, key) => {
      console.log(key, value)
    })

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
      setShowForm((prev) => !prev)
     console.log('New Employee Added:', data)
      navigate("/employees");
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
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Add New Employee</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name} // Bind value
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position} // Bind value
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
          id="departmentId"
          name="departmentId"
          className="form-control border border-success rounded-3 shadow-sm"
          value={formData.departmentId} // Bind value
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
          id="status"
          name="status"
          className="form-control border border-success rounded-3 shadow-sm"
          value={formData.status} // Bind value
          onChange={handleChange}
          required
        >
          <option value="">Select a Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Blocked">Blocked</option>
        </select>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email} // Bind value
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password} // Bind value
          onChange={handleChange}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  )
}

export default EmployeeForm
