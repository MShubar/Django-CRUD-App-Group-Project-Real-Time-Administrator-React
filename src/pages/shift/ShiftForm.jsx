import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'

const ShiftForm = ({ shift, setShifts }) => {
  const navigate = useNavigate()
  const [name, setName] = useState(shift ? shift.name : '')
  const [startTime, setStartTime] = useState(shift ? shift.startTime : '')
  const [endTime, setEndTime] = useState(shift ? shift.endTime : '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const method = shift ? 'PUT' : 'POST'
    const url = shift ? `${BASE_URL}/shift/${shift._id}` : `${BASE_URL}/shift`

    const newShift = { name, startTime, endTime }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newShift)
      })

      if (!response.ok) {
        throw new Error('Failed to save shift')
      }

      const data = await response.json()

      if (shift) {
        setShifts((prevShifts) =>
          prevShifts.map((s) => (s._id === data._id ? data : s))
        )
      } else {
        setShifts((prevShifts) => [...prevShifts, data])
      }

      navigate('/shift')
    } catch (error) {
      console.error('Error saving shift:', error)
    }
  }
  return (
    <div className="page">
      <div className="SigninForm">
        <div className="SigninBorders">
          <h2 className="text-center">
            {shift ? 'Edit Shift' : 'Create Shift'}
          </h2>
          <form onSubmit={handleSubmit} className="form-group">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Shift Name
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                End Time
              </label>
              <input
                id="endTime"
                type="time"
                className="form-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="createButton"
              style={{ width: '100%' }}
            >
              {shift ? 'Update Shift' : 'Create Shift'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShiftForm
