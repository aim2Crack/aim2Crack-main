import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


import './AddQuestion.css'

function AddQuestion() {

  const [data, setData] = useState({
    //questionLevel: 'easy',
    questionTime: '',
    question: '',
    marks: 0,
    file: '',
    correctAnsInteger: '',
    explanation: '',

  });
  const [options, setOptions] = useState(['']);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [questionType, setQuestionType] = useState('objective');
  const [questionLevel, setQuestionLevel] = useState('easy');
  const [showHeading, setShowHeading] = useState(false);
  const [showButton, setShowButton] = useState({
    display: 'initial',
  });
  const [showCorrectAns, setShowCorrectAns] = useState({
    display: 'none',
  });
  const [saveConditionButton, setSaveConditionButton] = useState({
    display: 'none',
  });

  const handleChangeData = (e) => {
    //const name = e.target.name;
    //const value = e.target.value;
    const { name, value } = e.target;

    setData(prev => {
      return {
        ...prev, [name]: value
      }
    });
    //console.log(name, value);
  }

  const handleTypeChange = (event) => {
    setQuestionType(event.target.value);
    setOptions([]);
    if (event.target.value === "integer") {
      setShowCorrectAns({
        display: 'initial'
      })
      setShowButton({
        display: 'none'
      })
    }
    else if (event.target.value === "multiple" || event.target.value === "objective") {
      setShowCorrectAns({
        display: 'none'
      })
      setShowButton({
        display: 'initial'
      })
    }
  };
  const handleLevelChange = (event) => {
    setQuestionLevel(event.target.value);
  };

  const handleChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index] = event.target.value;
    setOptions(updatedOptions);
  };

  const handleAddFields = () => {
    const lastTextFieldValue = options[options.length - 1];

    if (lastTextFieldValue === '') {
      alert('Please fill the current text field');
      return;
    }
    setOptions([...options, { value: '' }]);
  };

  const handleRemoveFields = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  //console.log(options, "data-")

  const handleRadiobox = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    //console.log(value, checked);
    setCorrectOptions([]);
    if (checked) {
      setCorrectOptions([
        value
      ])
    }
    //console.log(correctOptions);
  }

  const handleCheckbox = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    //console.log(value, checked);
    if (checked) {
      setCorrectOptions([
        ...correctOptions, value
      ])
    }
    else {
      setCorrectOptions(correctOptions.filter((e) => (e !== value)));
    }
    //console.log(correctOptions);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const field1 = data.questionTime;
    const field2 = data.question;
    const field3 = data.explanation;

    if (field1 === '' || field2 === '' || field3 === '') {
      setShowHeading(true);
      setTimeout(() => {
        setShowHeading(false);
      }, 3000);
      //alert('Please fill all fields');
      setSaveConditionButton({
        display: 'initial'
      })
      return;
    }

    console.log('submitting');
    console.log(questionType);
    console.log(questionLevel);
    console.log(data);
    console.log(options);
    console.log(correctOptions);
  }

  const renderoptions = () => {
    return options.map((inputField, index) => (
      <div key={index} className='option1'>
        {questionType === 'objective' && (
          <input type="radio" name="o" value={'option ' + (index + 1)} onChange={handleRadiobox} />
        )}
        {questionType === 'multiple' && (
          <input type="checkbox" name="m" value={'option ' + (index + 1)} onChange={handleCheckbox} />
        )}
        {questionType === 'integer' && (
          <input type="text" id="hide" name="correct" value="" placeholder="Correct answer" />
        )}

        <input className='options_written' placeholder={'Option ' + (index + 1)}
          type="text"
          value={inputField.value}
          onChange={(event) => handleChange(index, event)}
        />
        <button className='delete_opt' type="button" onClick={() => handleRemoveFields(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
      </div>
    ));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST" id='top-level' >
        <div className="tostrip">
          Add New Question
        </div>
        <div className="main_box">
          {showHeading && (
            <div className="alert alert-error" style={saveConditionButton}>
              Please fill all the fields!
            </div>
          )}
          
          <div className='type_box'>
            <div className='type'>
              <label>Type:</label>
              <select id="questionType" value={questionType} onChange={handleTypeChange}>
                <option value="objective">Objective Type Question</option>
                <option value="multiple">Multiple Correct Question</option>
                <option value="integer">Integer Type Question</option>
              </select>
            </div>
            <div className='level'>
              <label>Level: </label>
              <select value={questionLevel} onChange={handleLevelChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="time">
              Time(s):
              <input type="number" id="quantity" name="questionTime" value={data.questionTime} onChange={handleChangeData} min="1" max="360" /><br />
            </div>
          </div>

          <textarea type="text" className="question" id="question" name="question" value={data.question} onChange={handleChangeData} placeholder="Write the question here" rows="2" cols="50" ></textarea>
          <div>
            <input type="file" name="file" value={data.file} onChange={handleChangeData} id="image-option" placeholder="Add Image" accept="image/*" />
          </div>

          {questionType && (
            <div>
              {renderoptions()}
              {
                <button type="button" className="add-option" id="BUTTON" style={showButton} onClick={handleAddFields}>
                  <FontAwesomeIcon className='faPlus' icon={faPlus} /> Add Options</button>
              }

            </div>
          )}

          <input type='number' id="hide" name="correctAnsInteger" value={data.correctAnsInteger} onChange={handleChangeData} style={showCorrectAns} placeholder="Correct answer" />
          <div className="explanation">
            <textarea type="text" id="exp" className="resize fix" name="explanation" value={data.explanation} onChange={handleChangeData} min="1" max="1000" placeholder="explanation" ></textarea>
          </div>
          <div className="last">
            <input className="btn" id="save_btn" type="submit" value="Save" placeholder="save" />
          </div>

        </div>
      </form>
      <script src="https://kit.fontawesome.com/7e7a25b297.js" crossorigin="anonymous"></script>
    </div>
  )
}

export default AddQuestion