const express = require("express");
const posts = require("../routes/posts");
const surveys = require("../routes/surveys");
const submissions = require("../routes/submissions");
const { checkJwt } = require("../startup/auth0");

module.exports = function (app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.get("/api/test", checkJwt, (req, res) => res.send("test"));

	app.use("/api/posts", posts);
	app.use("/api/surveys", surveys);
	app.use("/api/submissions", submissions);

	app.get("/", (req, res) => res.send("HOMEPAGE"));
	app.all("*", (req, res) => res.status(404).send("Page not found"));
};
