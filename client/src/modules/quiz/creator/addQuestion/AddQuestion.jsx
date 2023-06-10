import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


import './AddQuestion.css'

function AddQuestion() {
  const [question, setQuestion] = useState({
    question: '',
    marks: 0,
  });

  const [inputFields, setInputFields] = useState([]);
  const [questionType, setQuestionType] = useState('objective');
  const [questionLevel, setQuestionLevel] = useState('easy');

  const handleTypeChange = (event) => {
    setQuestionType(event.target.value);
    setInputFields([]);
  };
  const handleLevelChange = (event) => {
    setQuestionLevel(event.target.value);
  };

  const handleChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { value: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  console.log(inputFields, "data-")

  const renderInputFields = () => {
    return inputFields.map((inputField, index) => (
      <div key={index} className='option1'>
        {questionType === 'objective' && (
          <input type="radio" name="option2" />
        )}
        {questionType === 'multiple' && (
          <input type="checkbox" name="option" />
        )}
        {questionType === 'integer' && (
          <input type="number" name="option" />
        )}
        <input className='options_written' placeholder='Option'
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
      <form method="POST" enctype="multipart/form-data" style={{ margin: '120px auto' }}>
        <input type="hidden" name="csrfmiddlewaretoken" value="izC60ZhqKbNnVHyicnYYQ2i70qluvWYhJw2voJoaACH7ooI8xe7P4id6qfRdnOJy" />

        <div className="tostrip">
          Add New Question
        </div>
        <div className="main_box">
          <div className="alert alert-error">
            Please fill all the fields!
          </div>

          <div className='type_box'>
            <div className='type'>
              <label htmlFor="questionType">Type:</label>
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
          </div>
          <textarea name="question" type="text" className="question" id="question" placeholder="Write the question here" rows="2" cols="50" style={{ height: '71px' }}></textarea>
          <div>
            <input type="file" name="photo" id="image-option" placeholder="Add Image" accept="image/*" style={{ marginBottom: '15px', background: '#3b7474', color: 'white', padding: '5px 0.4rem' }} />
          </div>
          {questionType && (
            <div>
              {renderInputFields()}
              <button type="button" className="add-option" id="BUTTON" onClick={handleAddFields}>
              <FontAwesomeIcon className='faPlus' icon={faPlus} /> Add Options</button>
            </div>
          )}

          <input type="text" id="hide" name="correct" value="b+c" placeholder="Correct answer" />
          <div className="explanation">
            <textarea type="text" id="exp" className="resize fix" name="explanation" min="1" max="1000" placeholder="explanation" style={{ height: '71px' }}></textarea>
          </div>
          <div id="ending_options">
            <textarea data-row="0" className="options_all" name="options" style={{ display: 'none' }} placeholder="Option">jhgyuf/.\fgdfsgdf/.\fdgshdgh/.\</textarea>
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