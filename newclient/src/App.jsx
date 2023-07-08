
// export default App;
import "./App.css";
import { useState } from 'react'
import { Navigate } from "react-router-dom";
import Homepage from "./modules/homepage/Homepage";
import Login from "./modules/user/Login";
import ResetPass from "./modules/user/ResetPass";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Summary from "./modules/summary/Summary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./modules/homepage/aboutUs/AboutUs";
import CreateQuiz from "./modules/quiz/creator/createQuiz/CreateQuiz";
import AddQuestion from "./modules/quiz/creator/addQuestion/AddQuestion";
import AddInstruction from "./modules/quiz/creator/addQuestion/AddInstruction";
import UserRegister from "./modules/register/UserRegister";
import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
import Navbar from "./components/navbar/Navbar";
import { AddQuestionHome } from "./modules/quiz/creator/addQuestion/AddQuestionHome";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import jwt_decode from 'jwt-decode';
import VerificationPage from "./modules/user/VerificationPage";
import FirsttimeDetails from "./modules/user/firsttimeDetails";
import NewPassword from "./modules/user/NewPassword";
// import CreateQuiz from "./modules/quiz/creator/createQuiz/CreateQuiz";


function App() {
// // function App() {
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
// const isAuthenticated = req.isAuthenticated();
  // const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  //   const renderComponent = (props) =>
  //     isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
  
  //   return <Route {...rest} element={renderComponent} />;
  // };
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        {/* <Route
          path="/summary"
          element={isAuthenticated? <Summary /> : <Navigate to="/login" />}
        /> */}
        <Route path="/summary" element={<Summary/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPass />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/addQuestionHome" element={<AddQuestionHome />} />
        <Route path="/addInstruction" element={<AddInstruction />} />
        <Route path="/previewInstructions" element={<PreviewInstructions />} />
        <Route path="/createQuiz" element={<CreateQuiz />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/verify/:token" element={<VerificationPage />} />
        <Route path="/onetimedetails" element={<FirsttimeDetails/>}/>
        <Route path="/reset-password" element={<NewPassword/>}/>
{/* quiz-creator-routes */}
        <Route path="/createquiz" element={<CreateQuiz/>}/>
      </Routes>
    </Router>
  );
}

export default App;
