import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../servers/config';

const DeleteEmployee = ({ employees, setemployees }) => {
  let navigate = useNavigate()
  const { id } = useParams()

  const deleteEmployee = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
  
      // Update the employee list in the state
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== id
      );
      setemployees(updatedEmployees); // Update the state with the new employee list
  
      // Navigate back to the employees list
      navigate('/employees/');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  return (
    <div>
      <h1>Are you sure you want to delete this transaction?</h1>
      <button onClick={() => navigate(`/employees/${id}`)}>No</button>
      <button onClick={deleteEmployee}>Yes</button>
    </div>
  )
}

export default DeleteEmployee
