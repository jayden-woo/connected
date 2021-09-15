import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./utils/Auth0ProviderWithHistory";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-edit-text/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "survey-react/modern.css";
import "./css/styles.css";

// Please see https://auth0.github.io/auth0-react/interfaces/auth0_provider.auth0provideroptions.html
ReactDOM.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </React.StrictMode>,
  document.getElementById("root")
);
