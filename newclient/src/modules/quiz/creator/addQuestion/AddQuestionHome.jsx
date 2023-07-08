import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faPenToSquare, faCopy, faGear, faCalendar } from '@fortawesome/free-solid-svg-icons';
import './AddQuestionHome.css';
import AddQuestion from './AddQuestion';

export const AddQuestionHome = () => {
  const [addQuestion, setAddQuestion] = useState(false);
  const [quiz, setQuiz] = useState();
  const { code } = useParams();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`http://localhost:7000/quizzes/${code}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data.quizName);
          setQuiz(data.data);
        } else {
          console.error('Failed to fetch quiz details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    fetchQuizDetails();
  }, [code]);

  const addQuestionHandler = () => {
    setAddQuestion(true);
  };

  const handleCopyLink = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        console.log('URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy URL:', error);
      });
  };

  return (
    <div className="container">
      <div className="left-button-center">
        <Link to="/createQuiz" className="go_back">
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </Link>
      </div>
      <div className="bottom-left-button">
        <Link to="/addInstruction" className="instructions">
          <FontAwesomeIcon icon={faPenToSquare} />
          <p> Add Instruction</p>
          <p className="instructive_text2">These instructions will be shown to the student before the start of the exam.</p>
        </Link>
      </div>
      <div className="center-area">
        <div className="topic-box">
        <div className="topic-box">
  <h1 className="topic">{quiz?.quizName}</h1>
</div>
        </div>
        {!addQuestion ? (
          <div className="question_box">
            <div onClick={addQuestionHandler} className="add-question">
              Add Question
            </div>
          </div>
        ) : (
          <AddQuestion />
        )}
      </div>
      <div className="icon-bar">
        <button className="icon-bar-menu icon-1" onClick={handleCopyLink}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <div className="copy_link">Copy Link</div>
        <Link to="" className="icon-bar-menu icon-2">
          <FontAwesomeIcon icon={faGear} />
        </Link>
        <div id="settings">Setting</div>
        <Link to="" className="icon-bar-menu icon-3">
          <FontAwesomeIcon icon={faCalendar} />
        </Link>
        <div id="result">Result</div>
        <Link to="/addInstruction" className="icon-bar-menu icon-4" id="instruction_icon">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
        <div id="instruct">Add Instruction</div>
      </div>
    </div>
  );
};
