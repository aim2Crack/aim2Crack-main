import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './firsttime.css';

const FirsttimeDetails = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    profileType: '',
    rollNo: '',
    institute: '',
  };
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // Access the navigate function

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('handleSubmit called'); 
      const token = localStorage.getItem('token');
      console.log(token);

      const response = await fetch('https://18.232.60.24:7000/api/users/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      console.log(response.json);
      if (response.ok) {
        console.log(response);
        setMessage('User details updated successfully.');
        navigate('/summary');
      } else {
        setMessage('Failed to update user details.');
      }
    } catch (error) {
      setMessage('An error occurred while updating user details.');
      console.error(error);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    profileType: Yup.string().required('Profile type is required'),
    rollNo: Yup.string(),
    institute: Yup.string(),
  });

  return (
    <div className="container">
      {message && <div className={`alert ${submitted ? 'success' : 'error'}`}>{message}</div>}
      <h1 className="heading">Important Details</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        
        <div className="formdiv">
        <ErrorMessage className="error" name="firstName" component="div" />
        <ErrorMessage className="error" name="lastName" component="div" />   
          <Form className="form-table">
            
            <div className="form-row">
             <label htmlFor="firstName">First Name:</label>
              <Field type="text" id="firstName" name="firstName" />
              </div>

            <div className="form-row">
              <label htmlFor="lastName">Last Name:</label>
              <Field type="text" id="lastName" name="lastName" />
              
            </div>

            <div className="form-row">
              <label htmlFor="rollNo">Roll No:</label>
              <Field type="text" id="rollNo" name="rollNo" />
              <ErrorMessage className="error" name="rollNo" component="div" />
            </div>

            <div className="form-row">
              <label htmlFor="institute">Institute:</label>
              <Field type="text" id="institute" name="institute" />
              <ErrorMessage name="institute" component="div" />
            </div>

            <div className="form-row">
              <label htmlFor="profileType">Profile Type:</label>
              <Field as="select" id="profileType" name="profileType">
                <option value="">Select profile type</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </Field>
              <ErrorMessage name="profileType" component="div" />
            </div>

            
         
          <div style={{ textAlign: 'center' }}>
              <button type="submit">Update User</button>
            </div>
            </Form>
        </div>
      </Formik>
    </div>
  );
};

export default FirsttimeDetails;
