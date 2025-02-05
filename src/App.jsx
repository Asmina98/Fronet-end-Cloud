import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './assets/Home';
import Register from './Register';
import Login from './Login';
import PremiumContent from './PremiumContent';
import PublicRoute from './Routes/publicRoute';
import PrivateRoute from './Routes/privateRoute';
import { useEffect, useState } from "react";
import { getEmail, getToken, setEMailSession, resetEmailSession } from './Service/AuthService';
import axios from 'axios';

const verifyTokenAPIURL = 'https://nk31ys9nm4.execute-api.us-east-1.amazonaws.com/prod/verify';

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted component
    const token = getToken();
    console.log("Token:", token);

    if (!token) {
      if (isMounted) setAuthenticating(false);
      return;
    }

    const requestConfig = {
      headers: { 'x-api-key': "yoD8pwVkAZ8y6vcrU7y1B2Nb829AGg8g9DKixZqB" }
    };
    const requestBody = { email: getEmail(), token };

    axios.post(verifyTokenAPIURL, requestBody, requestConfig)
      .then(response => {
        if (isMounted) {
          setEMailSession(response.data.user, response.data.token);
          sessionStorage.setItem("profilePic", response.data.user.imageUrl);
          setProfilePic(response.data.user.imageUrl);
          setAuthenticating(false);
        }
      })
      .catch((error) => {
        console.error("Error during authentication", error);
        if (isMounted) {
          resetEmailSession();
          setAuthenticating(false);
        }
      });

    return () => { isMounted = false; }; // Cleanup function to avoid memory leaks
  }, []);

  if (isAuthenticating) {
    return <div className="content">Authenticating...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="Header">
          {profilePic && (
            <img src={profilePic} alt="Profile" style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
          )}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/premium-content">Premium Content</NavLink>
        </div>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/premium-content" element={<PremiumContent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
