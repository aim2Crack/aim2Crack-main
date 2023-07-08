import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './createquiz.css';

const CreateQuiz = () => {
  const initialValues = {
    quizName: '',
    startTime: '',
    marginTime: '',
    resultTime: '',
  };
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values) => {
    const token = localStorage.getItem('token');
    
    fetch('http://127.0.0.1:7000/quizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          return response.json();
        } else {
          // Handle error response
          console.error('User registration request failed:', response.status);
          throw new Error('An error occurred during user registration.');
        }
      })
      .catch((error) => {
        // Handle any network or other errors
        console.error('User registration request failed:', error);
        setMessage('An error occurred during user registration.');
        setSubmitted(false);
      });
  };

  const validationSchema = Yup.object().shape({
    quizName: Yup.string().required('Quiz name is required'),
    startTime: Yup.date().required('Start time is required'),
    marginTime: Yup.date().required('Last login time is required'),
    resultTime: Yup.date()
      .required('Result time is required')
      .min(Yup.ref('startTime'), 'Result time must be greater than start time'),
  });

  return (
    <div id="outer_div">
      <div id="div1">
        {submitted ? (
          <div>{message}</div>
        ) : (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <h1 className="heading">Create Your Own Quiz</h1>

              <div id="label">
                <label className="custom-label" htmlFor="quizName">
                  Course Quiz:
                </label>
                <Field type="text" id="quizName" name="quizName" className="custom-input" />
                <ErrorMessage name="quizName" component="div" className="error-message" />
              </div>
              <div id="input1">
                <label className="inputbox" htmlFor="startTime">
                  Start Time:
                </label>
                <Field type="date" id="startTime" name="startTime" className="inputbox" />
                <ErrorMessage name="startTime" component="div" className="error-message" />
              </div>

              <div id="input2">
                <label className="inputbox" htmlFor="marginTime">
                  Last login Time:
                </label>
                <Field type="date" id="marginTime" name="marginTime" className="inputbox" />
                <ErrorMessage name="marginTime" component="div" className="error-message" />
              </div>

              <div id="input3">
                <label className="inputbox" htmlFor="resultTime">
                  Result Time:
                </label>
                <Field type="date" id="resultTime" name="resultTime" className="inputbox" />
                <ErrorMessage name="resultTime" component="div" className="error-message" />
              </div>
              <div id="submit">
                <button type="submit" id="button">
                  Create Quiz
                </button>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
