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

// return (
//   <div className="container my-4">
//     <div className="d-flex justify-content-between align-items-center mb-4">
//       <h1 className="text-primary">Shifts List</h1>
//       <Link to="/newshift" className="btn btn-success">
//         Create New Shift
//       </Link>
//     </div>

//     {loading ? (
//       <p>Loading...</p>
//     ) : (
//       <div className="row gy-3">
//         {shifts.map((shift) => (
//           <div className="col-12" key={shift._id}>
//             <div className="card p-3">
//               <div className="card-body">
//                 <h5 className="card-title">{shift.name}</h5>
//                 <p className="card-text">
//                   <strong>Start Time:</strong> {shift.startTime}
//                 </p>
//                 <p className="card-text">
//                   <strong>End Time:</strong> {shift.endTime}
//                 </p>
//                 <div className="d-flex justify-content-between">
//                   <Link
//                     to={`/shift/${shift._id}`}
//                     className="btn btn-info btn-sm"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );
// };

// export default ShiftList;