import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../Service/AuthService";

const PrivateRoute = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

