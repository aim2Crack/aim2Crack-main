import React, {useEffect} from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/user/Logo enlarged-03.png'
import { useFormik} from 'formik';
import * as yup from 'yup';
// import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
// import PasswordReset from './ResetPass'
import undraw from '../../assets/images/user/undraw_Questions_re_1fy7.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Login.css'
// import axios from "axios";

function Login() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [tokenError, setTokenError] = useState(null)
  const formInitialValues = {
    userOrEmail: '',
    password: '',
  };
  // Validation schema
  const formValidationSchema = yup.object().shape({
    userOrEmail: yup.string().required('Email or username is required').max(30, 'Email not greater than 30 character'),
    password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters').max(20, 'Password not greater than 20 character'),
  });

  const {handleChange, values, errors} = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [data, setData] = useState('')
  // const [password, setPassword] = useState('')
  const navigate = useNavigate(); // Access the navigate function

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
      console.log(response);
      if (response.ok ) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        console.log(token);
        // Fetch user details using the obtained token
        const userResponse = await fetch('http://127.0.0.1:7000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (userResponse.ok){
          const userData= await userResponse.json()
          console.log(userData);
          if (userData.firstName == null)
          {
            navigate('/onetimedetails'); // Redirect to the dashboard or desired page
          }
          else{
            navigate('/summary'); // Redirect to the dashboard or desired page
          }
        }
      } else if (response.status === 401) {
        setMessage('Invalid username or password.');
      } else if (response.status === 403) {
        setMessage('Please verify email. Check registered mail inbox!!');
      } else {
        setMessage('An error occurred during login. Please try again later.');
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setMessage('An error occurred during login. Please try again later.');
    }
  };

  // useEffect(()=>{
  //   getAuth().onAuthStateChanged((user)=>{
  //     if(user){
  //       handleAuthState(user)
  //     }
  //   })
  // }, [])
  // sign in with google
  // async function handleSignInWIthGoogle() {
  //   const auth = getAuth();
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const userSignInResult = await signInWithRedirect(auth, provider);


  //   } catch (error) {
  //     console.log("Error while signing in with Google:", error);
  //   }
  // }
  // const handleAuthState = async (user)=>{
  //   const idToken = await user.getIdToken();
  //   await verifyToken(idToken);
  // }
  // const verifyToken = async (token) =>{
  //   console.log("verifyToken")
  //   const user = await getUser(token);
  //   console.log(user)
  //   if (user) {
  //     navigate('/summary')
  //   } else if(user.status === 401) {
  //     navigate('/onetimedetails')
  //     setTokenError("User not found")
  //   }
  // }
  // async function getUser (accessToken){
  //   console.log(accessToken)
  //   const response =  await getRequest(routes.getUser, {
  //     accessToken: accessToken
  //   })
  //   if(response.status === 200){
  //     return response.data.user
  //   }
  //   else if(response.status === 401){
  //     return null
  //   }
  // }
  // const serverURL = "http://127.0.0.1:7000"
  // const routes = {
  //   getUser : `${serverURL}/getUser`
  // }


  // async function getRequest(url, body) {
  //   return await axios.get("http://127.0.0.1:7000/getUser", { params: body });
  // }

  return (

      <div>

        {/* <Link
            to="/"
            id="a__home"
        >
          <FontAwesomeIcon icon={faHouse} />
        </Link> */}
        <div className="login-container">
          <div className="content-section">
            <div>
              <img src= {logo} alt="logo" className='login-logo' />
            </div>
            {message && (
                <div className={`alert ${submitted ? 'success' : 'error'}`}>
                  {message}
                </div>
            )}
            <div className="border">
              <h1>Login Now</h1>

              <form onSubmit={handleSubmit} method="POST" className="login-form_method">
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

                <button type="submit" className=" login-btn-outline-info">LOG IN</button>

              </form>
              {/* <button className=" login-btn-outline-info" onClick={handleSignInWIthGoogle}>SIGN IN WITH GOOGLE</button> */}

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