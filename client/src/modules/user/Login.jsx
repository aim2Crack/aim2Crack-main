import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import PasswordReset from './ResetPass'

import undraw from '../../assets/images/user/undraw_Questions_re_1fy7.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


import './Login.css'

function Login() {

  const [data, setData] = useState({
    email: '',
    //password: '',
  })
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const submitHandler =(e) => {
    e.preventDefault();
    console.log('submiting', {data, password});
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setData(prev => {
      return {
        ...prev, [name]: value
      }
    });
    //console.log(name, value);
  }
  

  return (
    <div>
      <Link
        to="/homePage"
        id="a_home"
      >
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <div className="login-container">
        <div className="content-section">
          <div className="border">
            <h1>Login Now</h1>

            <form onSubmit={submitHandler} method="POST" className="form_method">
              <input
                type="hidden"
              />

              <fieldset className="form-group">
                <div id="div_id_username" className="form-group">
                  <div className="info">
                    <FontAwesomeIcon className='icon' icon={faUser} />
                    <input
                      type="email"
                      name="email"
                      autoFocus
                      autoCapitalize="none"
                      autoComplete="username"
                      maxLength="150"
                      className="textinput textInput form-control"
                      required
                      id="id_username"
                      value={data.email}
                      placeholder="Username / Email id"
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div id="div_id_password" className="form-group">
                  <div className="info">
                    <FontAwesomeIcon className='icon' icon={faLock} />
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="textinput textInput form-control"
                      required
                      id="id_password"
                      placeholder="Password"
                    />
                    
                      <span className='eye' onClick={handleTogglePasswordVisibility}>
                        {isPasswordVisible ? <FontAwesomeIcon className='icon' id='hide1' icon={faEye} /> : <FontAwesomeIcon className='icon' id='hide2' icon={faEyeSlash} />}
                      </span>
                      
                    
                  </div>
                </div>
              </fieldset>
              <div className="form-group">
                <small className="forgot_password">
                  <Link to="/resetPass">Forgot Password</Link>
                </small>
              </div>

              <button type="submit" className=" btn-outline-info">LOG IN</button>
            </form>
          </div>
        </div>
        <div className="left_panel">
          <div className="border-top pt-3">
            <small className="text-muted">
              <h3>Newbie ?</h3>
              <p>Chill !! Make your Aim2Crack Account now!!</p>
              <div className="sign_up">
                <Link to="/register/">Sign Up </Link>
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
  )
}

export default Login