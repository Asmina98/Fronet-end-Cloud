import React, { useState } from "react";
import axios from "axios";

const registerUrl = "https://nk31ys9nm4.execute-api.us-east-1.amazonaws.com/prod/register";
const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(",")[1]); // Extract base64 data
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!userName.trim() || !email.trim() || !password.trim() || !image) {
      setMessage("All fields and an image are required.");
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "yoD8pwVkAZ8y6vcrU7y1B2Nb829AGg8g9DKixZqB",
      },
    };

    const requestBody = {
      email,
      userName,
      password,
      imageBase64: image,
    };

    axios
      .post(registerUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage("Registration Successful");
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Sorry, the backend server is down! Please try again later.");
        }
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        Username: <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} /><br />
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        Profile Picture: <input type="file" accept="image/*" onChange={handleFileChange} /><br />
        <input type="submit" value="Register" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
