import { useState } from 'react';
// import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const UserRegister = () => {
  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_Password:'',
    profileType: '',
    rollNo: '',
    institute: '',
    brandName: 'none',
    brandLogo: '',
    brandLink: ''
  };
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false); // Add this line to define the `submitted` state variable

  const handleSubmit = (values) => {
    fetch('http://127.0.0.1:7000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => {
        if (response.ok) {
          // Check if the request was successful
          return response.json();
        } else {
          // Handle error response
          console.error('User registration request failed:', response.status);
          throw new Error('An error occurred during user registration.');
        }
      })
      .then(jsonData => {
        // Handle the response data
        setMessage(jsonData.message); // Set the server message

        if (jsonData.success) {
          // If the request was successful and the server responded with success
          setSubmitted(true); // Set the submitted state to true
        }

        // Display the verification message to the user
        console.log(jsonData.message);
        alert(jsonData.message);

        // Clear the message after 5 seconds
        setTimeout(() => {
          setMessage('');
        }, 5000);
      })
      .catch(error => {
        // Handle any network or other errors
        console.error('User registration request failed:', error);
        setMessage('An error occurred during user registration.');
      });
  };
  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
  >
    <Form>
      {/* {message} */}
    <div>
        {message && (
      <div className={`alert ${submitted ? 'success' : 'error'}`}>
  {message}
</div>
)}
      <label htmlFor="username">Username:</label>
      <Field type="text" id="username" name="username" />
      <ErrorMessage name="username" component="div" />
    </div>

    <div>
      <label htmlFor="email">Email:</label>
      <Field type="email" id="email" name="email" />
      <ErrorMessage name="email" component="div" />
    </div>

    <div>
      <label htmlFor="phone">Phone:</label>
      <Field type="text" id="phone" name="phone" />
      <ErrorMessage name="phone" component="div" />
    </div>

    <div>
      <label htmlFor="password">Password:</label>
      <Field type="password" id="password" name="password" />
      <ErrorMessage name="password" component="div" />
    </div>

    <div>
      <label htmlFor="profileType">Profile Type:</label>
      <Field as="select" id="profileType" name="profileType">
        <option value="">Select profile type</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </Field>
      <ErrorMessage name="profileType" component="div" />
    </div>

    <div>
      <label htmlFor="rollNo">Roll No:</label>
      <Field type="text" id="rollNo" name="rollNo" />
      <ErrorMessage name="rollNo" component="div" />
    </div>

    <div>
      <label htmlFor="institute">Institute:</label>
      <Field type="text" id="institute" name="institute" />
      <ErrorMessage name="institute" component="div" />
    </div>

    <button type="submit">Create User</button>
  </Form>
  </Formik>
  );
};
export default UserRegister;
