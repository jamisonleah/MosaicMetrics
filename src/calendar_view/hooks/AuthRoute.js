// AuthRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Custom AuthRoute component
const AuthRoute = ({ children }) => {
    const { token } = useAuth();
    
    if (token['access-token'] == null) {
      return <Navigate to="/signin" replace />;
    }
  
    return children;
  };

export default AuthRoute;
