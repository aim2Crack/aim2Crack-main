import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './AddQuestion.css';
import MyckEditor from '../../../../components/ckeditor/ckeditor';;

function AddQuestion({ editQuestionData, onClose }) {
  const [data, setData] = useState({
    questionTime: 60,
    question: '',
    marks: 1,
    file: '',
    correctAnsInteger: '',
    explanation: '',
  });
  const [options, setOptions] = useState(['']);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [questionType, setQuestionType] = useState('single');
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
  const [submitted, setSubmitted] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  // const fetchData = async () => {
  //   const token = localStorage.getItem('token');
  //   const code = window.location.pathname.split('/').pop();
  //   const id = 23;
  //   const response = await fetch(`http://127.0.0.1:7000/quizquestion/${code}/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     setFetchedData(data);
  //   } else {
  //     console.error('Failed to fetch data:', response.status);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleCancel = () => {
    // Call the onClose function to close the AddQuestion component
    onClose();
  };

  const handleChangeData = async (values) => {
    const token = localStorage.getItem('token');
    const code = window.location.pathname.split('/').pop();
    console.log(code);
    const response = await fetch(`http://127.0.0.1:7000/quizquestion/${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    setSubmitted(true);
  };

  const handleTypeChange = (event) => {
    setQuestionType(event.target.value);
    setOptions([]);
    if (event.target.value === 'numerical') {
      setShowCorrectAns({
        display: 'initial',
      });
      setShowButton({
        display: 'none',
      });
    } else if (event.target.value === 'multiple' || event.target.value === 'single') {
      setShowCorrectAns({
        display: 'none',
      });
      setShowButton({
        display: 'initial',
      });
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

  const handleRadiobox = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setCorrectOptions([]);
    if (checked) {
      setCorrectOptions([value]);
    }
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setCorrectOptions([...correctOptions, value]);
    } else {
      setCorrectOptions(correctOptions.filter((e) => e !== value));
    }
  };



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
      setSaveConditionButton({
        display: 'initial',
      });
      return;
    }

    const questionData = {
      questionType,
      questionLevel,
      questionTime: data.questionTime,
      question: data.question,
      marks: data.marks,
      correctAnsInteger: data.correctAnsInteger,
      explanation: data.explanation,
      options: options.map((option, index) => ({
        value: option,
        isCorrect: correctOptions.includes(`option ${index + 1}`),
      })),
    };
    console.log(questionData);
    handleChangeData(questionData);

    window.location.reload();
  };

  const renderOptions = () => {
    return options.map((inputField, index) => (
      <div key={index} className="option1">
        {questionType === 'single' && (
          <input type="radio" name="o" value={'option ' + (index + 1)} onChange={handleRadiobox} />
        )}
        {questionType === 'multiple' && (
          <input type="checkbox" name="m" value={'option ' + (index + 1)} onChange={handleCheckbox} />
        )}
        {questionType === 'numerical' && <input type="text" id="hide" name="correct" value="" placeholder="Correct answer" />}

        <input
          className="options_written"
          placeholder={'Option ' + (index + 1)}
          type="text"
          value={inputField.value}
          onChange={(event) => handleChange(index, event)}
        />
        <button className="delete_opt" type="button" onClick={() => handleRemoveFields(index)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    ));
  };

  return (
    <div className="add-question-container">
      {!submitted && (
        <form onSubmit={handleSubmit} method="POST" id="top-level">
          <div className="addQuestion-main_box">
            {showHeading && (
              <div className="alert alert-error" style={saveConditionButton}>
                Please fill all the fields!
              </div>
            )}

            <div className="type_box">
              <div className="type">
                <label>Type:</label>
                <select id="questionType" value={questionType} onChange={handleTypeChange}>
                  <option value="single">Objective Type Question</option>
                  <option value="multiple">Multiple Correct Question</option>
                  <option value="numerical">Integer Type Question</option>
                </select>
              </div>
              <div className="level">
                <label>Level: </label>
                <select value={questionLevel} onChange={handleLevelChange}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="time">
                Time(s):
                <input
                  type="number"
                  id="quantity"
                  name="questionTime"
                  value={data.questionTime}
                  onChange={(e) => setData({ ...data, questionTime: e.target.value })}
                  min="1"
                  max="360"
                />
              </div>
              <div className="mark">
                Mark:
                <input
                  type="number"
                  id="quantity"
                  name="mark"
                  value={data.marks}
                  onChange={(e) => setData({ ...data, marks: e.target.value })}
                  min="1"
                  max="100"
                />
              </div>

            </div>


            {/* <textarea
              type="text"
              className="question2"
              id="question"
              name="question"
              value={data.question}
              onChange={(e) => setData({ ...data, question: e.target.value })}
              placeholder="Write the question here"
              rows="2"
              cols="50"
            ></textarea> */}
            <div className='question2'>
              Enter the question below:
            </div>

            <MyckEditor
              data={data.question}
              placeholder="Write the question here"
              onChange={(content) => setData({ ...data, question: content })}
            />
            <div className='question2'>
              Enter the options and select correct answer:
            </div>

            {questionType && (
              <div>
                {renderOptions()}
                <button type="button" className="add-option" id="add-BUTTON" style={showButton} onClick={handleAddFields}>
                  <FontAwesomeIcon className="faPlus" icon={faPlus} /> Add Options
                </button>
              </div>
            )}

            <input
              type="number"
              id="hide"
              name="correctAnsInteger"
              value={data.correctAnsInteger}
              onChange={(e) => setData({ ...data, correctAnsInteger: e.target.value })}
              style={showCorrectAns}
              placeholder="Correct answer"
            />
            <div className='question2'>
              Enter the explanation:
            </div>
            <MyckEditor
              data={data.explanation}
              placeholder="Write the explanation here"
              onChange={(content) => setData({ ...data, explanation: content })}
            />
            <div className="add-question-last">
              <input className="add-question-btn" id="save_btn" type="submit" value="Save" placeholder="save" />
              <button className="add-question-btn" id="cancel_btn" type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>

        </form>

      )}
      <script src="https://kit.fontawesome.com/7e7a25b297.js" crossOrigin="anonymous"></script>
      {fetchedData && (
        <div>
          {/* <p>Fetched Data: {JSON.stringify(fetchedData)}</p> */}
        </div>
      )}
    </div>
  );
}

export default AddQuestion;
