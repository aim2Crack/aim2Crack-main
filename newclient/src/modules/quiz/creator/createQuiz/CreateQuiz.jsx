import {useState} from 'react'
import "./createquiz.css";
const CreateQuiz=()=>{
    const [selectedOption, setSelectedOption] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue2] = useState('');
    

    const [labelText, setLabelText] = useState('Course Quiz :');
    const [labelText2,setLabelText2] = useState('Topic name :');
  
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (selectedOption === '' || inputValue === '' || inputValue1 === '') {
      alert('Please fill in all the details to continue!');
    } else {
      // Form submission logic
      console.log('Form submitted successfully!');
    }
  };

  return(
    <div id="outer_div">
        <div id="div1">
        <form onSubmit={handleSubmit}>
             
                <h1 className='heading'>Create Your Own Quiz</h1>
                <div>
        <div  id="select">
           Type of Quiz:    
        <select className="custom-select" value={selectedOption} onChange={handleSelect}>
        <option value="">Select an option</option>
        <option value="placement">Placement Quiz</option>
        <option value="simple">Simple Quiz</option>
      </select>
      </div>

      <div id="label">
      <label className="custom-label">{labelText}</label>

      <input
        type="text"
        className="custom-input"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={labelText}
        />
      </div>
      
      <div id="label">
      <label className="custom-label">{labelText2}</label>

      <input
        type="text"
        className="custom-input"
        value={inputValue1}
        onChange={handleInputChange1}
        placeholder={labelText2}
      />
      </div>
    
      <div id="input1">
            <label className="inputbox" for="starting_time">Start Time:</label>
                <input className="inputbox" type="date" id="starting_time"/>
                </div>
                <div id="input2">
                   <label className="inputbox" for="last_login_time">Last login Time:</label>
                    <input className="inputbox" type="date" id="last_login_time"/><br/>
                </div>
               
                <div id="input3">
                  <label className="inputbox" for="Result_time">Result Time:</label>
                  <input className="inputbox" type="date" id="Result_time"/>
                </div>

                <div id="input4">
                <span>Question Timer: </span>
                 <select id="question" name="question_time">
                  <option selected>Individual Question Timer</option>
                <option >Section/Full Quiz Timer</option></select>
    
    </div>
               <div id="submit">
                    <input type="submit" id="button" value="Create Quiz"/>
                </div> 
                </div>
                
            </form>
   </div>
        </div>
    )
}
export default CreateQuiz;