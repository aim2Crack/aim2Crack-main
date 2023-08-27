import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VerificationPage.css';

const VerificationPage = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  
  const [countdown, setCountdown] = useState(5); // Countdown timer value
  const navigate = useNavigate(); // Access the navigate function

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(`http://127.0.0.1:7000/api/users/verifymail?token=${token}`);
        
        const jsonData = await response.json();
        if (response.status === 250) {
          setVerificationStatus(jsonData.message);
          setIsEmailVerified(true);
        } else if (response.status === 210) {
          navigate(`/reset-password/${token}`);
          setVerificationStatus(jsonData.message);
        } else if (response.status===400) {
          setVerificationStatus(jsonData.message);
        }
      } catch (error) {
        setVerificationStatus('An error occurred while verifying the email.');
      }
    }

    verifyEmail();
  }, [token, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      if (isEmailVerified) {
        navigate('/login');
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown, verificationStatus, navigate]);

  return (
    <div className="container">
      {verificationStatus && (
        <div className="popup">
          <h1>Email Verification</h1>
          <p>{verificationStatus}</p>
          {/* <p className="timer">Redirecting to sign-in page in {countdown} seconds...</p> */}
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
