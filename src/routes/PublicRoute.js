import React from "react";
import { Navigate } from "react-router-dom";

import { useCredentials } from ".";

const PublicRoute = ({ Component }) => {
  if (!useCredentials()) {
    return <Component />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export { PublicRoute };
