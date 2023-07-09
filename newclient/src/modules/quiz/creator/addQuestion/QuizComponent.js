import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuizComponent = () => {
  const code = useParams();
  console.log(code);
//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:7000/quizzes/${code}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           // Handle the fetched data
//           console.log(data);
//         } else {
//           console.error('Error fetching quiz data:', response.status);
//           // Handle error response
//         }
//       } catch (error) {
//         console.error('Error fetching quiz data:', error);
//         // Handle fetch error
//       }
//     };

//     fetchQuizData();
//   }, [code]);

  // Rest of your component code
};

export default QuizComponent;
