import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'

const ShiftDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shift, setShift] = useState(null)

  useEffect(() => {
    const fetchShiftDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/shift/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch shift details')
        }

        const data = await response.json()
        setShift(data)
      } catch (error) {
        console.error('Error fetching shift details:', error)
      }
    }

    fetchShiftDetails()
  }, [id])

  //   return (
  //     <div>
  //       {shift ? (
  //         <>
  //           <h1>Shift Details</h1>
  //           <h3>{shift.name}</h3>
  //           <p><strong>Start Time:</strong> {shift.startTime}</p>
  //           <p><strong>End Time:</strong> {shift.endTime}</p>

  //           <button onClick={() => navigate(`/updateshift/${shift._id}`)} className="btn btn-primary btn-sm mb-2">
  //             Edit
  //           </button>

  //           <button onClick={() => navigate(`/deleteshift/${shift._id}`)} className="btn btn-danger btn-sm mb-2">
  //             Delete
  //           </button>

  //           <button onClick={() => navigate('/shift')} className="btn btn-secondary btn-sm mb-2">
  //             Back to List
  //           </button>
  //         </>
  //       ) : (
  //         <h2>Loading...</h2>
  //       )}
  //     </div>
  //   );
  // };

  // export default ShiftDetails;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-3">
          {shift ? (
            <>
              <h2 className="text-center mb-4">Shift Details</h2>
              <div className="card p-4">
                <h3 className="card-title">{shift.name}</h3>
                <p>
                  <strong>Start Time:</strong> {shift.startTime}
                </p>
                <p>
                  <strong>End Time:</strong> {shift.endTime}
                </p>

                <div className="d-flex justify-content-between mt-3">
                  <button
                    onClick={() => navigate(`/updateshift/${shift._id}`)}
                    className="btn btn-warning btn-sm"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => navigate(`/deleteshift/${shift._id}`)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => navigate('/shift')}
                    className="btn btn-secondary btn-sm"
                  >
                    Back to List
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShiftDetails
