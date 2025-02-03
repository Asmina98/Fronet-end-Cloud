export const getEmail = () => {
    const email = sessionStorage.getItem("email");
    if (email === "undefined" || !email) {
      return null;
    } else {
      return JSON.parse(email);
    }
  };
  
  export const getToken = () => {
    return sessionStorage.getItem("token");
  };
  
  export const setEMailSession = (email, token) => {
    sessionStorage.setItem("email", JSON.stringify(email));
    sessionStorage.setItem("token", token);
  };
  
  export const resetEmailSession = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
  };
  