
// export default App;
import "./App.css";
import { useState } from 'react'
import { Navigate } from "react-router-dom";
import Homepage from "./modules/homepage/Homepage";
import Login from "./modules/user/Login";
import ResetPass from "./modules/user/ResetPass";
import Summary from "./components/summary/Summary.jsx"
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import Summary from "./modules/summary/Summary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./modules/homepage/aboutUs/AboutUs";
import CreateQuiz from "./modules/quiz/creator/createQuiz/CreateQuiz";
import AddQuestion from "./modules/quiz/creator/addQuestion/AddQuestion";
import AddInstruction from "./modules/quiz/creator/addQuestion/AddInstruction";
import UserRegister from "./modules/register/UserRegister";
import Quizzing from "./modules/quiz/student/quizzing/Quizzing";
import QuizFeedback from "./modules/quiz/student/quizFeedback/QuizFeedback";
// import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
import Navbar from "./components/navbar/Navbar";
import { AddQuestionHome } from "./modules/quiz/creator/addQuestion/AddQuestionHome";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import jwt_decode from 'jwt-decode';
import VerificationPage from "./modules/user/VerificationPage";
import FirsttimeDetails from "./modules/user/FirsttimeDetails";
import NewPassword from "./modules/user/NewPassword";
import Profile from "./modules/user/Profile";
import Settings from "./modules/quiz/creator/addQuestion/settings";
import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
import Instructions from "./modules/quiz/student/Instructions";
// import PrivateRoute from "./components/privateroutes/PrivateRoute";
import Error from "./components/error/Error";
import StudentProfileChecker from "./components/privateroutes/studentprofilechecker";
import ConfirmationNotification from "./components/notification/notification";
import ResultSummary from "./modules/quiz/creator/resultsummary/resultsummary";
function App() {
// // function App() {
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDYiHBWojbp-G_moQs07gZwC-8qQmhDnBM",
  //   authDomain: "aim2crack.firebaseapp.com",
  //   projectId: "aim2crack",
  //   storageBucket: "aim2crack.appspot.com",
  //   messagingSenderId: "114092626191",
  //   appId: "1:114092626191:web:e9ded7f577ddfe0511ae7a",
  //   measurementId: "G-P8SNYR1YDF"
  // };

  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

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
        <Route path="/summary/quiz" element={<Summary/>}></Route>
        <Route path="/summary" element={<Summary/>}></Route>
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
{/* user-registration and updation-routes */}      
        <Route path="/forgot-password" element={<ResetPass />} />  
        <Route path="/register" element={<UserRegister />} />
        <Route path="/verify/:token" element={<VerificationPage />} />
        <Route path="/onetimedetails" element={<FirsttimeDetails/>}/>
        <Route path="/reset-password/:token" element={<NewPassword/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/error-page" element={<Error/>}/>
{/* quiz-creator-routes */}
        {/* <Route path="/createquiz" element={<StudentProfileChecker/>, <CreateQuiz/>}/> */}
        <Route path="/createquiz" element={
              <StudentProfileChecker>
              <CreateQuiz />
              </StudentProfileChecker>
          }
        />
        <Route path="/quiz/:code" element={ <><StudentProfileChecker/> <AddQuestionHome />   </>} />
        <Route path="/quiz/:code/addinstruction" element={<> <StudentProfileChecker /><AddInstruction /></>} />
        <Route path="/quiz/:code/addinstruction/preview" element={<> <StudentProfileChecker /><PreviewInstructions /></>} />
        <Route path="/quiz/:code/settings" element={<> <StudentProfileChecker /><Settings/></>}/>
        <Route path="/addQuestionHome" element={<> <StudentProfileChecker /><AddQuestionHome /></>} />
        <Route path="/quiz/:code/result" element={<><StudentProfileChecker/><ResultSummary /></>} />
{/* quiz-student-routes */}
        <Route path="/quiz/:code/test" element={<Instructions />} />
        <Route path="/quiz/:code/live" element={<Quizzing />} />
        <Route path="/quiz/:code/feedback" element={<QuizFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
