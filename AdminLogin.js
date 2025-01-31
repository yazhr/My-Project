import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import loginImage from "./images/computer.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin-dashboard");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Section: Image */}
        <Grid item xs={12} md={6}>
          
            <Box
              component="img"
              src={loginImage}
              alt="Login illustration"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 1,
                marginLeft: "-80px",  // Adjust this value to control how far left the image moves

              }}
            />
        </Grid>

        {/* Right Section: Login Form */}
        <Grid item xs={12} md={6}>
          
            <Typography variant="h4" align="center" gutterBottom>
              Admin Login
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminLogin;
