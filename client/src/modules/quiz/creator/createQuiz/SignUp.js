import React from 'react'
// import prerna from './prerna.png';

const SignUp =()=>{
    return(
        <>
        <div id="outer_div" >
            <div id="div1">
            <form>
                <h1>Create Your Own Quiz</h1>
            
                <label for="starting_time">Start Time:</label>
                <input className="inputbox" type="date" id="starting_time"/><br/>
                <label for="last_login_time">Last login Time:</label>
                <input className="inputbox" type="date" id="last_login_time"/><br/>
                <label for="Result_time">Result Time:</label>
                <input className="inputbox" type="date" id="Result_time"/><br/>
               
                <p id="para">Question Timer: </p>
                
                <select id="para" name="question_time">
                <option selected>Individual Question Timer</option>
                <option >Section/Full Quiz Timer</option>
        
                </select><br/>
                
                <button className='button' type="button">Create Quiz</button>
                
                
            </form>

            </div>
        </div>
        </>
    )
}

export default SignUp;