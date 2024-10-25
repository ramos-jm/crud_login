import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./LoginPage.css";

const LoginPage = () => {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check username and password
    if (username === "admin" && password === "1234") {
      navigate("/admin");
    } else {

      navigate("/account");
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <nav className="navbar">
          <a href="/" className="nav-logo">
            WELCOME TO CARAXES
          </a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Login Page */}
      <div className="login-page">
        <div className="container">
          {/* Left section: Welcome to Login */}
          <div className="left-section">
            <h1>WELCOME TO LOGIN</h1>
            <div className="login-icon">
              <img className="signin" src="img/signin.png" alt="Sign In" />
            </div>
            <Link to="/register">Don't have an Account?</Link>
            <Link to="/register"><button className="sign-up-btn">SIGN UP</button></Link>
          </div>

          {/* Right section: Sign In */}
          <div className="right-section">
            <img className="user_icon" src="img/user_icon.png" alt="User Icon" />
            <h1>SIGN IN</h1>
            <form onSubmit={handleSubmit}>
              {/* Username input */}
              <div className={`input-group ${usernameFocused ? "focused" : ""}`}>
                <label htmlFor="username" className={usernameFocused ? "focused" : ""}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update username state
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={(e) => setUsernameFocused(e.target.value !== "" ? true : false)}
                />
              </div>

              {/* Password input with eye icon */}
              <div className={`input-group ${passwordFocused ? "focused" : ""}`}>
                <label htmlFor="password" className={passwordFocused ? "focused" : ""}>
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={(e) => setPasswordFocused(e.target.value !== "" ? true : false)}
                />
                {/* Eye icon for toggling password visibility */}
                <img
                  src={showPassword ? "img/eye.png" : "img/eye-closed.png"}
                  alt="Toggle Password Visibility"
                  className="eye-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>

              <div className="options">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="/" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="sign-in-btn">
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
