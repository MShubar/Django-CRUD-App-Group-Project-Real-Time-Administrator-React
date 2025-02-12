import React, { useState } from 'react';
import Employee from '../../components/Employee'
import { NavLink } from 'react-router-dom'
import EmployeeForm from './EmployeeForm'
import EmployeeDetails from './EmployeeDetails'; // Import the new details component

const EmployeeList = ({ employees, user, departments }) => {
  
  
  const [showForm, setShowForm] = useState(false); // State to control the add form visibility
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold the selected employee for details

  const handleAddEmployee = (newEmployee) => {
    console.log("New Employee Added:", newEmployee);
    // Logic to add the new employee
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
  };

  const handleCloseDetails = () => {
    setSelectedEmployee(null); // Close the details view
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Employees List</h1>
        <button className="btn btn-success" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Cancel' : 'New Employee'}
        </button>
      </div>
      {showForm && <EmployeeForm onAdd={handleAddEmployee} user={user} departments={departments}/>}
      
      <section className="employee-list">
        <div className="row gy-3">
          {employees.map((employee) => (
            <div className="col-12" key={employee._id} onClick={() => handleRowClick(employee)}>
              <Employee employee={employee} />
            </div>
          ))}
        </div>
      </section>

      {selectedEmployee && (
        <EmployeeDetails 
          employee={selectedEmployee} 
          onClose={handleCloseDetails} // Pass in the close handler
        />
      )}
    </div>
  );
};

export default EmployeeList;