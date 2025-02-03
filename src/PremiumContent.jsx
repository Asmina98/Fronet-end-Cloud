import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetEmailSession } from "./Service/AuthService";

const PremiumContent = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const logoutHandler = () => {
    resetEmailSession();
    sessionStorage.removeItem("userName"); // Clear userName
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h3>Hello {userName}!</h3> You have been logged in!!! Welcome to the premium content,<br />
      <input type="button" value="Logout" onClick={logoutHandler} />
    </div>
  );
};

export default PremiumContent;
