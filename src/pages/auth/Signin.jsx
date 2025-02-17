import { useState } from 'react'
import { BASE_URL } from '../../servers/config'
import '../../styles/auth/Signup.css'
import { useNavigate } from 'react-router-dom'

const initialFormData = {
  email: '',
  password: ''
}
function Signin({ handleLogin, setUser }) {
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = {
      email: formData.email,
      password: formData.password
    }
    try {
      const response = await fetch(`${BASE_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataToSend)
      }).then((response) => response.json())
      setUser(response.user)
      const token = response.token
      localStorage.setItem('token', token)
      localStorage.setItem('userId', response.user._id)
      handleLogin()
      navigate('/dashboard')
      setFormData(initialFormData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Signin
