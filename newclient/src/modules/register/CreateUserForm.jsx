import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Register.css';

const CreateUserForm = () => {
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
          console.log('User created successfully!');
        } else {
          throw new Error('User creation failed.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
  >
      <div className="register_container">
      
      <div className="register_box">
  <div className="left_panel">
  <h2>Register Yourself on Aim2Crack!!</h2>
    <Form>
    <div id="div_id_username" className="input">
      <label htmlFor="username">Username:</label>
      <Field type="text" id="username" name="username" />
      <ErrorMessage name="username" component="div" />
    </div>
    <div class="rules_u">
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
  </div>
  <div className="right_panel">

<img src={signup.svg} alt=""/>

      <div className="border-top pt-3">
            <small className="text-muted">
           <h3> Already have an account ?</h3>
            <div className="sign_in">

  <a className="ml-2" >Sign In</a>
</div>
</small>
</div>
</div>


</div>
  </div>

  </Formik>
  );
};
export default CreateUserForm;
