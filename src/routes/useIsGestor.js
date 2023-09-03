import { useContext } from "react";

import UserContext from "contexts/UserContext";

const useIsGestor = () => {
  const { user } = useContext(UserContext);
  return user.typeUser === "Admin" || user.typeUser === "Gestor";
};

export { useIsGestor };
