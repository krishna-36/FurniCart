import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

function Signup() {
  const [signupData, setSignupData] = useState({
    name:"",
    email:"",
    password:""
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setSignupData((prev)=>({
      ...prev,[name]:value
    }))
  }
  console.log(signupData);

  function handleSignup() {
    if(signupData?.email || signupData?.password || signupData?.name)
    {
      alert("Please fill required details");
      return;
    }

  }

  return (
    <div className="signupContainer">
      <div className="signupSection">
        <div className="signupForm">
          <h2>Sign Up</h2>
          <TextField 
            variant="outlined"
            size="small"
            id="outlined-textarea"
            label="User Name"
            placeholder="User Name"
            name="name"
            onChange={handleChange}
            sx={{
            borderRadius: "30px"
            }}
          />
          <TextField 
            variant="outlined"
            size="small"
            id="outlined-textarea"
            label="Email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            sx={{
            borderRadius: "30px"
            }}
          />
          <TextField 
            variant="outlined"
            size="small"
            id="outlined-textarea"
            label="Password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            sx={{
            borderRadius: "30px"
            }}
          />
          <a href='/login' className="alreadyUser">Already a user?</a>
          <Button variant="contained" onClick={handleSignup}>Sign Up</Button>          
        </div>
        <div className="signupImg"></div>
      </div>
    </div>
  );
}

export default Signup;
