import { Link } from 'react-router-dom'

const Department = ({ department }) => {
  return (
    <Link
      to={`/departmentlist/${department._id}`}
      className="text-decoration-none"
    >
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary fw-bold mb-0">
            {department.name}
          </h5>
        </div>
      </div>
    </Link>
  )
}

export default Department
