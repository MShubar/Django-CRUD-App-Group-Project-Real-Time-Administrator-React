import { useState, useEffect } from 'react';
import { BASE_URL } from '../../servers/config';
import { useParams, useNavigate } from 'react-router-dom';
const EmployeeUpdateForm = ({ user, departments, setEmployees }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    departmentId: '',
    status: '',
    image: null,
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if formData is populated correctly
    console.log('Current formData:', formData);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('position', formData.position);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('companyId', user._id);
    formDataToSend.append('departmentId', formData.departmentId);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);

    // Log FormData contents
    //console.log('Submitting new employee:==========>>');
    formDataToSend.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await fetch(`${BASE_URL}/employees/${id}`, {
        method: 'PUT',
        body: formDataToSend,
    });
        if (!response.ok) {
          throw new Error('Failed to update employee');
        }
        const updatedEmployeeData = await response.json(); // Get the updated data from the response
        // Update the employees state
        setEmployees(prevEmployees => [...prevEmployees, updatedEmployeeData]);
        console.log('Updated Employee :', updatedEmployeeData);
        
        navigate(`/employees/${id}`);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  useEffect(() => {
        const fetchEmployeeDetails = async () => {
          try {
            const response = await fetch(`${BASE_URL}/employees/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch employee details');
            }
    
            const employeeData = await response.json();
            setFormData(employeeData);
            
            // Do not set password initially for security reasons
          } catch (error) {
            console.error('Error fetching employee details:', error);
          }
        };
    
        fetchEmployeeDetails();
      }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Edit Employee</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name} // Bind value
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position} // Bind value
          onChange={handleChange}
          required
        />
        <label>Profile Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          
        />
        <select
          id="departmentId"
          name="departmentId"
          className="form-control border border-success rounded-3 shadow-sm"
          value={formData.departmentId} // Bind value
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map(department => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
        <select
          id="status"
          name="status"
          className="form-control border border-success rounded-3 shadow-sm"
          value={formData.status} // Bind value
          onChange={handleChange}
          required
        >
          <option value="">Select a Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Blocked">Blocked</option>
        </select>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email} // Bind value
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password} // Bind value
          onChange={handleChange}
          required
        />
        <div className="d-flex justify-content-between mt-3">

           <button type="submit" className="btn btn-warning btn-sm">Update</button>
          <button type="button" onClick={() => window.history.back()}>Back</button>
        </div>
      </form>
    </div>
  )
}
export default EmployeeUpdateForm

