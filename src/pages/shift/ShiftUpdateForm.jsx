import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'

const ShiftUpdateForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shift, setShift] = useState(null)

  useEffect(() => {
    const fetchShift = async () => {
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

    fetchShift()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/shift/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: shift.name,
          startTime: shift.startTime,
          endTime: shift.endTime
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update shift')
      }

      const updatedShift = await response.json()
      navigate(`/shift/${updatedShift._id}`)
    } catch (error) {
      console.error('Error updating shift:', error)
    }
  }

  if (!shift) return <h2>Loading...</h2>

  return (
    <div className="signup-container">
      <h1>Edit Shift</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            value={shift.name}
            onChange={(e) => setShift({ ...shift, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Start Time</label>
          <input
            type="time"
            value={shift.startTime}
            onChange={(e) => setShift({ ...shift, startTime: e.target.value })}
            required
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="time"
            value={shift.endTime}
            onChange={(e) => setShift({ ...shift, endTime: e.target.value })}
            required
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
        <button type="submit" className="btn btn-primary">
          Update Shift
        </button>
        <button onClick={() => navigate(`/shift/${id}`)}>Back</button>
      </div>
      
      </form>
    </div>
  )
}

export default ShiftUpdateForm
