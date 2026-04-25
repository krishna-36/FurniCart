import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!(loginData.email && loginData.password)) {
      setStatus("Please fill required details.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, loginData);
      onLogin(response.data.user);
      setStatus(response.data.message);
      setTimeout(() => navigate("/account"), 700);
    } catch (error) {
      setStatus(error.response?.data?.message || "Unable to login right now.");
    }
  }

  return (
    <div className="loginWrapper">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          width: { xs: "80%", sm: "420px" },
          backgroundColor: "#ffffff",
          boxShadow: "0px 0px 3px 3px #f1f1f1",
          padding: "40px",
          borderRadius: "8px",
        }}
      >
        <h1>Login</h1>
        <TextField
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
        />

        {status && <p className="formStatus">{status}</p>}

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Login
        </Button>
      </Box>
    </div>
  );
}

export default Login;
