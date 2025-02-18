import { useState } from 'react'
import { BASE_URL } from '../../servers/config'
import '../../styles/auth/Signup.css'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    crNumber: '',
    phone: '',
    size: '',
    logoImage: null,
    crDocument: null,
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (
      !formData.name ||
      !formData.address ||
      !formData.crNumber ||
      !formData.phone ||
      !formData.size ||
      !formData.logoImage ||
      !formData.crDocument ||
      !formData.email ||
      !formData.password
    ) {
      setError('All fields are required!')
      setLoading(false)
      return
    }

    const formDataToSend = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key])
    })

    try {
      const response = await fetch(`${BASE_URL}/companies/signup`, {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()

      if (response.ok) {
        navigate('/signin')
      } else {
        setError(data.error || 'Signup failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again later.')
    }

    setLoading(false)
  }

  return (
    <div className="SignupPage">
      <div className="SignupForm">
        <div className="SignupBorders">
          <h2>Signup</h2>
          {error && <p className="error-message">{error}</p>}
          <form className="SignupFormClass" onSubmit={handleSubmit}>
            <div className="SignupInput">
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="SignupInput">
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                required
              />
            </div>
            <div className="SignupInput">
              <input
                type="text"
                name="crNumber"
                placeholder="CR Number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="SignupInput">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
              />
            </div>
            <div className="SignupInput">
              <input
                type="text"
                name="size"
                placeholder="Company Size"
                onChange={handleChange}
                required
              />
            </div>
            <div className="SignupInput">
              <label>Upload Logo:</label>
              <input
                type="file"
                name="logoImage"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="SignupInput">
              <label>Upload CR Document:</label>
              <input
                type="file"
                name="crDocument"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="SignupInput">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="SignupInput">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Signup'}
            </button>
          </form>
        </div>
        <div className="SignupText">
          <p>
            platform that allows administrators to manage and oversee employee{' '}
            <br />
            <br />
            schedules in real-time. It provides up-to-the-minute updates, giving
            <br />
            <br />
            administrators full visibility and control over the scheduling
            <br />
            <br />
            process. This type of system is particularly useful for businesses
            <br />
            <br />
            that require constant adjustments, such as in healthcare, retail,
            <br />
            <br />
            and hospitality.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
