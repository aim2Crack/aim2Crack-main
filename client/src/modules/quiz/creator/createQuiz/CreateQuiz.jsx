import React from 'react';
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

  const validationSchema = Yup.object().shape({
    // quizType: Yup.string().required('Quiz type is required'),
    quizName: Yup.string().required('Quiz name is required'),
    // topicName: Yup.string().required('Topic name is required'),
    startTime: Yup.date().required('Start time is required'),
    marginTime: Yup.date().required('Last login time is required'),
    resultTime: Yup.date()
      .required('Result time is required')
      .min(Yup.ref('startTime'), 'Result time must be greater than start time'),
    // questionTimer: Yup.string().required('Question timer is required')
  });
  

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div id="outer_div">
      <div id="div1">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <h1 className='heading'>Create Your Own Quiz</h1>

            <div id="label">
              <label className="custom-label" htmlFor="quizName">Course Quiz:</label>
              <Field type="text" id="quizName" name="quizName" className="custom-input" />
              <ErrorMessage name="quizName" component="div" className="error-message" />
            </div>
            <div id="input1">
              <label className="inputbox" htmlFor="startTime">Start Time:</label>
              <Field type="date" id="startTime" name="startTime" className="inputbox" />
              <ErrorMessage name="startTime" component="div" className="error-message" />
            </div>

            <div id="input2">
              <label className="inputbox" htmlFor="marginTime">Last login Time:</label>
              <Field type="date" id="marginTime" name="marginTime" className="inputbox" />
              <ErrorMessage name="marginTime" component="div" className="error-message" />
            </div>

            <div id="input3">
              <label className="inputbox" htmlFor="resultTime">Result Time:</label>
              <Field type="date" id="resultTime" name="resultTime" className="inputbox" />
              <ErrorMessage name="resultTime" component="div" className="error-message" />
            </div>
            <div id="submit">
              <button type="submit" id="button">Create Quiz</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateQuiz;
