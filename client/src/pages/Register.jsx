import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css"

const Register = (props) =>{
  const [reg, setReg] = useState({
    u_name:"",
    email: "",
    password: "",
  });
  const [error,setError] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setReg((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/reg", reg);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(true)
    }
};
  return (
    <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
        <div className="username">
            <label htmlFor="username">username</label>
            <input type="username" id="u_name" name="u_name" onChange={handleChange}/>
            <span className='animated-border'></span>
          </div>
            <div className="email">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleChange}/>
            <span className='animated-border'></span>
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleChange}/>
            <span className='animated-border'></span>
          </div>
          <div className="button">
            <button type="submit">Register</button>
          </div>
        </form>
        {error && "Something went wrong!"}
        <Link to="/login">Already have an account? Login here.</Link>
    </div>
  )
}

export default Register