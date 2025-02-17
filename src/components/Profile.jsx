import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../servers/config'
import '../styles/components/Profile.css'
import { Link } from 'react-router-dom'
function Profile() {
  const [company, setCompany] = useState()

  useEffect(() => {
    const fetchCompanies = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`${BASE_URL}/companies/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch companies')
        }

        const data = await response.json()
        setCompany(data)
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }

    fetchCompanies()
  }, [])

  return (
    <div class="dropdown">
      <img
        className="ProfilePicture"
        src={company?.logoImage}
        alt="logoImage"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
      <div className="dropdown-content">
        <Link to="/editProfile">Edit</Link>
      </div>
    </div>
  )
}

export default Profile
