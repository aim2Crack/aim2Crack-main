import React, { useState } from 'react';
import logo from '../../assets/images/user/Logo enlarged-03.png';
import './ResetPass.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const changeHandler = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log('Form submitted:', { email, username });

    const data = {
      email: email,
      username: username,
    };
    // let jsonData={};
    try {
      const response = await fetch('https://a2cbackend.onrender.com/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      console.log(jsonData)
      if (response.ok) {
        // Check if the request was successful
        setMessage(jsonData.message); // Set the server message

        if (jsonData.success) {
          // If the request was successful and the server responded with success
          setSubmitted(true); // Set the submitted state to true
        }
      } else {
        setMessage(jsonData.error); // Set the server error message
        console.error('Password reset request failed:', response.status);
      }
    } catch (error) {
      // Handle network error
      console.error('Password reset request failed:');
    }
  };

  return (
    <div>
       
      {!submitted ? (
        <div>
       
          <Link to="/login" id="a_home">
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </Link>
          <div>
            <img src={logo} alt="" className="logo_head" />
          </div>
          <div className="main_box">
            <div className="heading">
              <h1>Password Reset</h1>
            </div>
            {message && (
      <div className={`alert ${submitted ? 'success' : 'error'}`}>
  {message}
</div>
)}
            <div className="text">
              Seems like you forgot the password for Aim2Crack.No worries! It happens to the Best too!!            </div>
            <form onSubmit={submitHandler} method="post">
              <input type="hidden" />
              <input
                type="text"
                className="email"
                name="username"
                placeholder="Username"
                onChange={changeHandler}
                value={username}
              />
              <div className="text"><p>or</p></div>
              <input
                type="email"
                className="email"
                name="email"
                placeholder="Email address"
                onChange={changeHandler}
                value={email}
              />
              
              <button type="submit" className="reset-btn">
                RESET PASSWORD
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login" id="a_home">
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </Link>
          <div>
            <img src={logo} alt="" className="logo_head" />
          </div>
          <div className="main_box2">
            <h2>An E-mail has been sent with instructions to reset your Password.</h2>
            <br />
            <h3>If not found please check your spam folder.</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
