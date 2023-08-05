import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const ResultSummary = () => {
  const [quizDetails, setQuizDetails] = useState([]);

  useEffect(() => {
    const fetchResultDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const code = window.location.pathname.split('/')[2];

        const response = await fetch(`http://localhost:7000/studentresult/${code}/all`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setQuizDetails(data.data); // Update the state with fetched quiz details
        } else {
          console.error('Failed to fetch quiz details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    fetchResultDetails();
  }, []);

  // Conditional rendering when quizDetails is not available yet
  if (quizDetails.length === 0) {
    return <div>Loading...</div>;
  }


  const handleCSVDownload = () => {
    const csv = Papa.unparse(quizDetails);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'quiz_results.csv');
  };
  
  return (
    <div>
      <h1>Quiz Result Page</h1>
      <table>
        <thead>
          <tr>
            <th>Quiz ID</th>
            <th>Student ID</th>
            <th>Total Correct</th>
            <th>Total Score</th>
            <th>Total Unattempted</th>
            <th>Total Wrong</th>
             </tr>
        </thead>
        <tbody>
          {quizDetails.map((quizResult, index) => (
            <tr key={index}>
              <td>{quizResult.quizId}</td>
              <td>{quizResult.studentId}</td>
              <td>{quizResult.totalCorrect}</td>
              <td>{quizResult.totalScore}</td>
              <td>{quizResult.totalUnattempt}</td>
              <td>{quizResult.totalWrong}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCSVDownload}>Download CSV</button>
    </div>
  );
};

export default ResultSummary;
