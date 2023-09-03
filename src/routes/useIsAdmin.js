import { useContext } from "react";

import UserContext from "contexts/UserContext";

const useIsAdmin = () => {
  const { user } = useContext(UserContext);
  return user.typeUser === "Admin";
};

export { useIsAdmin };
