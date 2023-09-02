import React, { useState, useEffect } from 'react';
import '../../styles/rightPanel.css';
import searchImage from '../../../assets/images/summary/searchBar.svg';
import pdfImage from '../../../assets/images/summary/pdfImage.svg';
import {extractDateTime} from '../../timer/extractDateTime.js';
// import { Link } from 'react-router-dom';
import { faTrash, faLink, faPen, faGears, faRotate, faShareNodes, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';



const SubjectiveQuizPanel = () => {
  const [quizDetails, setQuizDetails] = useState([]);
  const [message, setMessage]=useState();
  const navigate = useNavigate(); 
  
  

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await fetch(`http://localhost:7000/api/quiz/quizzes`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuizDetails(data.data);
        } else {
          console.error('Failed to fetch quiz details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    fetchQuiz();
  }, []);


    const handleDeleteQuiz = async (quizId) => {
      try {
        const token = localStorage.getItem('token');
        // console.log(token);
        const response = await fetch(`http://localhost:7000/api/quiz/quizzes/${quizId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log('Quiz deleted successfully');
          setMessage('Quiz Deleted Successfully')
        } else {
          console.error('Failed to fetch quiz details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };





  // Redirection to settings page
  const handleNavigateSettings = (quizCode) => {
    navigate(`../quiz/${quizCode}/settings`);
  };

// Redirection to settings page
const handleChart = (quizCode) => {
  navigate(`../quiz/${quizCode}/addinstruction`);
};


  // copying test link 
  const handleTestLink = async (quizCode) => {
    const extractedCode = window.location.href;
    const parsedUrl = new URL(extractedCode);
    const hostname = parsedUrl.hostname;
    const port = parsedUrl.port;
  // Construct the host and port string
  const hostAndPort = `${hostname}${port ? `:${port}` : ''}`
// console.log('Extract',hostAndPort);
     const currentURL = hostAndPort+`/quiz/${quizCode}`;
// console.log('current',currentURL);
    try {
      await navigator.clipboard.writeText(currentURL+'/test');
      console.log('URL copied to clipboard!');
      window.alert('Test Link Copied');
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };


  return (
    <div>
      {message && (
                <div className='success'>
                  {message}
                </div>
            )}

      <div className="search-bar-panel">
        <input
          type="text"
          className="search"
          name="Search..."
          placeholder="Search...."
        />
        <input
          type="image"
          className="search-button-image"
          name="search"
          src={searchImage}
          alt="Search"
        />
      </div>
      <div className="panel-item" id="panel-subjective-quiz">
        <div className="upload">
          <p className="uploaded">YOUR QUIZZES</p>
        </div>

        <Link to="/createQuiz">
          <div className="upload-button-container">
            <button className="upload-button">
              Create Quiz
              <i className="fa fa-upload" aria-hidden="true"></i>
            </button>
          </div>
        </Link>

        <div className="cards-container d-flex">
          {quizDetails.map((quiz) => (
            <div className="content-card" key={quiz.id}>
              <div className="upper-container d-flex">
                <div className="content-card-icon">
                  {/* <img src={pdfImage} className="content-card-image" alt="Quiz" /> */}
                </div>
                <div >
                  <p className="file-name">{quiz.quizName}</p>
                  <div className="sub-heading">
                    <span className="naam">Start Time: {extractDateTime(quiz.startTime)} </span>
                  </div>
                  <div className="sub-heading">
                    <span className="naam">Result Time: {extractDateTime(quiz.resultTime)} </span>
                  </div>

                </div>
                <Link to={`../quiz/${quiz.code}`}>
          <div className="upload-button-container">
            <button className="upload-button">
              Questions
              <i className="fa fa-upload" aria-hidden="true"></i>
            </button>
          </div>
        </Link>     

                <Link to={`../quiz/${quiz.code}/result`}>
          <div className="upload-button-container">
            <button className="upload-button">
              View Result
              <i className="fa fa-upload" aria-hidden="true"></i>
            </button>
          </div>
        </Link>     
                <div className="middle-container d-flex">
           
           
                           <div className="end-container d-flex">
                           <button className="icon-button" onClick={() => handleTestLink(quiz.code)}>
    <FontAwesomeIcon icon={faLink} className="icons card-icons" />
  </button>

  <button className="icon-button" onClick={() => handleNavigateSettings(quiz.code)}>
    <FontAwesomeIcon icon={faGears} className="icons card-icons" />
  </button>

  <button className="icon-button" onClick={() => handleChart(quiz.code)}>
    <FontAwesomeIcon icon={faPen} className="icons card-icons" />
  </button>


  <button className="icon-button" onClick={() => handleDownload(quiz.code)}>
    <FontAwesomeIcon icon={faDownload} className="icons card-icons" />
  </button>


  <button className="icon-button" onClick={() => handleDeleteQuiz(quiz.code)}>
    <FontAwesomeIcon icon={faTrash} className="icons card-icons" />
  </button>
  {/* Add other icon buttons with event handlers as needed */}
  </div>
  </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectiveQuizPanel;
