import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import AccountPage from "./AccountPage/AccountPage";
import AdminPage from "./AdminPage/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/admin" element={<AdminPage />} />
       <Route path="/account" element={<AccountPage />} />  

      </Routes>
    </Router>
  );
}

export default App;