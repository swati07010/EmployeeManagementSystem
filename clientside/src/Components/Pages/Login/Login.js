import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginhandel = async () => {
    console.warn({ email, password });

    let result = await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      // Parse the response JSON
      const data = await result.json();

      // Check if login was successful
      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem("token", data.token);

        navigate("/employeeList");
      } else {
        // If login was unsuccessful, show an alert
        alert("Please enter correct details");
      }
    } else {
      // If there's an error with the fetch request, show an alert
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login">
      <h1 className="login-title">Login:</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        placeholder="Enter Email"
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        placeholder="Enter Password"
      ></input>
      <button className="button" type="button" onClick={loginhandel}>
        Login
      </button>
    </div>
  );
};
export default Login;
