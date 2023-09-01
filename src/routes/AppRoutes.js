import React from "react";
import { Route, Routes } from "react-router-dom";

import UserContext from "contexts/UserContext";
import { PrivateRoute, PublicRoute } from ".";
import {
  ForgotPassword,
  Home,
  Login,
  Profile,
  User,
  Department,
  Construction,
} from "pages";
import { URLS } from "config";

const AppRoutes = () => {
  const [user, setUser] = React.useState({ photo: null, id: null });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          exact
          path={URLS.HOME}
          element={<PrivateRoute Component={Home} />}
        />
        <Route
          exact
          path={URLS.USUARIO}
          element={<PrivateRoute Component={User} />}
        />
        <Route
          exact
          path={URLS.PERFIL}
          element={<PrivateRoute Component={Profile} />}
        />
        <Route
          exact
          path={URLS.DEPARTAMENTO}
          element={<PrivateRoute Component={Department} />}
        />
        <Route
          exact
          path={URLS.OBRA}
          element={<PrivateRoute Component={Construction} />}
        />
        <Route
          exact
          path={URLS.LOGIN}
          element={<PublicRoute Component={Login} />}
        />
        <Route
          exact
          path={URLS.ESQUECEU_SENHA}
          element={<PublicRoute Component={ForgotPassword} />}
        />
      </Routes>
    </UserContext.Provider>
  );
};

export { AppRoutes };
