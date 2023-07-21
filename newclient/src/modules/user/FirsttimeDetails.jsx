import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

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
      const token = localStorage.getItem('token');

      const response = await fetch('http://127.0.0.1:7000/users', {
        method: 'POST',
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
    <div>
      {message && <div className={`alert ${submitted ? 'success' : 'error'}`}>{message}</div>}
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <Field type="text" id="firstName" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <Field type="text" id="lastName" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
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

          <button type="submit">Update User</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FirsttimeDetails;
