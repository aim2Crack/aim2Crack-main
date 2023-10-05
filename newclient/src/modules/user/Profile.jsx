import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Profile = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    institute: '',
    profileType: '',
    brandName: '',
    brandLogo: '',
    brandLink: '',
    brandFavicon: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
console.log(token);
    // Fetch the profile details from the backend
    fetch('https://a2cbackend.onrender.com/api/users/signup', {
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
        console.log(jsonData.user.firstName);
        const { firstName, lastName, rollNo, institute, profileType, brandName, brandLink,brandLogo,brandFavicon } = jsonData.user;
        setFormData(prevData => ({
          ...prevData,
          firstName,
          lastName,
          rollNo,
          institute,
          profileType,
          brandName,
          brandLink,
          brandLogo,
          brandFavicon,
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
    fetch('https://a2cbackend.onrender.com/api/users/signup', {
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

  const handleDeleteBrandLogo = () => {
    // Clear the brandLogo field in the formData state
    setFormData((prevData) => ({
      ...prevData,
      brandLogo: '',
    }));
  };
  


  const handleImageUpload = async (file, fieldName) => {
    const formData = new FormData();
    formData.append('file', file); // Use 'file' as the field name
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://a2cbackend.onrender.com/api/users/uploadbrand', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setFormData(prevData => ({
          ...prevData,
          [fieldName]: jsonData.newpath, // Use 'path' instead of 'imageUrl'
        }));
        console.log(jsonData.newpath);
        // document.getElementById(fieldName).value = '';
      } else {
        console.error('Image upload failed:', response.status);
        // throw new Error('An error occurred while uploading the image.');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setMessage('An error occurred while uploading the image.');
    }
  };
  

  
  return (
    <div id="profile">
       
      {/* <div id="block"></div> */}
      <div id="email">
        <h2>Profile</h2>
          <p className="email1">{formData.email}</p>
      </div>

      <form className="details" onSubmit={handleSubmit}>
      <Tabs>
        <TabList>
          <Tab>General Info</Tab>
          {formData.profileType === 'faculty' && <Tab>Branding</Tab>}
        </TabList>
        <TabPanel>
      
        <fieldset className="forms">
          <div className="first_name">
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
              id="profile_type"
              name="profile"
              value={formData.profileType}
              // placeholder=""
              readOnly
            />
          </div>
          </fieldset>
          </TabPanel>
          <TabPanel>
          {formData.profileType === 'faculty' && (
        <fieldset className="forms">
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
              value=''
              onChange={(event) => handleImageUpload(event.target.files[0], 'brandLogo')}
            />
             </div>
            {formData.brandLogo && (
              <div>
              <img src={formData.brandLogo} alt="Brand Logo" />
              <p></p>
              <button onClick={() => handleDeleteBrandLogo()}>Delete Brand Logo</button>
              <p></p>
              </div>
            )}
         
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
              onChange={(event) => handleImageUpload(event.target.files[0], 'brandFavicon')}
            />
          </div>
          {formData.brandFavicon && (
              <div>
              <img src={formData.brandFavicon} alt="Brand favicon" />
              <p></p>
              <button onClick={() => handleDeleteBrandLogo()}>Delete Brand Favicon</button>
              
              </div>
            )}

        </fieldset>
          )}
          </TabPanel>
  </Tabs>
        <div className="change_password">
          <a className="password" href="/forgot-password">
            Change Password
          </a>
        </div>
      {message && <p>{message}</p>}
        
        <div id="button_save">
          <button className="submit" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
