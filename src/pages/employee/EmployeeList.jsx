import { useState } from 'react';
import Employee from '../../components/Employee';
import { NavLink } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import EmployeeDetails from './EmployeeDetails';
import { BASE_URL } from '../../servers/config';

const EmployeeList = ({ employees, user, departments, setEmployees }) => {
  //console.log("departments==============",departments);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddEmployee = async (newEmployee) => {
    const token = localStorage.getItem('token'); // Retrieve the token
    try {
      const response = await fetch(`${BASE_URL}/employees/new`, {
        method: 'POST', // Use POST to add a new employee
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify(newEmployee), // Convert the new employee data to JSON
      });
      //console.log('Response body=============:', response);

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      const addedEmployee = await response.json(); // Parse the response to get the added employee
      setEmployees((prevEmployees) => [...prevEmployees, addedEmployee]); // Update the state with the new employee
      console.log('New Employee Added:', addedEmployee);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseDetails = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Employees List</h1>
        <button
          className="btn btn-success"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? 'Cancel' : 'New Employee'}
        </button>
      </div>
      {showForm && <EmployeeForm onAdd={handleAddEmployee} user={user} departments={departments} />}
 
      <section className="employee-list">
        <div className="row gy-3">
          {employees.map((employee) => (
            <div className="col-12" key={employee._id} onClick={() => handleRowClick(employee)}>
              <Employee employee={employee} departments={departments}/>
            </div>
          ))}
        </div>
      </section>

      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default EmployeeList;