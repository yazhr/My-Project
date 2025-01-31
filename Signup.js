import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "./Signup.css"; // Import CSS for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:5000/api/users/register", // Your backend API endpoint
        formData
      );
      localStorage.setItem("authToken", response.data.token); // Save token in localStorage
      window.location.href = "/dashboard"; // Redirect to dashboard after signup
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.response?.data?.message || "Server error, please try again");
    }
  };

  return (
    <>
      <div className="signup-container">
        {/* Right Section: Image */}
        <div className="image-section">
          {/* Background image can be set via CSS */}
        </div>

        {/* Left Section: Form Section */}
        <div className="form-section">
          <h2>Create an Account</h2>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Form */}
          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Username Field */}
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
            />

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
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
