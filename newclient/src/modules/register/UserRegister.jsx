import { useState } from 'react';
// import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Register.css';
import * as Yup from 'yup';
import signup from  '../../assets/images/register/signup.svg';

const UserRegister = () => {
  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_Password:'',
    profileType: '',
    // rollNo: '',
    // institute: '',
    // brandName: 'none',
    // brandLogo: '',
    // brandLink: ''
  };
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false); // Add this line to define the `submitted` state variable
  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:7000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const jsonData = await response.json();
  
      if (response.ok) {
        // Successful response (200 status code)
        setMessage(jsonData.message);
        setSubmitted(true);
      } else {
        // Error response (400 or 500 status code)
        setMessage(jsonData.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('An error occurred during user registration.');
    }
  };
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character'
      ),
    Confirm_Password: Yup.string().required('Password is required').oneOf([Yup.ref("password"), null], "Passwords must match"),
    profileType: Yup.string().required('Profile type is required'),
    // rollNo: Yup.string(),
    // institute: Yup.string(),
  });



  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    
      <div className="register_container">
      {message && (
                <div className={`alert ${submitted ? 'success' : 'error'}`}>
                  {message}
                </div>
            )}
        
      <div className="register_box">
  <div className="left_panel">
  <h2>Register Yourself on Aim2Crack!!</h2>
 

    <Form className="form_method">
   
     <fieldset className="form-group bottom_error"> 
    
    <div id="div_id_username" className="input">
      <Field type="text" id="username" name="username" className="textinput textInput form-control"/>
      <label htmlFor="username" className="form__label">Username:</label>
      
      <ErrorMessage className="error-message" name="username" component="div" />
      
    </div>
   
               <div  className="input">

               <Field type="email" id="email1" name="email" className="textinput textInput form-control"  />
               <label htmlFor="email" className="form__label">Email:</label>  
  
<ErrorMessage className="error-message" name="email" component="div" />

</div>
<div className="input" >
  
  <Field type="text" id="phone" name="phone" className="textinput textInput form-control" />
  <label htmlFor="phone" className="form__label" >Phone:</label>
  <ErrorMessage className="error-message" name="phone" component="div" />
</div>
              <div className="input " id="div_id_password1"  >
  <Field type="password" id="password" name="password" className="textinput textInput form-control  id_password1" 
                 placeholder=" " autoComplete="new-password"
                 /><label htmlFor="password"  className="form__label" id="password_label" >Password:</label>
  
                 <ErrorMessage className="error-mes" name="password" component="div" />
</div>
<div  id="div_id_password2" className="input">
  <Field type="password" id="Confirm_Password" 
                 className="textinput textInput form-control id_password2" 
                  placeholder=" " name="Confirm_Password" />
                  <label htmlFor=""  className="form__label" id="password_label2">Confirm Password:</label>
  
                  <ErrorMessage className="error-mes" name="Confirm_Password" component="div" />
</div>

    <div className='input'>
      <label htmlFor="profileType">Profile Type :</label>
      <Field as="select" id="profileType" name="profileType" className="profile">
        <option value="">Select profile type</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </Field><div>

      <ErrorMessage className=" field-error" name="profileType" component="div" />
      </div>
      </div>
<div className="sign">
<button className="btn-outline-info" type="submit"  >Sign Up</button>
      
         </div>
  
    </fieldset> 
  </Form>
  </div>
  <div className="right_panel">

<img src={signup} alt=""/>

      <div className="border-top pt-3">
            <small className="text-muted">
           <h3> Already have an account ?</h3>
            <div className="sign_in">

  <a className="ml-2" href="/login">Sign In</a>
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