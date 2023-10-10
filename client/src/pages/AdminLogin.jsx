import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

const AdminLogin = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const pass = event.target.password.value;
    const ad = event.target.admin.value;
    if (pass === "qwertyu" && ad === "nath") {
      const randomString = Math.random().toString(36).substring(2);
      navigate(`/adminlogin/${randomString}`);
    } else {
      setErrorMessage("Incorrect password, try again!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="AdminForm">
      <h2>AdminLogin</h2>
      <div className="adminPassword">
        <div className="Password">
          <label htmlFor="text">Admin</label>
          <input type="text" id="admin" name="admin" />
          <span className="animated-border"></span>
        </div>
        <div className="Password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <span className="animated-border"></span>
        </div>
        <button type="submit">Submit</button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default AdminLogin;
