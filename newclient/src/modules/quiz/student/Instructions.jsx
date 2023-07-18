import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PreviewInstructions.css';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/quiz/logo.png';

export default function PreviewInstructions() {
  const [instructions, setInstructions] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const code = window.location.pathname.split('/')[2];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const code = window.location.pathname.split('/')[2];

        const response = await fetch(`http://localhost:7000/quizzes/${code}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInstructions(data.data.instructions);
        } else {
          console.error('Failed to fetch quiz details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    fetchQuizDetails();
  }, []);


  
  const handleGoBack = () => {
    if (isFullscreen) {
      navigate(-1);
    }
  };

  const handleEnterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullscreen(true);
    setIsButtonVisible(false);
  };

  useEffect(() => {
    const exitFullScreenHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', exitFullScreenHandler);
    document.addEventListener('mozfullscreenchange', exitFullScreenHandler);
    document.addEventListener('webkitfullscreenchange', exitFullScreenHandler);
    document.addEventListener('msfullscreenchange', exitFullScreenHandler);

    return () => {
      document.removeEventListener('fullscreenchange', exitFullScreenHandler);
      document.removeEventListener('mozfullscreenchange', exitFullScreenHandler);
      document.removeEventListener('webkitfullscreenchange', exitFullScreenHandler);
      document.removeEventListener('msfullscreenchange', exitFullScreenHandler);
    };
  }, []);

  return (
    <div className="preview-instructions">
      <img src={logo} alt="" id="logo" />
      <h2>Instructions to the candidates</h2>

      <p className="lines">
        <i className="bx bxs-right-arrow"></i>
        Do not try to refresh your tab while taking the exam! Test will be submitted automatically!
      </p>

      <p className="lines">
        <i className="bx bxs-right-arrow"></i>
        Do not attempt to change the tab while taking the exam! Test will be submitted automatically!
      </p>
      <p className="lines">
        <i className="bx bxs-right-arrow"></i>
        Individual questions are timed, you don't have any chance to answer it later!
      </p>
      <p className="lines">
        <i className="bx bxs-right-arrow"></i>
        Do not attempt to google search on a secondary device, the timer has been set appropriately!
      </p>

      {instructions.length > 0 && (
        <ul className="instruction-list">
          {instructions.map((item, index) => (
            <li className="lines" key={index}>
              <i className="bx bxs-right-arrow"></i>
              {item}
            </li>
          ))}
        </ul>
      )}

      <p className="lines" id="bnd">
        <i className="bx bxs-right-arrow"></i>
        Your chance to take this quiz will end in: <span id="the_timer">8789</span>
      </p>

      {!isFullscreen && isButtonVisible && (
        <button className="btn-back" onClick={handleEnterFullScreen}>
          Enter Fullscreen
        </button>
      )}

      <button
        className={`btn-back ${isFullscreen ? '' : 'disabled'}`}
        onClick={handleGoBack}
        disabled={!isFullscreen}
      >
        Go Back
      </button>
    </div>
  );
}

// PreviewInstructions.propTypes = {
//   // code: PropTypes.string.isRequired,
// };
