import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import "typeface-roboto";

import "./App.css";
import { refreshApi } from "services";
import { AppRoutes } from "routes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "theme";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider
          authType={"localstorage"}
          authName={"_auth"}
          refresh={refreshApi}
        >
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}

export default App;
