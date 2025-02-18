import { useState } from 'react'
import { BASE_URL } from '../../servers/config'
import '../../styles/auth/Signin.css'
import { useNavigate } from 'react-router-dom'

const initialFormData = {
  email: '',
  password: ''
}

function Signin({ handleLogin, setUser }) {
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${BASE_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      setUser(data.user)
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.user._id)
      handleLogin()
      navigate('/dashboard')
      setFormData(initialFormData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="SigninForm">
        <div className="SigninBorders">
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>}
          <form className="formClass" onSubmit={handleSubmit}>
            <div className="input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <button className="SigninButton" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <div className="text">
          <p>
            Real-time administrator schedule system helps streamline shift
            <br />
            <br />
            management, boosts operational efficiency, and enhances employee
            <br />
            <br />
            satisfaction by providing a clear, up-to-date view of work
            schedules.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin
