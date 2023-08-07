import React, { useEffect } from 'react'
import { useState } from 'react'
import { getUserDetails, saveToken } from '../../services/jwtService';
import { Link, useNavigate } from 'react-router-dom'
// import logo from '../../assets/images/user/Logo enlarged-03.png'
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// // import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
// // import PasswordReset from './ResetPass'
// import undraw from '../../assets/images/user/undraw_Questions_re_1fy7.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Login.css'
import axios from 'axios';

function Login() {
  // const [error, setError] = useState('');
  // const [message, setMessage] = useState('');
  // const [submitted, setSubmitted] = useState(false);
  // const [tokenError, setTokenError] = useState(null);
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async (e) => {
    try {
      const response = await axios.post('http://localhost:7000/api/users/signin', formValues)
      const { token } = response.data;
      saveToken(token);
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
    console.log(localStorage);
  }

  const handleChanges = (e) => {
    formValues[e.target.name] = e.target.value;
    setFormValues({ ...formValues });
  }

  const revealUsername = (e) => {
    const userDetails = getUserDetails();
    console.log(userDetails);
  }

  const fields = [
    {
      type: "text",
      label: "Username or Email",
      value: "username",
      isRequired: true,
    },
    {
      type: "password",
      label: "Password",
      value: "password",
      isRequired: true,
    }
  ];

  return (

    <div>
      {fields.map((field, index) => (
        <input key={index}
          type={field.type}
          name={field.value}
          required={field.isRequired || false}
          placeholder={field.value}
          value={formValues[field.value]}
          onChange={handleChanges}
        />
      ))}

      <button onClick={handleLogin}>Login</button>

      <button onClick={revealUsername}>Reveral Username</button>

      <Link
        to="/"
      >
        Something
        {/* <FontAwesomeIcon icon={faHouse} /> */}
      </Link>
      {/* <div className="login-container">
        <div className="content-section">
          <div>
            <img src={logo} alt="logo" className='login-logo' />
          </div>
          {message && (
            <div className={`alert ${submitted ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          <div className="border">
            <h1>Login Now</h1> */}

      {/* <form onSubmit={handleSubmit} method="POST" className="login-form_method">
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
                      maxLength="30"
                      // required
                      value={values.userOrEmail}
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
                      required
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                    />

                    <span onClick={handleTogglePasswordVisibility}>
                      {isPasswordVisible ? <FontAwesomeIcon className='icon' icon={faEye} /> : <FontAwesomeIcon className='icon' icon={faEyeSlash} />}
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

              <button type="submit" className=" login-btn-outline-info">LOG IN</button>

            </form> */}
      {/* <button className=" login-btn-outline-info" onClick={handleSignInWIthGoogle}>SIGN IN WITH GOOGLE</button> */}

      {/* </div>
        </div>
        <div className="login-left_panel">
          <div className="border-top login-pt-3">
            <small >
              <h3>Newbie ?</h3>
              <p>Chill !! Make your Aim2Crack Account now!!</p>
              <div className="sign_up"> */}
      {/* <Link to="/register">Sign Up </Link> */}
      {/* </div>
            </small>
          </div> */}
      {/* <img
            src={undraw}
            alt="imge"
            className="undraw"
          /> */}
      {/* </div> */}
      {/* </div> */}

    </div>
  );
};

export default Login