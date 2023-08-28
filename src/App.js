import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import 'typeface-roboto';

import "./App.css";
import { refreshApi } from "services";
import AppRoutes from "routes/AppRoutes";

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
          <AppRoutes />
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
