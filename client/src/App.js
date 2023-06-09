import logo from "./logo.svg";
import "./App.css";
import Homepage from "./modules/homepage/Homepage";
import Login from "./modules/user/Login";
import Summary from "./modules/quiz/creator/Summary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./modules/aboutUs/AboutUs";
import createquiz from "./modules/quiz/creator/createQuiz/createquiz";
import AddQuestion from "./modules/quiz/creator/addQuestion/AddQuestion";
import Navbar from "./components/navbar/Navbar";
import Summary from "./components/summary/Summary";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/createQuiz" element={<SignUp />} />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
