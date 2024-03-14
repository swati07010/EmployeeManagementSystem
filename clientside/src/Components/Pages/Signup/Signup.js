import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
const Singup = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   if (auth) {
  //     navigate("/");
  //   }
  // }, []);

  const collectData = async (e) => {
    if (!name || !email || !password) {
      window.alert("Please fill in all fields");
      setError(true);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("fill Correct Email");
      setError(true);
      console.error("Invalid email format");
      return false;
    }
    if (password.length <= 5) {
      window.alert("fill Corect  Password");
      setError(true);
      console.error("Password should be at least 5 characters long");
      return false;
    }

    let result = await fetch("http://localhost:4000/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result));
    navigate("/employeeList");
    setError(false);
  };
  return (
    <div className="singup">
      <br></br>
      <h1 className="singup-title">Registration : </h1>
      <input
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter the Name "
      />
      {error && !name && <spam className="spam1">Enter valid name</spam>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        type="email"
        placeholder="Enter the Email"
        required
      />
      {error && !email && <spam className="spam1">Enter valid name</spam>}
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter the password"
      />
      {error && !password && <spam className="spam1">Enter valid name</spam>}
      <button onClick={collectData} className="button" type="button">
        Singup
      </button>
    </div>
  );
};
export default Singup;
