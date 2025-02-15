import { Link } from 'react-router-dom';

const Employee = ({ employee, departments }) => {
  // Find the department object based on departmentId
  const department = departments.find(dept => dept._id === employee.departmentId[0]);
  const departmentName = department ? department.name : 'Unknown Department';

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
              {departmentName} {/* Display the department name */}
            </h5>
            <h5 className="card-title text-primary fw-bold mb-0">
              {employee.status}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Employee;