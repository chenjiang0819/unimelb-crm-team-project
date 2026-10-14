/* eslint-disable react/prop-types */
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line react/prop-types
// Please see https://auth0.github.io/auth0-react/interfaces/auth0_provider.auth0provideroptions.html
const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens
      scope="read:users read:user_idp_tokens read:current_user read:submission edit:survey"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
