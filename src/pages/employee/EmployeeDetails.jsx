import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../../servers/config';

const EmployeeDetails = ({ departments }) => {
  const { employeeId } = useParams(); // Get the employee ID from the URL
  //console.log("=========employeeId=======>", employeeId);
  
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/employees/${employeeId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token if needed
          }
        });
        
        console.log("======response=========", response.ok);

        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }

        const employeeData = await response.json();
        console.log("Fetched Employee Data:", employeeData);
        setEmployee(employeeData);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [employeeId]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="signup-container">
      <h2>Employee Details</h2>
      <p>
        <strong>Name:</strong> {employee.name}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
      <p>
        <strong>Department:</strong>
        {departments.find(department => department._id === employee.departmentId[0])?.name || 'Department Not Found'}
      </p>
      <p>
        <strong>Status:</strong> {employee.status}
      </p>
      <button onClick={() => window.history.back()}>Back</button>
      <div className="d-flex justify-content-between mt-3">
        <Link
          className="btn btn-warning btn-sm"
          to={`/employees/update/${employee._id}`}
        >
          Update
        </Link>
        <Link
          className="btn btn-danger btn-sm"
          to={`/employees/delete/${employee._id}`}
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;