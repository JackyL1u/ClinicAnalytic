import React from 'react';
import { Navigate } from 'react-router-dom';
import { verifySession } from "./api/services"

const PublicRoute = ({ children }) => {
  const authToken = localStorage.getItem("token");

  if (authToken !== undefined && authToken !== null && authToken !== "") {
    return <Navigate to="/" />
  }
  return children
};

export default PublicRoute;