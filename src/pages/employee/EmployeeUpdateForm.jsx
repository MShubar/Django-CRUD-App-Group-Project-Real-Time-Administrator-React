// EmployeeUpdateForm.jsx
import { useState, useEffect } from 'react'

const EmployeeUpdateForm = ({ employee, onUpdate, onCancel }) => {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (employee) {
      setName(employee.name)
      setPosition(employee.position)
      setCompanyId(employee.companyId)
      setDepartmentId(employee.departmentId)
      setStatus(employee.status)
    }
  }, [employee])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedEmployee = { name, position, companyId, departmentId, status }
    onUpdate(updatedEmployee)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Employee</h2>
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
      <button type="submit">Update Employee</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

export default EmployeeUpdateForm
