import { useState, useEffect  } from 'react'
import { BASE_URL } from '../../servers/config'
import '../../styles/auth/Signup.css' // Import the CSS file
import { useNavigate, useParams } from 'react-router-dom'
function CompanyUpdateForm({user}) {
  const companyId= user._id
  const [company, setCompany] = useState({
    name: '',
    address: '',
    crNumber: '',
    phone: '',
    size: '',
    logoImage: null,
    crDocument: null,
    email: '',
    password: ''})
  const { id } = useParams();
  //console.log("========id=====>>",id);
  
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCompany((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setCompany((prev) => ({ ...prev, [name]: files[0] })) // Store the file object
  }
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/companies/${companyId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token if needed
          }
        });
        
       // console.log("======response=========", response.ok);

        if (!response.ok) {
          throw new Error('Failed to fetch Company details');
        }

        const companyData = await response.json();
        //console.log("Fetched Company Data:", companyData);
        setCompany(companyData);
      } catch (error) {
        console.error('Error fetching Company details:', error);
      }
    };

    fetchCompanyDetails();
        }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('name', company.name)
    formDataToSend.append('address', company.address)
    formDataToSend.append('crNumber', company.crNumber)
    formDataToSend.append('phone', company.phone)
    formDataToSend.append('size', company.size)
    formDataToSend.append('logoImage', company.logoImage) // Append file
    formDataToSend.append('crDocument', company.crDocument) // Append file
    formDataToSend.append('email', company.email)
    formDataToSend.append('password', company.password)
// Log FormData contents
    console.log('Submitting new Company Data:==========>>');
    formDataToSend.forEach((value, key) => {
      console.log(key, value);
    });

    const response = await fetch(`${BASE_URL}/companies/${id}`, {
      method: 'PUT',
      body: formDataToSend 
    })
console.log("=======response=======>",response);

    const data = await response.json()
    if (response.ok) {
      navigate('/editProfile')
    } else {
      alert(`Failed Updating Company Info: ${data.error}`)
    }
  }

  return (
    <div className="signup-container">
      <h2>Edit Company Profile</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          value={company.name}
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          value={company.address}
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="crNumber"
          value={company.crNumber}
          placeholder="CR Number"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          value={company.phone}
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="size"
          value={company.size}
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
          
        />

        <label>Upload CR Document:</label>
        <input
          type="file"
          name="crDocument"
          accept=".pdf,.jpg,.png"
          onChange={handleFileChange}
          
        />

        <input
          type="email"
          name="email"
          value={company.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={company.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default CompanyUpdateForm
