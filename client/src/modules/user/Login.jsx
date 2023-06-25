import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/user/Logo enlarged-03.png'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

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

  // sign in with google
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
      <Link
        to="/homePage"
        id="a_home"
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


            <form onSubmit={submitHandler} method="POST" className="login-form_method">
              <input
                type="hidden"
              />

              <fieldset className="login-form-group">
                <div className="login-form-group">
                  <div className="login-info">
                    <FontAwesomeIcon className='icon' icon={faUser} />
                    <input
                      type="email"
                      name="email"
                      autoFocus
                      autoCapitalize="none"
                      autoComplete="username"
                      maxLength="30"
                      required
                      value={data.email}
                      placeholder="Username / Email id"
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div className="login-form-group">
                  <div className="login-info login-info-pass">
                    <FontAwesomeIcon className='icon' icon={faLock} />
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      name="password"
                      value={password}
                      minLength='4'
                      maxLength="20"
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                    />
                    
                      <span  onClick={handleTogglePasswordVisibility}>
                        {isPasswordVisible ? <FontAwesomeIcon className='icon'  icon={faEye} /> : <FontAwesomeIcon className='icon'  icon={faEyeSlash} />}
                      </span>
                      
                    
                  </div>
                </div>
              </fieldset>
              <div className="login-form-group">
                <small className="forgot_password">
                  <Link to="/resetPass">Forgot Password</Link>
                </small>
              </div>

              <button type="submit" className=" login-btn-outline-info">LOG IN</button>
              <button className=" login-btn-outline-info" onClick={handleSignInWIthGoogle}>SIGN IN WITH GOOGLE</button>
            </form>
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
  )
}

export default Login