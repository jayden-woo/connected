const cors = require('cors');

const whitelist = [
	'https://it-project-connected.herokuapp.com',
	'http://localhost:5000',
	'https://it-project-connected-staging.herokuapp.com/', 
	'https://it-project-connected-dev.herokuapp.com/', 
	'https://it-project-connected-br-releas.herokuapp.com'
];

module.exports = function (app) {
	app.use(
		cors({
			origin: whitelist,
			// access-control-allow-credentials: true,
			credentials: true,
			optionSuccessStatus: 200,
		}),
	);
};
