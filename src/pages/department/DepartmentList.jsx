import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../servers/config';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${BASE_URL}/department`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }

        const departmentData = await response.json();
        setDepartments(departmentData);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div>
      <h2>Departments List</h2>
      <Link to="/newdepartment">Create New Department</Link>
      <div className="department-list">
        {departments.map((department) => (
          <Link key={department._id} to={`/departments/${department._id}`}>
          <div className="department-item">
            <h5>{department.name}</h5>
            <p>{department.description}</p>
          </div>
        </Link>        
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
