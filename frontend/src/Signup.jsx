import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSignup(event) {
    event.preventDefault();

    if (!(signupData.email && signupData.password && signupData.name)) {
      setStatus("Please fill required details.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, signupData);
      setStatus(response.data.message);
      setTimeout(() => navigate("/login"), 700);
    } catch (error) {
      setStatus(error.response?.data?.message || "Unable to create account right now.");
    }
  }

  return (
    <div className="signupContainer">
      <div className="signupSection">
        <form className="signupForm" onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <TextField
            variant="outlined"
            size="small"
            label="User Name"
            placeholder="User Name"
            name="name"
            value={signupData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={signupData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={signupData.password}
            onChange={handleChange}
          />
          <Link to="/login" className="alreadyUser">
            Already a user?
          </Link>
          {status && <p className="formStatus">{status}</p>}
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="signupImg"></div>
      </div>
    </div>
  );
}

export default Signup;
