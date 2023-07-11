import React from 'react';
import './PreviewInstructions.css';

import logo from  '.../assets/images/student/logo.png';
  const storedValues = ['The Instructions which are stored'];
  export default function PreviewInstructions () {
  return (
    <>
      
      <div className="instructions">
        <img src={logo} alt="" id="logo" />
        <h2>Instructions to the candidates</h2>

        <p className="lines">
          <i className="bx bxs-right-arrow"></i>
          Do not try to refresh your tab while taking the exam! The test will be submitted automatically!
        </p>

        <p className="lines">
          <i className="bx bxs-right-arrow"></i>
          Do not attempt to change the tab while taking the exam! The test will be submitted automatically!
        </p>

        <p className="lines">
          <i className="bx bxs-right-arrow"></i>
          Individual questions are timed, and you don't have any chance to answer them later!
        </p>

        <p className="lines">
          <i className="bx bxs-right-arrow"></i>
          Do not attempt to search on Google or use a secondary device. The timer has been set appropriately!
        </p>

        {storedValues.map((item, index) => (
          <p className="lines" key={index}>
            <i className="bx bxs-right-arrow"></i>
            {item}
          </p>
        ))}
<div id='correction'>
        <button id="start_btn">Start Test</button>
        </div>
      </div>
    </>
  );
}
