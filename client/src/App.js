import logo from "./logo.svg";
import "./App.css";
import Homepage from "./modules/homepage/Homepage";
import Login from "./modules/user/Login";
import ResetPass from "./modules/user/ResetPass";
// import Summary from "./modules/quiz/creator/Summary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./modules/aboutUs/AboutUs";
import CreateQuiz from "./modules/quiz/creator/createQuiz/CreateQuiz";
import AddQuestion from "./modules/quiz/creator/addQuestion/AddQuestion";
import AddInstruction from "./modules/quiz/creator/addQuestion/AddInstruction";
import PreviewInstructions from "./modules/quiz/creator/addQuestion/PreviewInstructions";
import Navbar from "./components/navbar/Navbar";
import Summary from "./components/summary/Summary";
import { AddQuestionHome } from "./modules/quiz/creator/addQuestion/AddQuestionHome";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPass" element={<ResetPass />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/addQuestionHome" element={<AddQuestionHome />} />
        <Route path="/addInstruction" element={<AddInstruction />} />
        <Route path="/previewInstructions" element={<PreviewInstructions />} />
        <Route path="/createQuiz" element={<CreateQuiz />} />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
