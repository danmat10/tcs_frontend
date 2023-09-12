import React from "react";
import { Route, Routes } from "react-router-dom";

import { PrivateRoute, PublicRoute, AdminRoute, GestorRoute } from ".";
import { URLS } from "config";
import UserContext from "contexts/UserContext";
import {
  ForgotPassword,
  Home,
  Login,
  Profile,
  User,
  Department,
  Construction,
  Patrimony,
  Allocation,
} from "pages";
import { Maintence } from "pages/Maintence";

const AppRoutes = () => {
  const [user, setUser] = React.useState({ photo: null, id: null });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          exact
          path={URLS.USUARIO}
          element={<AdminRoute Component={User} />}
        />
        <Route
          exact
          path={URLS.HOME}
          element={<PrivateRoute Component={Home} />}
        />
        <Route
          exact
          path={URLS.PERFIL}
          element={<PrivateRoute Component={Profile} />}
        />
        <Route
          exact
          path={URLS.DEPARTAMENTO}
          element={<GestorRoute Component={Department} />}
        />
        <Route
          exact
          path={URLS.OBRA}
          element={<GestorRoute Component={Construction} />}
        />
        <Route
          exact
          path={URLS.ALOCACAO}
          element={<GestorRoute Component={Allocation} />}
        />
        <Route
          exact
          path={URLS.MANUTENCAO}
          element={<GestorRoute Component={Maintence} />}
        />
        <Route
          exact
          path={URLS.PATRIMONIO}
          element={<GestorRoute Component={Patrimony} />}
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
