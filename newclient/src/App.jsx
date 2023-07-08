
// export default App;
import "./App.css";
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
import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
import Navbar from "./components/navbar/Navbar";
import { AddQuestionHome } from "./modules/quiz/creator/addQuestion/AddQuestionHome";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import VerificationPage from "./modules/user/VerificationPage";
import firebaseConfig from "../firebaseConfig.js"
import FirsttimeDetails from "./modules/user/firsttimeDetails";
import NewPassword from "./modules/user/NewPassword";


function App() {

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
      </Routes>
    </Router>
  );
}

export default App;
