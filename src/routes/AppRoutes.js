import React from "react";
import { Route, Routes } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { ForgotPassword, Home, Login, Profile, User } from "../pages";

const AppRoutes = () => {
  const [user, setUser] = React.useState({ photo: null, id: null });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route exact path="/" element={<PrivateRoute Component={Home} />} />
        <Route
          exact
          path="/users"
          element={<PrivateRoute Component={User} />}
        />
        <Route
          exact
          path="/profile"
          element={<PrivateRoute Component={Profile} />}
        />

        <Route
          exact
          path="/login"
          element={<PublicRoute Component={Login} />}
        />
        <Route
          exact
          path="/forgot-password"
          element={<PublicRoute Component={ForgotPassword} />}
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default AppRoutes;
