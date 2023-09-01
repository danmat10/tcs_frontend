import React from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = React.useMemo(() => isAuthenticated(), [isAuthenticated]);

  if (!auth) {
    return <Component />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export { PublicRoute };
