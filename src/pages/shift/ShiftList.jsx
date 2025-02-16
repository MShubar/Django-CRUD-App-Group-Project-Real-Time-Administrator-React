import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../servers/config'; 

const ShiftList = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/shift`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch shifts');
        }

        const data = await response.json();
        setShifts(data);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  return (
    <div>
      <h1>Shifts List</h1>
      <div className="shift-list">
        <Link to="/newshift" className="btn btn-primary mb-2">
          Create New Shift
        </Link>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift._id}>
                  <td>{shift.name}</td>
                  <td>{shift.startTime}</td>
                  <td>{shift.endTime}</td>
                  <td>
                    <Link to={`/shift/${shift._id}`} className="btn btn-info btn-sm mr-2">
                      View Details
                    </Link>

                    {/* <Link to={`/updateshift/${shift._id}`} className="btn btn-warning btn-sm">
                      Edit
                    </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ShiftList;
