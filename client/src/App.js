import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage";
import WelcomePage from './components/WelcomePage';
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    setToken(null); // Clear the token from state
    localStorage.removeItem("token"); // Clear the token from local storage
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLogin setToken={setToken} />} />
        <Route 
          path="/welcome" 
          element={
            token ? (
              <WelcomePage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" /> // Redirect to login if not authenticated
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
