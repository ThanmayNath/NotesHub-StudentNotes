import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { authContext } from "../contexts/auth";

const Login = (props) => {
  const { setUser } = useContext(authContext);

  const [epass, setEpass] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEpass((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/log", epass).then((res) => {
        if (res.data.auth) {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          setUser({ userid: res.data.uid, username: res.data.uname });
          navigate("/");
        }
      });
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="cond">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
          <span className="animated-border"></span>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            //type="password"
            id="password"
            name="password"
            onChange={handleChange}
            type="password"
          />
          <span className="animated-border"></span>
        </div>

        <div className="button">
          <button type="submit">Log In</button>
        </div>
        {error && "Something went wrong!"}
      </form>
      <Link to="/register" className="anchor">
        <h5>Don't have an account? Register here.</h5>
      </Link>
    </div>
  );
};

export default Login;
