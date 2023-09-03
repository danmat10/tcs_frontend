import React from "react";
import { Navigate } from "react-router-dom";

import { useCredentials } from ".";

const PrivateRoute = ({ Component }) => {
  if (useCredentials()) {
    return <Component />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export { PrivateRoute };
