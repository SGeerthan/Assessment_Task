import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WelcomePage = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.message);
      } catch (err) {
        setError("Failed to fetch username. Please log in again.");
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">{username}!</h2>
        <button
          onClick={handleLogout} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
