import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { resetEmailSession } from "./Service/AuthService";

const updateProfileAPIUrl = "https://nk31ys9nm4.execute-api.us-east-1.amazonaws.com/prod/updateProfilePath";

const PremiumContent = () => {
  const [userName, setUserName] = useState(sessionStorage.getItem("userName"));
  const [imageUrl, setImageUrl] = useState(sessionStorage.getItem("imageUrl"));
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 500; // Set a maximum width
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7); // Resize and compress
          setNewImage(resizedBase64.split(",")[1]);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const updateImageHandler = () => {
    const token = sessionStorage.getItem("token");

    if (!newImage) {
      setMessage("Please select an image.");
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "yoD8pwVkAZ8y6vcrU7y1B2Nb829AGg8g9DKixZqB",
      },
    };

    const requestBody = {
      email: sessionStorage.getItem("email"),
      imageBase64: newImage,
    };

    axios
      .put(updateProfileAPIUrl, requestBody, requestConfig)
      .then((response) => {
        setImageUrl(response.data.imageUrl);
        sessionStorage.setItem("imageUrl", response.data.imageUrl);
        setMessage("Profile picture updated successfully!");
      })
      .catch(() => {
        setMessage("Failed to update profile picture.");
      });
  };

  const logoutHandler = () => {
    resetEmailSession();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h3>Hello {userName}!</h3>
      <p>
        <img src={imageUrl} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
      </p>
      <p>Welcome to the premium content.</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={updateImageHandler}>Update Image</button>
      {message && <p>{message}</p>}
      <br />
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default PremiumContent;
