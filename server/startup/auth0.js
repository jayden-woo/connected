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

  audience: "localhost:3000/api/",
  issuer: [`https://dev-8p7irqly.us.auth0.com/`],
  algorithms: ["RS256"],
});

const checkScopes = jwtAuthz(["read:posts"]);

exports.checkJwt = checkJwt;
exports.checkScopes = checkScopes;
