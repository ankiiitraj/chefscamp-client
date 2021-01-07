import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import { useToasts } from "react-toast-notifications";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userName = Cookie.get("userName");
  const token = Cookie.get("auth");
  const {addToast} = useToasts();
  if (!userName || !token) {
    addToast("You need to login again!", {
      appearance: 'error',
      autoDismiss: true,
    })
    rest.handleLogout();
  }
  return (
    <Route
      {...rest}
      render={props => {
        if (!userName || !token) {
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
        } else {
          return <Component {...props} userDetails={rest.userDetails} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
