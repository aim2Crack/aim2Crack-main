import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import './results.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // Import react-tabs components
import 'react-tabs/style/react-tabs.css'; // Import the default styling for react-tabs


const ResultSummary = () => {
  const [quizDetails, setQuizDetails] = useState([]);
  const [studentDetails, setStudentDetails] = useState({}); // Initialize as an empty object

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

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        // Create an array to store all the student IDs
        const studentIds = quizDetails.map((quizResult) => quizResult.studentId);

        // Fetch student details for each student ID and store in an object
        const studentDetailsObj = {};
        for (const studentId of studentIds) {
          const response = await fetch(`http://localhost:7000/users/${studentId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            studentDetailsObj[studentId] = data;
          } else {
            console.error('Failed to fetch student details:', response.status);
          }
        }

        console.log(studentDetailsObj);
        setStudentDetails(studentDetailsObj); // Update the state with fetched student details
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    if (quizDetails.length > 0) {
      fetchStudentDetails();
    }
  }, [quizDetails]);

  // Conditional rendering when studentDetails or quizDetails are not available yet
  if (Object.keys(studentDetails).length === 0 || quizDetails.length === 0) {
    return <div>Loading...</div>;
  }

  const handleCSVDownload = () => {
    const csvData = quizDetails.map((quizResult) => ({
      ...quizResult,
      studentName: studentDetails[quizResult.studentId].userName,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'quiz_results.csv');
  };

  return (
    <div>
      <h1>Quiz Result Page</h1>
      <Tabs>
        <TabList>
          <Tab>Summary Result</Tab>
          <Tab>Detailed Result</Tab>
          <Tab>Analytics</Tab>
        </TabList>

        {/* First Tab: Table */}
        <TabPanel>
          <table className="table"> {/* Use "table" class from the CSS file */}
            <thead>
              <tr>
                <th>Serial No</th>
                {/* <th>Quiz ID</th> */}
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Last Name</th>
                <th>Total Score</th>
                <th>Total Correct</th>
                <th>Total Unattempted</th>
                <th>Total Wrong</th>
              </tr>
            </thead>
            <tbody>
              {quizDetails.map((quizResult, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {/* <td>{quizResult.quizId}</td> */}
                  <td>{studentDetails[quizResult.studentId].rollNo}</td>
                  <td>{studentDetails[quizResult.studentId].firstName}</td>
                  <td>{studentDetails[quizResult.studentId].lastName}</td>
                  <td>{quizResult.totalScore}</td>
                  <td>{quizResult.totalCorrect}</td>

                  <td>{quizResult.totalUnattempt}</td>
                  <td>{quizResult.totalWrong}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleCSVDownload}>Download Summary CSV</button>
        </TabPanel>

        {/* Second Tab: Detailed Table */}
        <TabPanel>
          {/* Add the detailed table content here */}
        </TabPanel>

        {/* Third Tab: Graphs */}
        <TabPanel>
          {/* Add the graphs content here */}
        </TabPanel>
      </Tabs>

    </div>
  );
};

export default ResultSummary;
