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

  const changeHandler = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, username });

    const data = {
      email: email,
      username: username,
    };

    try {
      const response = await fetch('http://127.0.0.1:7000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Handle error response
        console.error('Password reset request failed:', response.status);
      }
    } catch (error) {
      // Handle network error
      console.error('Password reset request failed:', error);
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
