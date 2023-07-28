import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
// import jwt from 'jsonwebtoken';
import aim2CrackLogo from '../../assets/images/navbar/Aim2Crack-logo.png';

function Navbar() {
  const code = window.location.pathname.split('/')[2];
  console.log(code);
  const navigate = useNavigate();

  const excludedPaths = [
    '/register',
    '/forgot-password',
    `/quiz/${code}/test`,
    `/quiz/${code}/live`,
    `/quiz/${code}/feedback`
  ];

  const [user, setUser] = useState(null);
  console.log(user);
  const location = useLocation();
  const isExcludedPath = excludedPaths.includes(location.pathname);
  if (isExcludedPath) {
    return null; // Render nothing if the current path is excluded
  }

  // Redirect to "/login" using useNavigate hook if the user is not logged in (user === null)
  if (!user) {
    navigate('/login');
    return null; // Return null or a loading component since the user is being redirected
  }
  const openNav = () => {
    // Implement your logic for opening the navigation menu
  };

  return (
    <header>
      {/* <img className="logo" src={aim2CrackLogo} alt="logo" title="home" /> */}

      <nav className="main-menu">
        <ul className="nav_links">
          <li><a href="#">Home</a></li>
          <li><a href="/summary">Dashboard</a></li>
          <li className="dropdown">
            {/* ... Quizzes dropdown contents ... */}
          </li>
          <li className="dropdown">
            {/* ... Placements dropdown contents ... */}
          </li>
          <li><a href="#">Talks</a></li>
          <li className="dropdown">
            {/* ... About dropdown contents ... */}
          </li>
          {user && (
            <li className="user-info">
              <span className="material-icons">person</span>
              <span className="user-name">{user.displayName}</span>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
          {!user && (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </nav>

      {/* ... Profile dropdown ... */}

      <span
        className="ham"
        style={{ fontSize: '30px', cursor: 'pointer' }}
        onClick={openNav}
      >
        &#9776;
      </span>
    </header>
  );
}

export default Navbar;
