import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position="top-center" />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
