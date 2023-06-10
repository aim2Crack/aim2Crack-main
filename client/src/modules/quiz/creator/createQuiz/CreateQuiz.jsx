import React,{useState} from 'react'

const SignUp=()=>{
    const [selectedOption, setSelectedOption] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue2] = useState('');
    

    const [labelText, setLabelText] = useState('Course Quiz :');
    const [labelText2,setLabelText2] = useState('Topic name :')
  
    const handleSelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setInputValue('');
    setInputValue2('');
   


    // Update the input value and label text based on the selected option
    if (selectedValue === 'placement') {
      
      setLabelText('Company Name:');
      setLabelText2('First section name');
    } else if (selectedValue === 'simple') {
      
      setLabelText('Course Quiz:');
      setLabelText2('Topic name')
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
  };
  const handleInputChange1 = (e) => {
    setInputValue2(e.target.value);
    
  };


  return(
    <div id="outer_div">
        <div id="div1">
        <form>
                <h1 className='heading'>Create Your Own Quiz</h1>
        <p className='select'>Type of Quiz : </p>        
        
      <select className="custom-select" value={selectedOption} onChange={handleSelect}>
        <option value="">Select an option</option>
        <option value="placement">Placement Quiz</option>
        <option value="simple">Simple Quiz</option>
      </select><br/>

      <label className="custom-label">{labelText}</label>

      <input
        type="text"
        className="custom-input"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={labelText}
      /><br/>
      <label className="custom-label">{labelText2}</label>

      <input
        type="text"
        className="custom-input"
        value={inputValue1}
        onChange={handleInputChange1}
        placeholder={labelText2}
      />
    <br/>
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
export default SignUp;