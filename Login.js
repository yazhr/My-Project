import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "./Login.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom"; // For navigation after login

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // For handling errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login", // Your backend API endpoint
        formData
      );
      localStorage.setItem("authToken", response.data.token); // Save token in localStorage
      localStorage.setItem('userId', response.data.userId);  // Store userId
         localStorage.setItem('authToken', response.data.token);  // Store authToken
      navigate("/dashboard"); // Redirect to dashboard page after login
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.response?.data?.message || "Server error, please try again");
    }
  };

  return (
    <>
      <div className="login-container">
        {/* Left Section: Form Section */}
        <div className="form-section">
          <h2>Login to Your Account</h2>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password Field */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="image-section">
          {/* Background image can be set via CSS */}
        </div>
      </div>
    </>
  );
};

export default Login;
