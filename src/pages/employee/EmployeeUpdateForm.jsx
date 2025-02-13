
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../servers/config';

const EmployeeUpdateForm = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // Use navigate to redirect after update

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/employees/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token if needed
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }

        const employeeData = await response.json();
        setEmployee(employeeData);
        // Set initial state with employee data
        setName(employeeData.name);
        setPosition(employeeData.position);
        setCompanyId(employeeData.companyId);
        setDepartmentId(employeeData.departmentId);
        setStatus(employeeData.status);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = { name, position, companyId, departmentId, status };
    
    try {
      const response = await fetch(`${BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token if needed
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      // Optionally navigate back to the details page after successful update
      navigate(`/employees/${id}`);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="signup-container">
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state on change
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)} // Update state on change
          required
        />
        <input
          type="text"
          placeholder="Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)} // Update state on change
          required
        />
        <input
          type="text"
          placeholder="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)} // Update state on change
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)} // Update state on change
          required
        />

        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-warning btn-sm">Update</button>
          <button type="button" onClick={() => window.history.back()}>Back</button> 
        </div>
      </form>
    </div>
  );
};

export default EmployeeUpdateForm
