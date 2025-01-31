import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard"; // Import the Dashboard component
import Login from "./Components/Login";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import ChatWidget from "./Components/ChatWidget"; 
//import User from "./Components/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add dashboard route */}
        <Route path="/login" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/chatwidget" element={  <ChatWidget />} />
      
        {/* Add other routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;