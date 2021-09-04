import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-edit-text/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './css/styles.css';

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-8p7irqly.us.auth0.com"
			clientId="nQuq0RRvq1qHJm71fVywenxJndfhMvAY"
			redirectUri={window.location.origin}
			audience="localhost:3000/api/"
			scope="read:posts"
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
