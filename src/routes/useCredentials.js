import React from "react";
import { useIsAuthenticated } from "react-auth-kit";

const useCredentials = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = React.useMemo(() => isAuthenticated(), [isAuthenticated]);
  return auth;
};

export { useCredentials };
