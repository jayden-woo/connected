const express = require("express");
const posts = require("../routes/posts");
const surveys = require("../routes/surveys");
const submissions = require("../routes/submissions");

const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://dev-8p7irqly.us.auth0.com/.well-known/jwks.json`,
	}),

	audience: "https://it-project-connected-api.herokuapp.com/",
	issuer: [`https://dev-8p7irqly.us.auth0.com/`],
	algorithms: ["RS256"],
});

module.exports = function (app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.get("/api/test", (req, res) => res.send("test"));

	app.use("/api/posts", posts);
	app.use("/api/surveys", surveys);
	app.use("/api/submissions", submissions);

	app.get("/", (req, res) => res.send("HOMEPAGE"));
	app.all("*", (req, res) => res.status(404).send("Page not found"));
};
