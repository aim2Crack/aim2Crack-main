import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [quizData, setQuizData] = useState({
    startTime: '',
    marginTime: '',
    resultTime: '',
    quizName: '',
    negativeMarking: 0,
    preventMobile: false,
    allowTabchange: false,
  });

  useEffect(() => {
    // Fetch quiz details from the backend
    fetchQuizDetails();
  }, []);

  const fetchQuizDetails = async () => {
    try {
      // Make an API call to fetch quiz details
      const token = localStorage.getItem('token');
      const code = window.location.pathname.split('/').filter((path) => path !== 'settings').pop();
      const response = await fetch(`http://127.0.0.1:7000/quizzes/${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // Include any other headers required by your API
        },
      });

      if (response.ok) {
        const quizDetail = await response.json();
        // Update the form state with the fetched quiz details
        const quizDetails = quizDetail.data;
        setQuizData({
          startTime: quizDetails.startTime.slice(0, 16),
          marginTime: quizDetails.marginTime.slice(0, 16),
          resultTime: quizDetails.resultTime.slice(0, 16),
          quizName: quizDetails.quizName,
          negativeMarking: quizDetails.negativeMarking,
          preventMobile: quizDetails.preventMobile,
          allowTabchange: quizDetails.allowTabchange,
        });
        console.log(quizDetails);
      } else {
        console.error('Failed to fetch quiz details');
      }
    } catch (error) {
      console.error('Error occurred while fetching quiz details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setQuizData({
        ...quizData,
        [name]: checked,
      });
    } else {
      setQuizData({
        ...quizData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const code = window.location.pathname.split('/').filter((path) => path !== 'settings').pop();

      const response = await fetch(`http://127.0.0.1:7000/quizzes/${code}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // Include any other headers required by your API
        },
        body: JSON.stringify({
          ...quizData,
          startTime: quizData.startTime + ':00.000Z',
          marginTime: quizData.marginTime + ':00.000Z',
          resultTime: quizData.resultTime + ':00.000Z',
        }),
      });

      if (response.ok) {
        // Quiz details updated successfully
        console.log('Quiz details updated successfully');
      } else {
        console.error('Failed to update quiz details');
      }
    } catch (error) {
      console.error('Error occurred while updating quiz details:', error);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <div>
          <label>Quiz Name:</label>
          <input
            type="text"
            name="quizName"
            value={quizData.quizName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={quizData.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Margin Time:</label>
          <input
            type="datetime-local"
            name="marginTime"
            value={quizData.marginTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Result Time:</label>
          <input
            type="datetime-local"
            name="resultTime"
            value={quizData.resultTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Negative Marking:</label>
          <input
            type="number"
            name="negativeMarking"
            value={quizData.negativeMarking}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Prevent Mobile:</label>
          <input
            type="checkbox"
            name="preventMobile"
            checked={quizData.preventMobile}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Allow Tab Change:</label>
          <input
            type="checkbox"
            name="allowTabchange"
            checked={quizData.allowTabchange}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Settings;
