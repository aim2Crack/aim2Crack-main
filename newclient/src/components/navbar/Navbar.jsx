import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import aim2CrackLogo from '../../assets/images/navbar/Aim2Crack-logo.png'
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import jwt from 'jsonwebtoken';

function Navbar() {
  const excludedPaths = ['/register', '/login', '/forgot-password'];
  const location = useLocation();
  const isExcludedPath = excludedPaths.includes(location.pathname);

  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('token'); // Get the JWT token from local storage

  //   if (token) {
  //     const decodedToken = decodeToken(token); // Function to decode the JWT token
  //     const userName = decodedToken.name; // Extract the user's name from the decoded token
  //     setUser({ name: userName });
  //   }
  // }, []);

  if (isExcludedPath) {
    return null; // Render nothing if the current path is excluded
  }
  const myFunction = () => {}
  const openNav = () => {}
  return (
    <header>
      <img className="logo" src={aim2CrackLogo} alt="logo" title="home" />

      <nav className="main-menu">
        <ul className="nav_links">
          <li><a href="#">Home</a></li>
          <li><a href="/summary">Dashboard</a></li>
          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">Quizzes</a>
            <div className="dropdown-content">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>Create Quiz</span>
                <small>and analyze results</small>
              </a>
              <a className="nav-subjective-btn" target="_blank" rel="noopener noreferrer">
                <span>Subjective Quiz</span>
                <small>See past results</small>
              </a>
              <a className="nav-placement-btn" target="_blank" rel="noopener noreferrer">
                <span>Placement Quiz</span>
                <small>See past results</small>
              </a>
            </div>
          </li>

          {/* DROPDOWN - HR, Interviews, Aptitude */}
          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">Placements</a>
            <div className="dropdown-content">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>HR Questions</span>
                <small>abc</small>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>Interviews</span>
                <small>abc</small>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>Puzzles</span>
                <small>abc</small>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>Apt Crack</span>
                <small>abc</small>
              </a>
            </div>
          </li>

          <li><a href="#">Talks</a></li>

          {/* DROPDOWN - About Us, Meet Our Team, Contact Us */}
          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">About</a>
            <div className="dropdown-content">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>About Us</span>
                <small>Know our story</small>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>Team</span>
                <small>Meet our superheroes</small>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>Contact</span>
                <small>Join us/Reach us</small>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span>Resources</span>
                <small>Tutorials and more</small>
              </a>
            </div>
          </li>
          {user && (
            <li className="user-info">
              <span className="material-icons">person</span>
              <span className="user-name">{user.displayName}</span>
            </li>
          )}
          {/* SEARCH BAR on CLICKING SEARCH ICON */}
        </ul>
      </nav>

      <div className="click-dropdown profile-dropdown">
        <button onClick={myFunction} className="click-dropbtn">
          <a>
            <span className="material-icons md-24"> person </span>
            <p className="profile">Profile</p>
            <span className="material-icons-outlined"> expand_more </span>
          </a>
        </button>
        <div id="myDropdown" className="click-dropdown-content toggle-dd">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <span className="btn-txt">Account</span>
            <span className="material-icons-outlined md-18"> manage_accounts </span>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <span className="btn-txt">Logout</span>
            <span className="material-icons-outlined md-18"> logout </span>
          </a>
        </div>
      </div>

      <span className="ham" style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776;</span>
    </header>
  );
}

export default Navbar;
