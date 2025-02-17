import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'

const DepartmentDeleteConfirm = ({ departments, setDepartments }) => {
  let navigate = useNavigate()
  const { id } = useParams()

  const deleteDepartment = async () => {
    console.log('Delete button clicked');
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${BASE_URL}/department/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete department')
      }

      const updatedDepartments = departments.filter(
        (department) => department._id !== id
      )
      setDepartments(updatedDepartments)

      navigate('/departmentlist')
    } catch (error) {
      console.error('Error deleting department:', error)
    }
  }

  return (
    <div>
      <h2>
        Are you sure you want to delete this department?
        <br />
        <font color="red" size="5">
          <b>Deleting this department will also delete all employees associated with it.</b>
        </font>
      </h2>

      <button onClick={() => navigate('/departmentlist')}>No</button>
      <button onClick={deleteDepartment}>Yes</button>
    </div>
  )
}

export default DepartmentDeleteConfirm
