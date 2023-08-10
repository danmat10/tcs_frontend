import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { useIsAuthenticated } from "react-auth-kit";

import "./App.css";
import { refreshApi } from "./services";
import { User, Home, Login } from "./pages";

const PrivateRoute = ({ Component, redirectTo, inverse = false }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  if (inverse ? !auth : auth) {
    return <Component />;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  render() {
    return (
      <AuthProvider
        authType={"localstorage"}
        authName={"_auth"}
        refresh={refreshApi}
      >
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<PrivateRoute Component={Home} redirectTo="/login" />}
            />
            <Route
              exact
              path="/users"
              element={<PrivateRoute Component={User} redirectTo="/login" />}
            />
            <Route
              exact
              path="/login"
              element={
                <PrivateRoute Component={Login} redirectTo="/" inverse={true} />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
