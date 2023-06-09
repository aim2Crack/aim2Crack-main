import React from 'react'

const createquiz=()=>{
    return(
        <div id="outer_div">
        <div id="div1">
        <form>
                <h1 className='heading'>Create Your Own Quiz</h1>
                <label className="inputbox" for="starting_time">Start Time:</label>
                <input className="inputbox" type="date" id="starting_time"/><br/>
                <label className="inputbox" for="last_login_time">Last login Time:</label>
                <input className="inputbox" type="date" id="last_login_time"/><br/>
                <label className="inputbox" for="Result_time">Result Time:</label>
                <input className="inputbox" type="date" id="Result_time"/><br/>
                <p id="para">Question Timer: </p>
                <select id="question" name="question_time">
                <option selected>Individual Question Timer</option>
                <option >Section/Full Quiz Timer</option>
        
                </select><br></br>
                <button class="button" type="button">Create Quiz</button>
                
            </form>
   </div>
        </div>
    )
}
export default createquiz;