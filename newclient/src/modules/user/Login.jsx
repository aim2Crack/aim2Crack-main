import React, {useEffect} from 'react'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/images/user/Logo enlarged-03.png'
import { useFormik} from 'formik';
import * as yup from 'yup';
import undraw from '../../assets/images/user/undraw_Questions_re_1fy7.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Login.css'

function Login() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [tokenError, setTokenError] = useState(null)
  const formInitialValues = {
    userOrEmail: '',
    password: '',
  };

  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/summary' } };

  const formValidationSchema = yup.object().shape({
    userOrEmail: yup.string().required('Email or username is required').max(30, 'Email not greater than 30 character'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(20, 'Password not greater than 20 character'),
  });

  const {handleChange, values, errors} = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
      const response = await fetch('http://ec2-18-232-60-24.compute-1.amazonaws.com:7000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const jsonData = await response.json();
      if (response.ok ) {
        localStorage.setItem('token', jsonData.token);
          if (jsonData.user.firstName == null)
          {
            navigate('/onetimedetails'); // Redirect to the dashboard or desired page
          }
          else
          {
            navigate(from); // Redirect to the dashboard or desired page
          }
        }
        else{
          setMessage(jsonData.error);
        }
        console.log(jsonData);
    } catch (error) {
      console.error('Login request failed:', jsonData.error);
      
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
  // const serverURL = "http://18.232.60.24:7000"
  // const routes = {
  //   getUser : `${serverURL}/getUser`
  // }


  // async function getRequest(url, body) {
  //   return await axios.get("http://18.232.60.24:7000/getUser", { params: body });
  // }

  return (

      <div>

        <Link
            to="/"
            id="a__home"
        >
          <FontAwesomeIcon icon={faHouse} />
        </Link>
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
                  <Link to="/forgot-password">Forgot Password</Link>
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