import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
// import jwt from 'jsonwebtoken';
import aim2CrackLogo from '../../assets/images/navbar/Aim2Crack-logo.png';

function Navbar() {
  const excludedPaths = ['/register', '/login', '/forgot-password'];
  const location = useLocation();
  const isExcludedPath = excludedPaths.includes(location.pathname);

  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Check if the user is logged in
  //   const isLoggedIn = checkUserLoggedIn(); // Replace with your logic to check if the user is logged in

  //   if (isLoggedIn) {
  //     const userName = getLoggedInUserName(); // Replace with your logic to get the logged-in user's name
  //     setUser({ displayName: userName });
  //   } else {
  //     setUser(null);
  //   }
  // }, []);

  // const checkUserLoggedIn = () => {
  //   // Implement your logic to check if the user is logged in
  //   // Return true if the user is logged in, false otherwise
  //   // Example: You can check if a token is present in local storage or if the user is authenticated with your authentication system
  //   const token = localStorage.getItem('token');
  //   return !!token;
  // };

  // const getLoggedInUserName = () => {
  //   // Implement your logic to get the logged-in user's name
  //   // Return the user's name if available, or an empty string otherwise
  //   // Example: You can decode the JWT token and extract the user's name from it
  //   const token = localStorage.getItem('token');
  //   // Decode the token and extract the user's name
  //   const decodedToken = decodeToken(token);
  //   return decodedToken ? decodedToken.name : '';
  // };

  // const decodeToken = (token) => {
  //   // Implement your logic to decode the JWT token
  //   // Example: You can use a library like jwt.io or jsonwebtoken to decode the token
  //   // Return the decoded token object or null if decoding fails
  //   // Example using jsonwebtoken library:
  //   try {
  //     const decodedToken = jwt.decode(token);
  //     return decodedToken;
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return null;
  //   }
  // };

  // const handleLogout = () => {
  //   // Implement your logic to handle the logout action
  //   // Example: You can clear the token from local storage or perform any necessary cleanup
  //   localStorage.removeItem('token');
  //   setUser(null);
  //   window.location.href = '/login'; // Redirect to the login page
  // };

  // if (isExcludedPath) {
  //   return null; // Render nothing if the current path is excluded
  // }

  const openNav = () => {
    // Implement your logic for opening the navigation menu
  };

  return (
    <header>
      <img className="logo" src={aim2CrackLogo} alt="logo" title="home" />

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
