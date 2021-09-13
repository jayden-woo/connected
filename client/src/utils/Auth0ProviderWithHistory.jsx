import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./history";

// eslint-disable-next-line react/prop-types
const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState) => {
    history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      scope="read:users read:user_idp_tokens read:current_user"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;