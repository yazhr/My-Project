import { Link } from "react-router-dom";
import { Container, Typography, Grid, TextField, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import "./Homepage.css"; 

import heroImage from "./images/education.png"; 

import { RiComputerLine } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";
import { TbWorldWww } from "react-icons/tb";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const ServicesData = [
    {
      id: 1,
      title: "Global Ad Distribution",
      link: "#",
      icon: <TbWorldWww />,
      delay: 0.2,
    },
    {
      id: 2,
      title: "Mobile-Optimized Ads",
      link: "#",
      icon: <CiMobile3 />,
      delay: 0.3,
    },
    {
      id: 3,
      title: "Ad Creation Tools",
      link: "#",
      icon: <RiComputerLine />,
      delay: 0.4,
    },
    {
      id: 4,
      title: "Boost Engagement",
      link: "#",
      icon: <IoMdHappy />,
      delay: 0.5,
    },
    {
      id: 5,
      title: "Real-Time Analytics",
      link: "#",
      icon: <IoPulseOutline />,
      delay: 0.6,
    },
    {
      id: 6,
      title: "Real-Time Analytics",
      link: "#",
      icon: <BiSupport />,
      delay: 0.7,
    },
  ];

  const SlideLeft = (delay) => {
    return {
      initial: {
        opacity: 0,
        x: 50,
      },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          delay: delay,
          ease: "easeInOut",
        },
      },
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top
  }, []);

  return (
    <>
      <div className="homepage">
        {/* Header */}
        <motion.header
          className="header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="logo">AdHub</div>
          <nav className="nav">
           <a href="#about">About</a>
           <a href="#key-features">Features</a>
           <a href="#services">Services</a>
           <a href="#contact">Contact</a>

  <Link
    to="/login"
    className={activeLink === "login" ? "active" : ""}
    onClick={() => handleLinkClick("login")}
  >
    Login
  </Link>
  <Link
    to="/signup"
    className={activeLink === "signup" ? "active" : ""}
    onClick={() => handleLinkClick("signup")}
  >
    Sign Up
  </Link>
  <Link
    to="/adminlogin"
    className={activeLink === "adminlogin" ? "active" : ""}
    onClick={() => handleLinkClick("adminlogin")}
  >
    Admin Login
  </Link>
          </nav>
        </motion.header>


        {/* Hero Section with Framer Motion */}
        <motion.section
          className="hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Connecting Advertisers with Publishers, Seamlessly
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              Empowering your advertising journey with real-time analytics,
              optimized campaigns, and trusted connections.
            </motion.p>
            <div className="hero-buttons">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ marginRight: 2, backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }}
              >
                Get Started
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Learn More
              </Button>
            </div>
          </div>
          <img className="hero-image" src={heroImage} alt="AdHub Hero" />
        </motion.section>

        {/* Services Section with Animated Items */}
        <section id="services" className="bg-white">
  <div className="container pb-14 pt-16">
    <h1 className="text-4xl font-bold text-left pb-10">Services we provide</h1>
    <div className="service-container">
      {ServicesData.map((service) => (
        <motion.div
          key={service.id}
          variants={SlideLeft(service.delay)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="service-box"
        >
          <div className="icon-container">{service.icon}</div>
          <h1 className="service-title">{service.title}</h1>
        </motion.div>
      ))}
    </div>
  </div>
</section>


        {/* Features Section */}
        <motion.section
      id="key-features"
      className="key-features-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom align="center" className="key-features-title">
          Key Features
        </Typography>

        <div className="features-container">
          {/* Feature Card 1 */}
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-front">
              <h3>🚀 Fast Setup</h3>
              <p>Get started within minutes with our easy-to-use interface and quick configuration.</p>
            </div>
            <div className="card-back">
              <h3>Learn More</h3>
              <p>We provide detailed guides and instant support to make your setup smooth and effortless.</p>
            </div>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-front">
              <h3>💡 Advanced Analytics</h3>
              <p>Track your campaigns in real time with robust data-driven insights and AI-powered tools.</p>
            </div>
            <div className="card-back">
              <h3>Learn More</h3>
              <p>Gain a deep understanding of campaign performance to refine your strategy and maximize ROI.</p>
            </div>
          </motion.div>

          {/* Feature Card 3 */}
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-front">
              <h3>🌍 Global Reach</h3>
              <p>Expand your campaigns globally and connect with audiences worldwide across multiple platforms.</p>
            </div>
            <div className="card-back">
              <h3>Learn More</h3>
              <p>Our platform supports global publishers, allowing you to scale your campaigns without borders.</p>
            </div>
          </motion.div>

          
        </div>
      </Container>
    </motion.section>


        {/* About Section */}
        <motion.section
  id="about"
  className="about"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <Container maxWidth="lg">
    <Typography variant="h2" gutterBottom align="center" className="about-title">
          About AdHub
        </Typography>
        <Typography variant="body1" paragraph align="center" className="about-subtext">
          AdHub is a next-generation advertising platform connecting advertisers with publishers effortlessly.
          Our goal is to provide AI-driven insights, real-time analytics, and optimized campaign management 
          to ensure every ad reaches the right audience.
        </Typography>
    
    <div className="about-grid">
      <motion.div 
        className="about-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h3>🚀 Our Mission</h3>
        <p>To revolutionize the digital advertising industry with transparency, data-driven decision-making, and AI-powered optimizations.</p>
      </motion.div>

      <motion.div 
        className="about-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h3>🌍 Our Vision</h3>
        <p>Creating a seamless bridge between advertisers and publishers for an engaging and profitable ecosystem.</p>
      </motion.div>

      <motion.div 
        className="about-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h3>💡 Why Choose Us?</h3>
        <p>With cutting-edge technology, superior analytics, and global reach, we make advertising simple yet powerful.</p>
      </motion.div>
    </div>
  </Container>
</motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          <Container maxWidth="lg">
            <Typography variant="h2" gutterBottom align="center">
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph align="center">
              Have questions or want to get in touch? We're here to help!
            </Typography>
            <form className="contact-form">
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </motion.section>

        {/* Footer */}
        <footer className="footer">
          <Container maxWidth="lg">
            <Typography variant="body2" align="center" color="textSecondary">
              &copy; 2025 AdHub. All rights reserved.
            </Typography>
          </Container>
        </footer>
      </div>
    </>
  );
};

export default Header;