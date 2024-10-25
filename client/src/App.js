import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin"
import HomePage from "./components/HomePage"
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<UserLogin />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
