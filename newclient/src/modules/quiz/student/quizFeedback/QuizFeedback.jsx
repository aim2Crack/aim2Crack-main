import React from 'react';

import './QuizFeedback.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import smileyFace from '../../../../assets/images/student/undraw_Smiley_face_re_9uid.svg'
import logo from '../../../../assets/images/user/Logo enlarged-03.png'
import { useState } from 'react';

const QuizFeedback = () => {

    const [rating1, setRating1] = useState(0);
    const [rating2, setRating2] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleStarClick1 = (starIndex) => {
        setRating1(starIndex);
        //console.log(`Rated ${starIndex} stars.`)
    };
    const handleStarClick2 = (starIndex) => {
        setRating2(starIndex);
        //console.log(`Rated ${starIndex} stars.`)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("saved");
        setSubmitted(true);
    };

    return (
        <div>
            {submitted ? (
                <>
                    <div>
                        <img src= {logo} className="logo_head" />
                    </div>
                    <div className="main_box">
                        <div className="quizFeedback-heading">
                            <h2>Thank you for your valuable feedback.</h2>
                        </div>
                    </div>
                </>
            ) : (
                <>
            <a href="/" className="quizFeedback-home">
                <FontAwesomeIcon icon={faHome} />
            </a>
            <div className="news">
                <div className="score">
                    <img src={smileyFace} alt="" />
                    <div className="your">
                        <h2>0/9</h2>
                    </div>
                </div>
                <div className="report">
                    <h2>Summary</h2>
                    <div className="right_arrow">
                        <FontAwesomeIcon className='summary-dot' icon={faCircle} />
                        <p>Total number of questions: 9</p>
                    </div>
                    <div className="right_arrow">
                        <FontAwesomeIcon className='summary-dot' icon={faCircle} />
                        <p>Attempted questions: 0 / 9</p>
                    </div>
                    <div className="right_arrow">
                        <FontAwesomeIcon className='summary-dot' icon={faCircle} />
                        <p>Questions not attempted: 9 / 9</p>
                    </div>
                    <div className="right_arrow">
                        <FontAwesomeIcon className='summary-dot' icon={faCircle} />
                        <p>correctly answered questions: 0 / 9</p>
                    </div>
                    <div className="right_arrow" style={{ justifyContent: 'center' }}>
                        <a href="./result" className="quizFeedback-btn">
                            View Result
                        </a>
                    </div>
                </div>
            </div>

            <div className="videos">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/UCZIJI5HVeM"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/SKmkFOs6a4A"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/3klNnH13t4U"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="quizFeedback-container">
                <form method="POST" onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="csrfmiddlewaretoken"
                        value="bUIN4NhASn6qJIBGgEwpGRqo4THpgxsmvBQ07w9CN422gzmQXqZdRvHzKOnHtxeI"
                    />

                    <h1 className="shadow">Feedback</h1>
                    <h2 className="centre" style={{ fontWeight: 'bold' }}>
                        Your feedback is valuable to us!!
                    </h2>

                    <h2></h2>

                    <div className="question-list">
                        <h3 className="centre">Mark the difficulty level of the quiz.</h3>
                        <div
                            className="quizFeedback-question"
                        >
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <FontAwesomeIcon
                                    key={starIndex}
                                    icon={faStar}
                                    className={`star ${starIndex <= rating1 ? 'active1' : ''}`}
                                    onClick={() => handleStarClick1(starIndex)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="question-list">
                        <h3 className="centre">How sufficient the time of the quiz was?</h3>
                        <div
                            className="quizFeedback-question"
                        >
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <FontAwesomeIcon
                                    key={starIndex}
                                    icon={faStar}
                                    className={`star ${starIndex <= rating2 ? 'active2' : ''}`}
                                    onClick={() => handleStarClick2(starIndex)}
                                />
                            ))}
                        </div>
                    </div>

                    <input type="submit" className="quizFeedback-submit s" value="Submit" />

                </form>
            </div>
            </>
            )}
        </div>
    );
};

export default QuizFeedback;
