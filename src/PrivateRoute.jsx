import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { checkAuthentication } from './utils';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = checkAuthentication();
    console.log("isAuthenticated", isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default PrivateRoute;
