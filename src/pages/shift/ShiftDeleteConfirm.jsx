import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'

const ShiftDeleteConfirm = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const deleteShift = async () => {
    try {
      const response = await fetch(`${BASE_URL}/shift/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete shift')
      }

      navigate('/shift')
    } catch (error) {
      console.error('Error deleting shift:', error)
    }
  }

  return (
    <div>
      <h2>Are you sure you want to delete this shift?</h2>
      <button onClick={() => navigate('/shifts')} className="btn btn-secondary">
        No
      </button>
      <button onClick={deleteShift} className="btn btn-danger">
        Yes
      </button>
    </div>
  )
}

export default ShiftDeleteConfirm
