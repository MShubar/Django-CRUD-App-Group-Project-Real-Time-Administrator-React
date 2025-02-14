// AddEmployeeForm.jsx
import { useState } from 'react'

const EmployeeForm = ({ onAdd , user, departments}) => {
  //console.log("departments=============>>",departments);
  
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEmployee = { name, position, companyId:user._id, departmentId, status ,email,password}
    console.log('Submitting new employee:', newEmployee);
    onAdd(newEmployee)
    setName('');
    setPosition('');
    setCompanyId("");
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
          onChange={(e) => setDepartmentId(e.target.value)}
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
              value={status}
        onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select a Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
      </select>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /> 
      <button type="submit">Add Employee</button>
    </form>
    </div>
  )
}

export default EmployeeForm;