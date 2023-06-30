import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/user/Logo enlarged-03.png'
<<<<<<< HEAD
import { useFormik } from 'formik';
import * as Yup from 'yup';
=======
import { useFormik} from 'formik';
import * as yup from 'yup';
>>>>>>> 12d15c874c0c5b2ad5a785b66f9c70d8d042b304
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

// import PasswordReset from './ResetPass'

import undraw from '../../assets/images/user/undraw_Questions_re_1fy7.svg'
import google_logo from '../../assets/images/user/flat-color-icons_google.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


import './Login.css'

function Login() {
  const [error, setError] = useState('');
  const formInitialValues = {
      userOrEmail: '',
    password: '',
  };

  
  // Validation schema
<<<<<<< HEAD
  const formValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required').max(30, 'Email not greater than 30 character'),
    password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters').max(20, 'Password not greater than 20 character'),
=======
  const formValidationSchema = yup.object().shape({
    userOrEmail: yup.string().required('Email or username is required').max(30, 'Email not greater than 30 character'),
    password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters').max(20, 'Password not greater than 20 character'),
>>>>>>> 12d15c874c0c5b2ad5a785b66f9c70d8d042b304
  });

  const {handleChange, values, errors} = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
<<<<<<< HEAD
=======
  // const [data, setData] = useState('')
  // const [password, setPassword] = useState('')
  const navigate = useNavigate(); // Access the navigate function
>>>>>>> 12d15c874c0c5b2ad5a785b66f9c70d8d042b304

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

<<<<<<< HEAD
  const isButtonEnabled = values.email.length >= 4 && values.password.length >= 4;
=======
  // const submitHandler =(e) => {
  //   e.preventDefault();
  //   // console.log('submiting', {email, password});
  // }

  // const changeHandler = (e) => {
  //   const { name, value } = e.target;

  //   setData(prev => {
  //     return {
  //       ...prev, [name]: value
  //     }
  //   });
  //   //console.log(name, value);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

  const loginData = {
    usernameOrEmail: values.userOrEmail,
    password: values.password,
  };
  

  try {
    const response = await fetch('http://127.0.0.1:7000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    if (response.ok) {
      console.log(response)
      // Login successful, perform desired actions
      const data = await response.json();
      const { token } = data; // Extract the token from the response
>>>>>>> 12d15c874c0c5b2ad5a785b66f9c70d8d042b304

        // Store the token in localStorage
      localStorage.setItem('token', token);
      // console.log(token)
      navigate('/summary'); // Redirect to the dashboard or desired page
    } else {
      // console.log(response)
      // Login failed, handle error
    const errorText = await response.text(); // Retrieve the response body as text
    console.error('Login request failed:', errorText);
    setError('An error occurred during login.'); 
      const errorData = await response.json();
      setError(errorData.message);
    }
  } catch (error) {
    // Handle network error
    console.error('Login request failed:', error);
  }
  }
  // // sign in with google
  async function handleSignInWIthGoogle(){
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    try {
      const userSignInResult = await signInWithPopup(auth, provider)
      const user = userSignInResult.user
      return await user.getIdToken()
    }catch (e){
      console.log("user not registered")
    }


  }

  return (

    <div>
      <div className="error-message">
        {error && <span>{error}</span>}
      </div>
      <Link
        to="/homePage"
        id="a__home"
      >
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <div className="login-container">
        <div className="content-section">
          <div>
            <img src= {logo} alt="logo" className='login-logo' />
          </div>
          <div className="border">
            <h1>Login Now</h1>

<<<<<<< HEAD
            <form onSubmit={handleSubmit}  method="POST" className="login-form_method">
=======
            <form onSubmit={handleSubmit} method="POST" className="login-form_method">
>>>>>>> 12d15c874c0c5b2ad5a785b66f9c70d8d042b304
              <input
                type="hidden"
              />

              <fieldset className="login-form-group">
                <div className="login-form-group">
                  <div className="login-info">
                    <FontAwesomeIcon className='icon' icon={faUser} />
                    <input
                      type="text"
                      name="userOrEmail"
                      autoFocus
                      autoCapitalize="none"
                      autoComplete="username"
<<<<<<< Updated upstream
                      maxLength="30"
<<<<<<< HEAD
                      required
=======
>>>>>>> Stashed changes
=======
                      // required
                      value={values.userOrEmail}
>>>>>>> 12d15c874c0c5b2ad5a785b66f9c70d8d042b304
                      placeholder="Username / Email id"
                      onChange={handleChange}
                    />
                    
                  </div>
                  <span className='login-error'>{errors.email} </span>
                </div>
                <div className="login-form-group">
                  <div className="login-info login-info-pass">
                    <FontAwesomeIcon className='icon' icon={faLock} />
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    
                      <span  onClick={handleTogglePasswordVisibility}>
                        {isPasswordVisible ? <FontAwesomeIcon className='icon'  icon={faEye} /> : <FontAwesomeIcon className='icon'  icon={faEyeSlash} />}
                      </span>
                      
                    
                  </div>
                  <span className='login-error' >{errors.password} </span>
                </div>
              </fieldset>
              <div className="login-form-group">
                <small className="forgot_password">
                  <a href="/forgot-password">Forgot Password</a>
                </small>
              </div>

<<<<<<< HEAD
              <button type="submit"
              style={{ backgroundColor: isButtonEnabled ? '#00c6a7' : 'grey' }}
              disabled={!isButtonEnabled}
               className="login-btn-outline-info"
               >LOG IN</button>
               <div className='login-or' >
                <span className='login-line'></span>
                <span>Or</span>
                <span className='login-line'></span>
               </div>

              <button className=" login-btn-outline-info login-google-btn" onClick={handleSignInWIthGoogle}>
                <div className='login-google'>
                  
                <img src={google_logo} alt="google" />
                <span>Login with Google</span>
                </div>
              </button>
            </form>
=======
              <button type="submit" className=" login-btn-outline-info">LOG IN</button>

                 </form>
                 <button className=" login-btn-outline-info" onClick={handleSignInWIthGoogle}>SIGN IN WITH GOOGLE</button>
         
>>>>>>> 12d15c874c0c5b2ad5a785b66f9c70d8d042b304
          </div>
        </div>
        <div className="login-left_panel">
          <div className="border-top login-pt-3">
            <small >
              <h3>Newbie ?</h3>
              <p>Chill !! Make your Aim2Crack Account now!!</p>
              <div className="sign_up">
                <Link to="/register">Sign Up </Link>
              </div>
            </small>
          </div>
          <img
            src={undraw}
            alt="imge"
            className="undraw"
          />
        </div>
      </div>

    </div>
  );
};

export default Login