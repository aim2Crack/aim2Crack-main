import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CreateUserForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate form submission
    setTimeout(() => {
      console.log('Form values:', values);
      setSubmitting(false);
      navigate('/login');
    }, 500);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character'
      ),
    profile_type: Yup.string().required('Profile type is required'),
    rollNo: Yup.string(),
    institute: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        phone: '',
        password: '',
        profile_type: '',
        rollNo: '',
        institute: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
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
            <label htmlFor="profile_type">Profile Type:</label>
            <Field as="select" id="profile_type" name="profile_type">
              <option value="">Select profile type</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </Field>
            <ErrorMessage name="profile_type" component="div" />
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
          <button type="submit" disabled={isSubmitting}>
            Create User
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUserForm;
