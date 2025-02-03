import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../Service/AuthService";

const PublicRoute = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/premium-content" />;
};

export default PublicRoute;
