import React, { useState, useEffect } from 'react';
import SubjectiveQuizPanel from './SubjectiveQuizPanel'; // Update the path

const SubjectiveQuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {

        fetch('`http://18.232.60.24:7000/quizzes')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setQuizzes(data.data);
                }
            })
            .catch(error => console.error('Error fetching quizzes:', error));
    }, []);

    return (
        <div>
            {quizzes.map(quiz => (
                <SubjectiveQuizPanel
                    key={quiz.id}
                    quizName={quiz.quizName}
                    modifiedDate={quiz.modifiedDate}
                />
            ))}
        </div>
    );
};

export default SubjectiveQuizList;
