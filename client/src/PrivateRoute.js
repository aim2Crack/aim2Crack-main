import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const renderComponent = props =>
    isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;

  return <Route {...rest} render={renderComponent} />;
};

export default function createPrivateRoute(Component) {
  return function PrivateRouteWrapper(props) {
    // Retrieve the isAuthenticated status from your authentication mechanism
    const isAuthenticated = false;/* determine if the user is authenticated */;

    return <PrivateRoute component={Component} isAuthenticated={isAuthenticated} {...props} />;
  };
}
