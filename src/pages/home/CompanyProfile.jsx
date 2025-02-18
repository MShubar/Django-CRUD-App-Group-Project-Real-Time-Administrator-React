import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../../servers/config';
function CompanyProfile({user}) {
  const companyId= user._id
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
        });
        
       // console.log("======response=========", response.ok);

        if (!response.ok) {
          throw new Error('Failed to fetch Company details');
        }

        const companyData = await response.json();
        console.log("Fetched Company Data:", companyData);
        setCompany(companyData);
      } catch (error) {
        console.error('Error fetching Company details:', error);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="signup-container">
      <h2>Company Details</h2>
      <p>
        <strong>Name:</strong> {company.name}
      </p>
      <p>
        <strong>Address:</strong> {company.address}
      </p>
      <p>
        <strong>CR Number:</strong> {company.crNumber}
      </p>
      <p>
        <strong>Phone:</strong> {company.phone}
      </p>
      <p>
        <strong>Size:</strong> {company.size}
      </p>
      <p>
        <strong>Logo Image: </strong> 
        <img src={company.logoImage} width="80" hight="60"/>
      </p>
      <p>
        <strong>CR Document:</strong> <a href={`${company.crDocument}`} target='_blank'>View</a>
        
      </p>
      <p>
        <strong>Email:</strong> {company.email}
      </p>
      <div className="d-flex justify-content-between mt-3">
        <Link
          className="btn btn-warning btn-sm"
          to={`/editProfile/update/${company._id}`}
        >
          Update
        </Link>
        <Link
          className="btn btn-danger btn-sm"
          to={`/companies/delete/${company._id}`}
        >
          Delete My Account
        </Link>
      </div>
    </div>
  );
}

export default CompanyProfile
