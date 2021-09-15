const cors = require('cors');

const whitelist = [
	'https://it-project-connected.herokuapp.com/',
	'https://team-15-connected.herokuapp.com/',
	'http://localhost:5000',
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
