import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    dob: false,
  });
  
  const [profilePicture, setProfilePicture] = useState("img/add.png"); // Default image

  const handleFocus = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field, value) => {
    setFocused((prev) => ({
      ...prev,
      [field]: value !== "" ? true : false,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl); // Set the new image URL
    }
  };

  return (
    <div>
      <header className="register-header">
        <nav className="register-navbar">
          <a href="/" className="register-nav-logo">
            WELCOME TO CARAXES
          </a>
          <ul className="register-nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div className="register-page-container">
        <div className="register-page-content">
          {/* Register Section */}
          <div className="register-form-section">
            <h1>Create Account</h1>
            <p>For business, band or celebrity.</p>
            <form>

              <div className={`register-input-group ${focused.dob ? "focused" : ""}`}>
                <label htmlFor="username" className={focused.dob ? "focused" : ""}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  onFocus={() => handleFocus("dob")}
                  onBlur={(e) => handleBlur("dob", e.target.value)}
                />
              </div>

              {/* First Name input */}
              <div className={`register-input-group ${focused.firstName ? "focused" : ""}`}>
                <label htmlFor="firstName" className={focused.firstName ? "focused" : ""}>
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  onFocus={() => handleFocus("firstName")}
                  onBlur={(e) => handleBlur("firstName", e.target.value)}
                />
              </div>

              {/* Last Name input */}
              <div className={`register-input-group ${focused.lastName ? "focused" : ""}`}>
                <label htmlFor="lastName" className={focused.lastName ? "focused" : ""}>
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  onFocus={() => handleFocus("lastName")}
                  onBlur={(e) => handleBlur("lastName", e.target.value)}
                />
              </div>

              {/* Email input */}
              <div className={`register-input-group ${focused.email ? "focused" : ""}`}>
                <label htmlFor="email" className={focused.email ? "focused" : ""}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onFocus={() => handleFocus("email")}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className={`register-input-group ${focused.password ? "focused" : ""}`}>
                <label htmlFor="password" className={focused.password ? "focused" : ""}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onFocus={() => handleFocus("password")}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                />
              </div>

              {/* Confirm Password input */}
              <div className={`register-input-group ${focused.confirmPassword ? "focused" : ""}`}>
                <label htmlFor="confirmPassword" className={focused.confirmPassword ? "focused" : ""}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
                />
              </div>

              <div className="register-terms-section">
                <p><input type="checkbox" />By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
              </div>

              <Link to="/login"><button className="register-create-account-btn" type="submit">Create Account</button></Link>
            </form>
          </div>

          {/* Profile Picture Upload Section */}
          <div className="profile-picture-section">
            <img src={profilePicture} alt="Profile" />
            <label htmlFor="fileUpload">Upload Picture</label>
            <input type="file" id="fileUpload" onChange={handleFileUpload} />
            <p>Accepted formats: JPG, PNG</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
