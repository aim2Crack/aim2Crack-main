import React from 'react'
import './PreviewInstructions.css';
import PropTypes from 'prop-types'
import logo from '../../../../assets/images/quiz/logo.png'

export default function PreviewInstructions(props) {
  return (

    <>
      <div className="fresh">
      </div>
      <div className="instructions-content">
        <img src={logo} alt="" id="logo" />
        <h2>
          Instructions to the candidates
        </h2>


        <p class="lines">
          <i class='bx bxs-right-arrow'></i>
          Do not try to refresh your tab while taking the exam! Test will be submitted automatically !
        </p>

        <p class="lines">
          <i class='bx bxs-right-arrow'></i>
          Do not attempt to change the tab while taking the exam! Test will be submitted automatically !
        </p>
        <p class="lines">
          <i class='bx bxs-right-arrow'></i>
          Individual questions are timed, you don't have any chance to answer it later!
        </p>
        <p class="lines" >
          <i class='bx bxs-right-arrow'></i>
          Do not attempt to google search on a secondary device, the timer has been set appropriately!
        </p>



        {props.data.map((item, index) => (
          <p className="lines" key={index}><i className='bx bxs-right-arrow'></i>{item}</p>
        ))}




        <p className="lines" id="bnd" >
          <i className='bx bxs-right-arrow' ></i>
          Your chance to take this quiz will end in: <span id="the_timer" >8789</span></p>

        <button className="btn-back" >Go Back</button>




      </div>

    </>

  )

}
