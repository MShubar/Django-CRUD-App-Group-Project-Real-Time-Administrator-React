import { useState } from 'react'
import { BASE_URL } from '../../servers/config'
import '../../styles/auth/Signup.css' // Import the CSS file

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSend = {
      name: formData.name,
      address: formData.address,
      crNumber: formData.crNumber,
      phone: formData.phone,
      size: formData.size,
      logoImage: 'sample-logo-url',
      crDocument: 'sample-document-url',
      email: formData.email,
      password: formData.password
    }

    const response = await fetch(`${BASE_URL}/companies/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataToSend)
    })

    const data = await response.json()
    if (response.ok) {
      alert('Signup successful!')
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
        <input type="text" name="logoImage" onChange={handleChange} required />
        <label>Upload CR Document:</label>
        <input type="text" name="crDocument" onChange={handleChange} required />
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
