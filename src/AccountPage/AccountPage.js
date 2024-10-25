import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  // State for profile picture, starting with the default image
  const [profilePicture, setProfilePicture] = useState("img/profile.png");

  // Form state to hold input values
  const [formData, setFormData] = useState({
    username: "jose123",
    firstName: "Jose",
    lastName: "Rizal",
    email: "jose.rizal@example.com",
    password: "chingchangsu",
  });

  const [focused, setFocused] = useState({
    username: false,
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const [dragActive, setDragActive] = useState(false);

  // Handle focus for labels animation
  const handleFocus = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Handle blur to remove focus if input is empty
  const handleBlur = (field, value) => {
    setFocused((prev) => ({
      ...prev,
      [field]: value !== "" ? true : false,
    }));
  };

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle file upload for profile picture
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };

  // Drag-and-drop functionality for profile picture
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };

  // Handle form submission (saving changes)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
    alert("Changes saved successfully!");
    // You can send formData to a server or handle saving logic here
  };

  return (
    <div>
      <header className="account-header">
        <nav className="account-navbar">
          <a href="/" className="account-nav-logo">
            WELCOME TO CARAXES
          </a>
          <ul className="account-nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/product">Product</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <Link to = "/"><li><a href="/contact">Logout</a></li></Link>
          </ul>
        </nav>
      </header>

      <div className="account-page-container">
        <div className="account-page-content">
          {/* Profile Picture Section with Drag-and-Drop */}
          <div
            className={`profile-picture-section ${dragActive ? "drag-active" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <img src={profilePicture} alt="Profile" />
            <label htmlFor="fileUpload">
              {dragActive ? "Drop image here" : "Upload Picture"}
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileUpload}
              style={{ display: "none" }} // Hide the file input
            />
            <p>Drag and drop to upload, or click to select</p>
          </div>

          {/* Account Form Section */}
          <div className="account-form-section">
            <h1>Account Profile</h1>
            <form onSubmit={handleSubmit}>
              <div className={`account-input-group ${focused.username ? "focused" : ""}`}>
                <label htmlFor="username" className={focused.username ? "focused" : ""}>Username</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("username")}
                  onBlur={(e) => handleBlur("username", e.target.value)}
                />
              </div>
              <div className={`account-input-group ${focused.firstName ? "focused" : ""}`}>
                <label htmlFor="firstName" className={focused.firstName ? "focused" : ""}>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("firstName")}
                  onBlur={(e) => handleBlur("firstName", e.target.value)}
                />
              </div>
              <div className={`account-input-group ${focused.lastName ? "focused" : ""}`}>
                <label htmlFor="lastName" className={focused.lastName ? "focused" : ""}>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("lastName")}
                  onBlur={(e) => handleBlur("lastName", e.target.value)}
                />
              </div>
              <div className={`account-input-group ${focused.email ? "focused" : ""}`}>
                <label htmlFor="email" className={focused.email ? "focused" : ""}>Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                />
              </div>

              <div className={`account-input-group ${focused.password ? "focused" : ""}`}>
                <label htmlFor="password" className={focused.password ? "focused" : ""}>Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                />
              </div>

              <button className="account-save-btn" type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
