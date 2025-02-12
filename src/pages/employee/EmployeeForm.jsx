// AddEmployeeForm.jsx
import { useState } from 'react'

const AddEmployeeForm = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEmployee = { name, position, companyId, departmentId, status }
    onAdd(newEmployee)
    // Clear the form
    setName('')
    setPosition('')
    setCompanyId('')
    setDepartmentId('')
    setStatus('')
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Add New Employee</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  )
}

export default AddEmployeeForm
