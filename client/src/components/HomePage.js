import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ onLogout }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Home Page!
        </h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
