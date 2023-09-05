import { useCredentials } from "./useCredentials";
import { Navigate } from "react-router-dom";

import { useIsAdmin } from ".";

const AdminRoute = ({ Component }) => {
  const hasCredentials = useCredentials();
  const isAdmin = useIsAdmin();

  if (hasCredentials) {
    if (isAdmin) {
      return <Component />;
    } else {
      return <Navigate to={"/"} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export { AdminRoute };
