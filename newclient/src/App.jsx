
// export default App;
import "./App.css";
import React, { useEffect, useState } from 'react'
// import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getUserDetails } from "./services/jwtService";

import Homepage from "./modules/homepage/Homepage";
import Login from "./modules/user/Login";
// import ResetPass from "./modules/user/ResetPass";
// import Summary from "./components/summary/Summary.jsx"
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import Summary from "./modules/summary/Summary";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AboutUs from "./modules/homepage/aboutUs/AboutUs";
// import CreateQuiz from "./modules/quiz/creator/createQuiz/CreateQuiz";
// import AddQuestion from "./modules/quiz/creator/addQuestion/AddQuestion";
// import AddInstruction from "./modules/quiz/creator/addQuestion/AddInstruction";
// import UserRegister from "./modules/register/UserRegister";
// import Quizzing from "./modules/quiz/student/quizzing/Quizzing";
// import QuizFeedback from "./modules/quiz/student/quizFeedback/QuizFeedback";
// // import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
// import Navbar from "./components/navbar/Navbar";
// import { AddQuestionHome } from "./modules/quiz/creator/addQuestion/AddQuestionHome";
// // import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import jwt_decode from 'jwt-decode';
// import VerificationPage from "./modules/user/VerificationPage";
// import FirsttimeDetails from "./modules/user/firsttimeDetails";
// import NewPassword from "./modules/user/NewPassword";
// import Profile from "./modules/user/Profile";
// import Settings from "./modules/quiz/creator/addQuestion/settings";
// import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
// import CreateQuiz from "./modules/quiz/creator/createQuiz/CreateQuiz";
// import Instructions from "./modules/quiz/student/Instructions";

function App() {
  const userDetails = getUserDetails();

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <div>  </div>
        <Routes>
          <Route path="/" element={<Homepage userDetails={userDetails} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <Route path="/summary" element={<Summary/>}></Route>
        <Route path="/quizzing" element={<Quizzing />} />
        <Route path="/quiz-feedback" element={<QuizFeedback />} />
        <Route path="/forgot-password" element={<ResetPass />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/verify/:token" element={<VerificationPage />} />
        <Route path="/onetimedetails" element={<FirsttimeDetails/>}/>
        <Route path="/reset-password" element={<NewPassword/>}/>
        <Route path="/profile" element={<Profile/>}/>

        <Route path="/createquiz" element={<CreateQuiz/>}/>
        <Route path="/quiz/:code" element={<AddQuestionHome />} />
        <Route path="/quiz/:code/addinstruction" element={<AddInstruction />} />
        <Route path="/quiz/:code/addinstruction/preview" element={<PreviewInstructions />} />
        <Route path="/quiz/:code/settings" element={<Settings/>}/>
        <Route path="/addQuestionHome" element={<AddQuestionHome />} />
        <Route path="/createQuiz" element={<CreateQuiz />} />

        <Route path="/quiz/:code/test" element={<Instructions />} />
        <Route path="/quiz/:code/live" element={<Quizzing />} />
        <Route path="/quiz/:code/feedback" element={<QuizFeedback />} />*/}
        {/* </Switch> */}
      </Router >
    </>
  );
}

export default App;
