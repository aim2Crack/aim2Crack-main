import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    institute: '',
    profileType: '',
    brandName: '',
    brandLogo: null,
    brandLink: '',
    brandFavicon: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch the profile details from the backend
    fetch('http://127.0.0.1:7000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch profile details:', response.status);
          throw new Error('An error occurred while fetching profile details.');
        }
      })
      .then(jsonData => {
        // Populate the form with the retrieved data
        console.log(jsonData);
        const { firstName, lastName, rollNo, institute, profileType, brandName, brandLink } = jsonData;
        setFormData(prevData => ({
          ...prevData,
          firstName,
          lastName,
          rollNo,
          institute,
          profileType,
          brandName,
          brandLink,
        }));
      })
      .catch(error => {
        console.error('Failed to fetch profile details:', error);
        setMessage('An error occurred while fetching profile details.');
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:7000/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          console.log('User updation request success:', response.status);
          return response.json();
        } else {
          console.error('User updation request failed:', response.status);
          throw new Error('An error occurred during user updation.');
        }
      })
      .then(jsonData => {
        console.log('Response:', jsonData);
        setMessage(jsonData.message);
      })
      .catch(error => {
        console.error('User updation request failed:', error);
        setMessage('An error occurred during user updation.');
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    setFormData(prevData => ({
      ...prevData,
      [name]: file,
    }));
  };

  return (
    <div id="profile">
       
      <div id="block"></div>
      <div id="email">
      <h2>Profile</h2>
        <p className="email1">{formData.email}</p>
      </div>
      <form className="details" onSubmit={handleSubmit}>
        <fieldset className="forms">
          <div className="roll_no">
            <span className="label">First Name:</span>
            <input
              type="text"
              id="f_name"
              name="firstName"
              value={formData.firstName}
              placeholder="FIRST NAME"
              onChange={handleChange}
            />
          </div>
          <div className="last_name">
            <span className="label">Last Name:</span>
            <input
              type="text"
              id="l_name"
              name="lastName"
              value={formData.lastName}
              placeholder="LAST NAME"
              onChange={handleChange}
            />
          </div>
          <div className="roll_no">
            <span className="label">Roll number/Employee Id:</span>
            <input
              type="text"
              id="r_name"
              name="rollNo"
              value={formData.rollNo}
              placeholder="I am Teacher"
              onChange={handleChange}
            />
          </div>
          <div className="roll_no">
            <span className="label">Institute:</span>
            <input
              type="text"
              id="id"
              name="institute"
              value={formData.institute}
              placeholder="NITJ"
              onChange={handleChange}
            />
          </div>
          <div className="roll_no">
            <span className="label">Profile Type:</span>
            <input
              type="text"
              // id="profile_type"
              name="profile"
              value={formData.profileType}
              // placeholder=""
              readOnly
            />
          </div>
          <div className="roll_no">
            <span className="label">Brand Name:</span>
            <input
              type="text"
              id="brand_name"
              name="brandName"
              value={formData.brandName}
              placeholder="Brand Name"
              onChange={handleChange}
            />
          </div>
          <div className="roll_no">
            <span className="label">Brand Logo:</span>
            <input
              type="file"
              id="brand_logo"
              name="brandLogo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="roll_no">
            <span className="label">Brand Link:</span>
            <input
              type="text"
              id="brand_link"
              name="brandLink"
              value={formData.brandLink}
              placeholder="Brand Link"
              onChange={handleChange}
            />
          </div>
          <div className="roll_no">
            <span className="label">Brand Favicon:</span>
            <input
              type="file"
              id="brand_favicon"
              name="brandFavicon"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </fieldset>
        <div className="change_password">
          <a className="password" href="/forgot-password">
            Change Password
          </a>
        </div>
      {message && <p>{message}</p>}
        
        <div id="button">
          <button className="submit" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
