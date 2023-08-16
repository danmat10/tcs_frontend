import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { ForgotPassword, Home, Login, Profile, User } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<PrivateRoute Component={Home} />} />
      <Route exact path="/users" element={<PrivateRoute Component={User} />} />
      <Route exact path="/profile" element={<PrivateRoute Component={Profile} />} />

      <Route exact path="/login" element={<PublicRoute Component={Login} />} />
      <Route
        exact
        path="/forgot-password"
        element={<PublicRoute Component={ForgotPassword} />}
      />
    </Routes>
  );
};

export default AppRoutes;
