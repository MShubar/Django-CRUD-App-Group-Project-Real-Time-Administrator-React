import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../servers/config';

const DepartmentUpdateForm = ({ departments, setDepartments }) => {
    const { id } = useParams(); 
    const navigate = useNavigate();
  
    const department = departments.find((dept) => dept._id === id);
  
    if (!department) {
      return <p>No Department Found</p>;
    }
  
    const [formValues, setFormValues] = useState({
      name: department.name,
      description: department.description,
    });
  
    const handleChange = (event) => {
      setFormValues({ ...formValues, [event.target.id]: event.target.value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');
  
      try {
        const response = await fetch(`${BASE_URL}/department/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formValues),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update department');
        }
  
        const updatedDepartment = await response.json();
        setDepartments(
          departments.map((dept) => (dept._id === id ? updatedDepartment : dept))
        );
  
        navigate(`/departments/${id}`);
      } catch (error) {
        console.error('Error updating department:', error);
      }
    };
  
    return (
      <div>
        <h1>Update Department</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Department Name:</label>
          <input
            type="text"
            id="name"
            value={formValues.name}
            onChange={handleChange}
          />
          <br />
  
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={formValues.description}
            onChange={handleChange}
          />
          <br />
  
          <button type="submit">Submit Update</button>
        </form>
      </div>
    );
  };
  