import React from 'react'
//import logo from '../../../../assets/images/user/Logo enlarged-03.png'

import './Quizzing.css'

function Quizzing() {
  return (
    <div>
      <div className="quizzing-box">
        <div className="quizzing-container" id="quiz">
          <div className="quizzing-wrapper">
            <div className="quizzing-logo">
              <img src="" alt="logo" />
            </div>
            <br />
            <h1 id="subject" className="designh1"></h1>
          </div>

          <section id="nav">
            <div id="chance">
              <h5 className="whichtypeof">Relax Timer <span id="reltime">00:10</span></h5>
              <h5 className="whichtypeof1" align="left">Choose the Section :</h5>
            </div>

            <div id="quizzing-hide1">
              <div className="time maxwidth1 m_auto">
                <h2>Section Time Left : <span id="timeLeft">00:00</span></h2>
                <h2>Question Time Left : <span id="questionTimeLeft">00:00</span></h2>
              </div>

              <div id="help" className="maxwidth1 m_auto t_auto">
                <span id="green">Attempted <span id="attempted"> 0 </span></span>
                &nbsp; <span id="red">Missed <span id="missed">0 </span></span> &nbsp; Left <span id="left"></span>
              </div>
            </div>
            
          </section>

          <div className="quizzing-hide">
            <div id="progressBar" className="m_auto">
              <div id="progressBarFull" className="colorbar"></div>
            </div>

            
            <div id="singleCorrect" className="colorbar">
              <h2><span id="quizType">Objective Type Questions</span></h2>
              <div className="quizzing-header">
                <div className="dont">
                  <h4 id="question1">Question text : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, excepturi. Excepturi consectetur quod assumenda temporibus, sequi corporis, aliquam dolorum, ullam non sed nostrum id iure quis sapiente! In ducimus debitis enim itaque, recusandae quidem repellendus voluptatibus repellat, reiciendis laboriosam quas voluptas adipisci, sed quam totam cupiditate quibusdam. Aliquam, ipsa? Minima!</h4>
                  <img src="" alt="image" className="que_img"  />
                </div>
                <ul id="list"></ul>
              </div>
            </div>

            <div id="numerical">
              <h2><span id="quizType">Numerical Type Question</span></h2>
              <div className="quizzing-header">
                <div className="dont">
                  <h4 id="question2">Question text</h4>
                  <img src="" alt="" className="que_img"  />
                </div>
                <form autoComplete="off" onKeyDown={(event) => event.key !== 'Enter'}>
                  <h3><input id="numericalAns" type="text" /><br /></h3>
                </form>
              </div>
            </div>

            <div id="multiCorrect">
              <h2><span id="quizType">Multi Correct Question</span></h2>
              <div className="quizzing-header">
                <div className="dont">
                  <h4 id="question3">Question text</h4>
                  <img src="" alt="" className="que_img"/>
                </div>
                <ul id="listmul"></ul>
              </div>
            </div>

            <div className='quizzing-options-box'>
              <div className='quizzing-option'>22</div>
              <div className='quizzing-option'>58</div>
              <div className='quizzing-option'>102</div>
              <div className='quizzing-option'>08</div>
            </div>

            <button id="quizzing-submit">Next</button>
          </div>
        </div>

        <form method="POST">
          <input type="hidden" />
          <textarea name="answer" className="quizzing-hide" id="ans" style={{ display: 'none' }}></textarea><br />
          <textarea name="questions" className="quizzing-hide" id="all_questions_in_string" style={{ display: 'none' }}></textarea>
          <input type="submit" className="quizzing-hide" style={{ display: 'none' }} id="quiz_submit_button" value="submit test" />
        </form>
      </div>
    </div>
  )
}

export default Quizzing