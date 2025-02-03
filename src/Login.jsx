import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setEMailSession } from "./Service/AuthService";

const loginAPIUrl = "https://nk31ys9nm4.execute-api.us-east-1.amazonaws.com/prod/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirection

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
      // Save email and token
      setEMailSession(response.data.user.email, response.data.token);
      // Save user's name
      sessionStorage.setItem("userName", response.data.user.name);
      navigate("/premium-content"); // Redirect to Premium Content
    })
    .catch((error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Sorry ... the backend server is down, please try again later!");
      }
    });
  

    console.log("Login button is pressed");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        <div>
          Email:
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          />
        </div>
        <input type="submit" value="Login" style={{ marginTop: "10px" }} />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
