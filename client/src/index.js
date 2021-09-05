import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-edit-text/dist/index.css';
import './css/styles.css';
import history from "./utils/history"

const onRedirectCallback = (appState) => {
	history.push(
	  appState && appState.returnTo ? appState.returnTo : window.location.pathname
	);
  };

// Please see https://auth0.github.io/auth0-react/interfaces/auth0_provider.auth0provideroptions.html
ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-8p7irqly.us.auth0.com"
			clientId="nQuq0RRvq1qHJm71fVywenxJndfhMvAY"
			redirectUri={window.location.origin}
			audience="localhost:3000/api/"
			scope="read:posts"
			onRedirectCallback={onRedirectCallback}
			useRefreshTokens
			cacheLocation="localstorage"
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
