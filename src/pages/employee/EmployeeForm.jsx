// AddEmployeeForm.jsx
import { useState } from 'react'

const EmployeeForm = ({ onAdd , user, departments}) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [status, setStatus] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()
    const newEmployee = { name, position, companyId, departmentId, status }
    onAdd(newEmployee)
    setName('');
    setPosition('');
    setCompanyId(user._id);
    setDepartmentId('');
    setStatus('');
  };

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
      
      <select
              id="departmentId"
              name="departmentId"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={(e) => setName(e.target.value)}
              
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name} {/* Adjust the display value as needed */}
                </option>
              ))}
            </select>
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

export default EmployeeForm;