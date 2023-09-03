import { Navigate } from "react-router-dom";

import { useCredentials, useIsGestor } from ".";

const GestorRoute = ({ Component }) => {
  const hasCredentials = useCredentials();
  const isGestor = useIsGestor();

  if (hasCredentials) {
    if (isGestor) {
      return <Component />;
    } else {
      return <Navigate to={"/"} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export { GestorRoute };
