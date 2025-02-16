import { useState } from 'react'
import { BASE_URL } from '../../servers/config'
import '../../styles/auth/Signup.css' // Import the CSS file
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
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] })) // Store the file object
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('address', formData.address)
    formDataToSend.append('crNumber', formData.crNumber)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('size', formData.size)
    formDataToSend.append('logoImage', formData.logoImage) // Append file
    formDataToSend.append('crDocument', formData.crDocument) // Append file
    formDataToSend.append('email', formData.email)
    formDataToSend.append('password', formData.password)

    const response = await fetch(`${BASE_URL}/companies/signup`, {
      method: 'POST',
      body: formDataToSend // No need for headers (browser sets automatically for FormData)
    })

    const data = await response.json()
    if (response.ok) {
      navigate('/signin')
    } else {
      alert(`Signup failed: ${data.error}`)
    }
  }

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="crNumber"
          placeholder="CR Number"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="size"
          placeholder="Company Size"
          onChange={handleChange}
          required
        />

        <label>Upload Logo:</label>
        <input
          type="file"
          name="logoImage"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <label>Upload CR Document:</label>
        <input
          type="file"
          name="crDocument"
          accept=".pdf,.jpg,.png"
          onChange={handleFileChange}
          required
        />

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
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
