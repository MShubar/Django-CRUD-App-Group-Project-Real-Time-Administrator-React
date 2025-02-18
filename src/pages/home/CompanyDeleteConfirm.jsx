import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../servers/config'
import { useState } from 'react'
const CompanyDeleteConfirm = () => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [companies, setCompanies] = useState()
  const deleteCompany = async () => {
    console.log('Delete button clicked')
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${BASE_URL}/companies/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        throw new Error('Failed to delete company')
      }

      const updatedCompanies = companies.filter((company) => company._id !== id)
      setCompanies(updatedCompanies)

      navigate('/dashboard')
    } catch (error) {
      console.error('Error deleting department:', error)
    }
  }

  return (
    <div className="signup-container">
      <h2>
        Are you sure you want to delete this company?
        <br />
        <font color="red" size="5">
          <b>
            Deleting this department will also delete all employees associated
            with it.
          </b>
        </font>
      </h2>

      <button onClick={() => navigate('/dashboard')}>No</button>
      <button onClick={deleteCompany}>Yes</button>
    </div>
  )
}

export default CompanyDeleteConfirm
