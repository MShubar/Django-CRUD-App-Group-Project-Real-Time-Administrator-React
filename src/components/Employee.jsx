import { Link } from 'react-router-dom'

const Employee = ({ employee }) => {
  return (
    <Link
      to={`/employees/${employee._id}`}
      className="text-decoration-none"
    >
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-primary fw-bold mb-0">
              {employee.name}
            </h5><h5 className="card-title text-primary fw-bold mb-0">
              {employee.image}
            </h5>
            <h5 className="card-title text-primary fw-bold mb-0">
              {employee.position}
            </h5>
            <h5 className="card-title text-primary fw-bold mb-0">
              {employee.companyId}
            </h5>
            <h5 className="card-title text-primary fw-bold mb-0">
              {employee.departmentId}
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
