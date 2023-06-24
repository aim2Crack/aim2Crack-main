import React, { useState } from 'react';
import logo from '../../assets/images/user/Logo enlarged-03.png'
import './ResetPass.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const changeHandler = (e) => {
        setEmail(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { email });
        setSubmitted(true);
    }


    return (
        <div>
            {!submitted ? (
                <div>
                    <Link
                        to="/login"
                        id="a_home"
                    >
                        <FontAwesomeIcon icon={faCircleArrowLeft} />
                    </Link>
                    <div>
                        <img
                            src={logo}
                            alt=''
                            className="logo_head"
                        />
                    </div>
                    <div className="main_box">
                        <div className="heading">
                            <h1>Password Reset</h1>
                        </div>
                        <div className="text">
                            Seems like you forgot the password for Aim2Crack. If this is true
                            click below to reset your password.
                        </div>
                        <form onSubmit={submitHandler} method="post">
                            <input
                                type="hidden"
                            />
                            <input
                                type="email"
                                className="email"
                                name="email"
                                required
                                placeholder="Email address"
                                onChange={(e) => changeHandler(e)}
                                value={email}
                            />
                            <button type="submit" className="reset-btn">
                                RESET PASSWORD
                            </button>
                        </form>
                    </div>
                </div>) : (
                <div>
                    <Link
                        to="/login"
                        id="a_home"
                    >
                        <FontAwesomeIcon icon={faCircleArrowLeft} />
                    </Link>
                    <div>
                        <img
                            src={logo}
                            alt=''
                            className="logo_head"
                        />
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
