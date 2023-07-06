import { useState } from 'react';
// import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Register.css';
import * as Yup from 'yup';
import signup from  '../../assets/images/Register/signup.svg';

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
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    // phone: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character'
      ),
    Confirm_Password: Yup.string().required('Confirm Password is required').oneOf([Yup.ref("password"), null], "Passwords must match"),
    // profileType: Yup.string().required('Profile type is required'),
    // rollNo: Yup.string(),
    // institute: Yup.string(),
  });



  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
  >
      <div className="register_container">
      
      <div className="register_box">
  <div className="left_panel">
  <h2>Register Yourself on Aim2Crack!!</h2>
    <Form className="form_method">
    {/* <fieldset className="form-group bottom_error"> */}
    <div id="div_id_username" className="input">
      <label htmlFor="username" className="form__label">Username:</label>
      <Field type="text" id="username" name="username" className="textinput textInput form-control"/>
      <ErrorMessage name="username" component="div" />
    </div>
    <div class="rules_u">
 <ErrorMessage name="username" component="div" />
               </div>
               <div id="div_id_email" className="input">
  <label htmlFor="email" className="form__label"  >Email:</label>
  <Field type="email" id="email" name="email" className="emailinput form-control" />
  
</div>



<div class="rules_e">
<ErrorMessage name="email" component="div" />
              </div>





<div className="input">

  <label htmlFor="phone" className="form__label">Phone:</label>
  <Field type="text" id="phone" name="phone" className="textinput textInput form-control" />
  
</div>


<div class="rules_ph">
<ErrorMessage name="phone" component="div" />
              </div>




              <div className="input " id="div_id_password1"  >
  <label htmlFor="password"  className="form__label" id="password_label" >Password:</label>
  <Field type="password" id="password" name="password" className="textinput textInput form-control  id_password1" 
                 placeholder=" " autoComplete="new-password"
                 />
</div>

<div class="rules_pass">
<ErrorMessage name="password" component="div" />
              </div>


<div  id="div_id_password2" className="input">
  <label htmlFor=""  className="form__label" id="password_label2">Confirm Password:</label>
  <Field type="password" id="Confirm_Password" 
                 className="textinput textInput form-control id_password2" 
                  placeholder=" " name="Confirm_Password" />
</div>
<div class="rules_CP">
<ErrorMessage name="Confirm_Password" component="div" />
              </div>
    <div className='input-box'>
      <label htmlFor="profileType">Profile Type:</label>
      <Field as="select" id="profileType" name="profileType">
        {/* <option value="">Select profile type</option> */}
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </Field>
      <ErrorMessage name="profileType" component="div" />
    
<div className="sign">
<button className="btn btn-outline-info" type="submit"  >Sign Up</button>
         </div>
         </div>
  
    {/* </fieldset> */}
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
export default UserRegister;