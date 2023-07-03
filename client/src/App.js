// import "./App.css";
// import { useState } from 'react'
// import { Navigate } from "react-router-dom";
// import Homepage from "./modules/homepage/Homepage";
// import Login from "./modules/user/Login";
// import ResetPass from "./modules/user/ResetPass";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import Summary from "./modules/quiz/creator/Summary";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import { Navigate } from "react-router-dom";
// import AboutUs from "./modules/aboutUs/AboutUs";
// import CreateQuiz from "./modules/quiz/creator/createQuiz/CreateQuiz";
// import AddQuestion from "./modules/quiz/creator/addQuestion/AddQuestion";
// import AddInstruction from "./modules/quiz/creator/addQuestion/AddInstruction";
// import UserRegister from "./modules/register/UserRegister";
// import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
// import Navbar from "./components/navbar/Navbar";
// import { AddQuestionHome } from "./modules/quiz/creator/addQuestion/AddQuestionHome";
// import {getAuth, GoogleAuthProvider} from "firebase/auth";
// // import Protected from "./protected";
// import PrivateRoute from "./PrivateRoute";  
// import jwt_decode from 'jwt-decode';

// function App() {
//   const firebaseConfig = {
//     apiKey: "AIzaSyDYiHBWojbp-G_moQs07gZwC-8qQmhDnBM",
//     authDomain: "aim2crack.firebaseapp.com",
//     projectId: "aim2crack",
//     storageBucket: "aim2crack.appspot.com",
//     messagingSenderId: "114092626191",
//     appId: "1:114092626191:web:e9ded7f577ddfe0511ae7a",
//     measurementId: "G-P8SNYR1YDF"
//   };




//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

//   const token = localStorage.getItem('jwtToken');
//   let isAuthenticated = false;

//   if (token) {
//     try {
//       const decodedToken = jwt_decode(token);
//       const currentTime = Date.now() / 1000;

//       // Check if the token is valid and not expired
//       if (decodedToken.exp > currentTime) {
//         isAuthenticated = true;
//       }
//     } catch (error) {
//       console.error('Error decoding JWT token:', error);
//     }
//   }


//   return (
//     <Router>
//     {/* <Switch> */}
//     <Navbar />
//       <Routes>
//       {/* <Route path="/" element={<Outlet />}> */}
//         <Route path="/homepage" element={<Homepage />} />
//         {PrivateRoute(Summary)({ path: '/dashboard' })}
//         {/* {createPrivateRoute(HomePage)({ path: '/' })} */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ResetPass />} />
//         <Route path="/addQuestion" element={<AddQuestion />} />
//         <Route path="/addQuestionHome" element={<AddQuestionHome />} />
//         <Route path="/addInstruction" element={<AddInstruction />} />
//         <Route path="/previewInstructions" element={<PreviewInstructions />} />
//         <Route path="/createQuiz" element={<CreateQuiz />} />
//         <Route path="/aboutUs" element={<AboutUs />} />
//         <Route path="/register" element={<UserRegister />} />
//       </Routes>
//       {/* </Switch> */}
//     </Router>

    
//   );

// }

// export default App;
import "./App.css";
import { useState } from 'react'
import { Navigate } from "react-router-dom";
import Homepage from "./modules/homepage/Homepage";
import Login from "./modules/user/Login";
import ResetPass from "./modules/user/ResetPass";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Summary from "./modules/quiz/creator/Summary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./modules/aboutUs/AboutUs";
import CreateQuiz from "./modules/quiz/creator/createQuiz/CreateQuiz";
import AddQuestion from "./modules/quiz/creator/addQuestion/AddQuestion";
import AddInstruction from "./modules/quiz/creator/addQuestion/AddInstruction";
import UserRegister from "./modules/register/UserRegister";
import Profile from "./modules/user/Profile";

import Error from "./modules/user/Error";
import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
import Navbar from "./components/navbar/Navbar";
import { AddQuestionHome } from "./modules/quiz/creator/addQuestion/AddQuestionHome";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const renderComponent = (props) =>
    isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;

  return <Route {...rest} element={renderComponent} />;
};

function App() {
// function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDYiHBWojbp-G_moQs07gZwC-8qQmhDnBM",
    authDomain: "aim2crack.firebaseapp.com",
    projectId: "aim2crack",
    storageBucket: "aim2crack.appspot.com",
    messagingSenderId: "114092626191",
    appId: "1:114092626191:web:e9ded7f577ddfe0511ae7a",
    measurementId: "G-P8SNYR1YDF"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const token = localStorage.getItem('token');
  let isAuthenticated = false;
  // console.log(token)
  

  if (token) {
    
    try {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken)
      const currentTime = Date.now() / 1000;
      console.log(currentTime)
      // if (decodedToken.exp > currentTime) {
      isAuthenticated = true;
      // }
    } catch (error) {
      console.log('Error decoding JWT token:');
    }
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route
          path="/summary"
          element={isAuthenticated ? <Summary /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPass />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/addQuestionHome" element={<AddQuestionHome />} />
        <Route path="/addInstruction" element={<AddInstruction />} />
        <Route path="/previewInstructions" element={<PreviewInstructions />} />
        <Route path="/createQuiz" element={<CreateQuiz />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/error" element={<Error/>} />

      </Routes>
    </Router>
  );
}

export default App;
