import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./helpers/Auth0ProviderWithHistory";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-edit-text/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "survey-react/modern.css";
import "./css/styles.css";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
