const express = require("express");
const { checkJwt, checkScopes } = require("./auth0");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // testing auth0 middlewares
  app.get("/api/private", checkJwt, (req, res) => {
    res.send(
      "Hello from a private endpoint! You need to be authenticated to see this."
    );
  });

  app.get("/api/private-scoped", checkJwt, checkScopes, (req, res) => {
    res.send(
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
    );
  });

  app.get("/", (req, res) => {
    res.send("HOMEPAGE");
  });

  app.all("*", (req, res) => {
    res.status(404).send("Page not found");
  });
};
