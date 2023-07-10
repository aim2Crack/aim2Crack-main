import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'


import './AddInstruction.css';
import logo from '../../../../assets/images/quiz/logo.png'
export default function AddInstruction() {

  const [inputValue, setInputValue] = useState('');
  const [storedValues, setStoredValues] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      const code = window.location.pathname.split('/').pop();
      // Submit the data to the backend
      const response = await fetch(`http://127.0.0.1:7000/quizzes/${code}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }); 
       } catch (error) {
      console.error('Error submitting instriuction:', error);
      setMessage('An error occurred during submission.');
    }

    setSubmitting(false);
  };



  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // stroing instruction as array of strings
  const handleStoreValue = () => {
    const lines = inputValue.split('\n').filter((line) => line.trim() !== '');
  
    if (lines.length > 0) {
      const instructions = lines.map((line) => line.trim());
      setStoredValues([...storedValues, ...instructions]);
      setInputValue('');
    }
  };
  
    
  return (

    <div className="quiz-container">
      <div className="left-button-center">
        <Link to='/addQuestionHome' className="go_back"><FontAwesomeIcon icon={faCircleArrowLeft} /></Link>
      </div>
      <img src={logo} alt="" />
      <h2>ADD Instructions</h2>
      <form className="form-some">
        <textarea id="inst" cols="30" rows="10" placeholder="Write instructions here ..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
      <button className="submitb" onClick={handleStoreValue}>Update Instructions</button>
      <button className="submitb"  >Preview</button>

    </div>
  )
}
