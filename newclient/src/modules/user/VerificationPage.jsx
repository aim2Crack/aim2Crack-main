import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VerificationPage.css';
import getEnvironment from '../../getenvironment';

const VerificationPage = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const apiurl = getEnvironment();

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(`${apiurl}/api/users/verifymail?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const jsonData = await response.json();
        if (response.status === 250 || response.status === 251) {
          setVerificationStatus(jsonData.message);
          setIsEmailVerified(true);
        } else if (response.status === 210) {
          navigate(`/reset-password/${token}`);
          setVerificationStatus(jsonData.message);
        } else if (response.status === 400) {
          setVerificationStatus(jsonData.message);
        }
      } catch (error) {
        setVerificationStatus('An error occurred while verifying the email.');
      }
    }

    verifyEmail();
  }, [token, navigate]);

  // useEffect(() => {
  //   if (isEmailVerified && countdown > 0) {
  //     const timer = setInterval(() => {
  //       setCountdown(prevCountdown => prevCountdown - 1);
  //     }, 1000);

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   } else if (isEmailVerified && countdown === 0) {
  //     navigate('/login');
  //   }
  // }, [countdown, isEmailVerified, navigate]);

  return (
    <div className="container">
      {verificationStatus && (
        <div className="popup">
          <h1>Email Verification</h1>
          <p>{verificationStatus}</p>
          <a className="ml-2" href="/login">Sign In</a>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
