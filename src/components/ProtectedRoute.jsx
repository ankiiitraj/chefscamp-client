import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const userName = Cookie.get("userName");
        if (userName || rest.userDetails.isLoggedIn) {
          return <Component {...props} userDetails={rest.userDetails} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
