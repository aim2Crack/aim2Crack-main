import React, { useState } from 'react';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    profileType: '',
    rollNo: null,
    institute: '',
    brandName: 'none',
    brandLogo: '',
    brandLink: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:7000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          // Request was successful
          console.log('User created successfully!');
        } else {
          // Request failed
          throw new Error('User creation failed.');
        }
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="profileType">Profile Type:</label>
        <select
          id="profileType"
          name="profileType"
          value={formData.profileType}
          onChange={handleInputChange}
        >
          <option value="">Select profile type</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
      </div>
      <div>
        <label htmlFor="rollNo">Roll No:</label>
        <input
          type="text"
          id="rollNo"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="institute">Institute:</label>
        <input
          type="text"
          id="institute"
          name="institute"
          value={formData.institute}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="brandLogo">Brand Logo:</label>
        <input
          type="text"
          id="brandLogo"
          name="brandLogo"
          value={formData.brandLogo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="brandLink">Brand Link:</label>
        <input
          type="text"
          id="brandLink"
          name="brandLink"
          value={formData.brandLink}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
