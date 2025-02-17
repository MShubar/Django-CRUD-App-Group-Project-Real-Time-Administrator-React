import { Link } from 'react-router-dom'

const Employee = ({ employee, departments }) => {
  // Find the department object based on departmentId
  const department = departments.find(
    (dept) => dept._id === employee.departmentId
  )
  const getAllEmployees = async () => {
      const token = localStorage.getItem('token')
      //console.log("Token:", token);
      if (token) {
        try {
          const response = await fetch(`${BASE_URL}/employees`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          const data = await response.json()
  
          if (!response.ok) {
            console.error('Error fetching employees:', data.message) // Log any error messages
            if (response.status === 401) {
              console.error('Unauthorized access, redirecting to sign-in')
            }
            return
          }
          setEmployees(data) // Set the employees state
        } catch (error) {
          console.error('Error fetching employees:', error)
        }
      }
    }
  return (
    <Link to={`/employees/${employee._id}`} className="text-decoration-none">
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-primary fw-bold mb-0">
              {employee.name}
            </h5>
            <h5 className="card-title text-primary fw-bold mb-0">
             <img src={`${employee.image}`} width="80" hight="60"/>
            </h5>
            <h5 className="card-title text-primary fw-bold mb-0">
              {employee.position}
            </h5>
           
            <h5 className="card-title text-primary fw-bold mb-0">
              {employee.status}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Employee
