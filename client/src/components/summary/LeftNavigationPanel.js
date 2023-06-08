import React from "react";
import '../styles/LeftNavigationPanel.css'

const LeftNavigationPanel = () => {
  return (
    <>
      <div className="blur"></div>
      <div className="h-93 w-100">
        <div className="navbar-container"></div>
        <div className="panel-container">
          <div className="side-navigation-container">
            <div className="side-bar" id="side-navigation">
              <h1>Dashboard</h1>

              <button className="dropdown-btn side-bar-item">
                Quiz
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-container">
                <a id="btn-subjective-quiz" href="#">Subjective Quiz</a>
                <a id="btn-placement-quiz" href="#">Placement Quiz</a>
              </div>
              <button className="dropdown-btn side-bar-item">
                Book
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-container">
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
        </div>
      </div>
    </>
  );
};

export default LeftNavigationPanel;
