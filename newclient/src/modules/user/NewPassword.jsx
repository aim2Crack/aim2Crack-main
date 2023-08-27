import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import React from 'react';
import logo from '../../assets/images/user/Logo enlarged-03.png';
import './ResetPass.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewPassword = () => {
  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm New Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });


  const { token } = useParams();

  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState('');
  const handleSubmit = async (values, { setSubmitting }) => {
  const { password, confirmPassword } = values;
  // 

    const data = {
      password,
      confirmPassword
    };

    try {
      const response = await fetch(`http://127.0.0.1:7000/api/users/signup?token=${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          //  Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      console.log(jsonData);

      if (response.ok) {
        // Check if the request was successful
        
        if (jsonData.success) {
          // If the request was successful and the server responded with success
          setSubmitted(true); // Set the submitted state to true
        }

        setMessage(jsonData.message); // Set the server message
      } else {
        // Handle error response
        // const jsonData = await response.json();
        setMessage(jsonData.message); // Set the server error message
        // console.error('Password reset request failed:', response.status);
      }
    } catch (error) {
      // Handle network error
      console.error('Password reset request failed:', error);
    }

    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        {({ isSubmitting }) => (
          <Form>
            {/* <Link to="/login" id="a_home">
              <FontAwesomeIcon icon={faCircleArrowLeft} />
            </Link> */}
            <div>
              <img src={logo} alt="" className="logo_head" />
            </div>
            {message && (
                <div className={`alert ${submitted ? 'success' : 'error'}`}>
                  {message}
                </div>
            )}
      
            <div className="main_box">
            <div className="heading">
              <h1>Password Reset</h1>
            </div>
            <div className="text">
              Email has been verified! Change your password!            </div>
            <div>
              <label htmlFor="password">New Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="email"
              />
              <ErrorMessage name="password" className="error-message"component="div" />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                className="email"
              />
              <ErrorMessage name="confirmPassword" className="error-message"component="div" />
            </div>

            <button type="submit" className="reset-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'RESET PASSWORD'}
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPassword;
