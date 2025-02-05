import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setEMailSession } from "./Service/AuthService";

const loginAPIUrl = "https://nk31ys9nm4.execute-api.us-east-1.amazonaws.com/prod/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Both email and password are required!");
      return;
    }

    setErrorMessage(null);

    const requestConfig = {
      headers: {
        "x-api-key": "yoD8pwVkAZ8y6vcrU7y1B2Nb829AGg8g9DKixZqB",
      },
    };

    const requestBody = {
      email,
      password,
    };

    axios
      .post(loginAPIUrl, requestBody, requestConfig)
      .then((response) => {
        const { email, name, imageUrl, token } = response.data.user;
        setEMailSession(email, token);
        sessionStorage.setItem("userName", name);
        sessionStorage.setItem("imageUrl", imageUrl);
        navigate("/premium-content");
      })
      .catch((error) => {
        console.error("Login error:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Sorry, the backend server is down! Please try again later.");
        }
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input type="submit" value="Login" />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
