import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../servers/config'
import '../styles/components/Profile.css'
import { Link } from 'react-router-dom'
function Profile({ user }) {
  const companyId = user._id
  const [company, setCompany] = useState([])
  //console.log("=========companyIdddddddd=======>", companyId);
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/companies/${companyId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token if needed
          }
        })

        // console.log("======response=========", response.ok);

        if (!response.ok) {
          throw new Error('Failed to fetch Company details')
        }

        const companyData = await response.json()
        console.log('Fetched Company Data:', companyData)
        setCompany(companyData)
      } catch (error) {
        console.error('Error fetching Company details:', error)
      }
    }

    fetchCompanyDetails()
  }, [companyId])

  return (
    <div className="dropdown">
      <img
        className="ProfilePicture"
        src={company?.logoImage}
        alt="logoImage"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
      <div className="dropdown-content">
        <Link className="MyProfile" to="/editProfile">
          My Profile
        </Link>
      </div>
    </div>
  )
}

export default Profile
