import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'


import './AddInstruction.css';
import logo from './logo.png';
export default function AddInstruction() {

  const [inputValue, setInputValue] = useState('');
  const [storedValues, setStoredValues] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleStoreValue = () => {
    const lines = inputValue.split('\n').filter((line) => line.trim() !== '');

    setStoredValues(lines);
    setInputValue('');
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
