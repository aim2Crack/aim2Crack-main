import React from 'react';
import logo from '../../assets/images/user/Logo enlarged-03.png';
import './ResetPass.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewPassword = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const { password, confirmPassword } = values;

    const data = {
      password,
      confirmPassword
    };

    try {
      const response = await fetch('http://127.0.0.1:7000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Check if the request was successful
        const jsonData = await response.json();

        if (jsonData.success) {
          // If the request was successful and the server responded with success
          setSubmitted(true); // Set the submitted state to true
        }

        setMessage(jsonData.message); // Set the server message
      } else {
        // Handle error response
        const jsonData = await response.json();
        setMessage(jsonData.message); // Set the server error message
        console.error('Password reset request failed:', response.status);
      }

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      // Handle network error
      console.error('Password reset request failed:', error);
    }

    setSubmitting(false);
  };

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
