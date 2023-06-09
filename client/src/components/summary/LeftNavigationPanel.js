import React, {useState} from "react";
import '../styles/LeftNavigationPanel.css'
import {Link} from "react-router-dom";

const LeftNavigationPanel = () => {
    const [quizDropdown, setQuizDropdown] = useState( false)
    const [bookDropdown, setBookDropdown] = useState(false)
    return (
        <div className="side-navigation-container">
            <div className="side-bar" id="side-navigation">
                <h1>Dashboard</h1>

                <button className="dropdown-btn side-bar-item" onClick={() => setQuizDropdown(!quizDropdown)}>
                    Quiz
                    <i className="fa fa-caret-down"></i>
                </button>
                {quizDropdown &&
                    <div className="dropdown-container">
                    <Link to="/subjective-quiz" id="btn-subjective-quiz">Subjective Quiz</Link>
                    <Link to="/placement-quiz" id="btn-placement-quiz">Placement Quiz</Link>
                    </div>

            }


                <button className="dropdown-btn side-bar-item">
                    Book
                    <i className="fa fa-caret-down"></i>
                </button>

                {bookDropdown && <div className="dropdown-container">
                    <a id="btn-your-books" href="#">Your Books</a>
                    <a id="btn-your-collections" href="#">Your Collections</a>
                </div>

                <button className="side-bar-item" id="btn-assignment">
                    Assignments
                </button>
                <button className="side-bar-item">
                    Tutorials
                </button>
            </div>
            <div id="side-navigation-arrow">
                <i className="fa-solid fa-angle-right icons" id="side-navigation-arrow "></i>
            </div>
        </div>
    );
};

export default LeftNavigationPanel;
