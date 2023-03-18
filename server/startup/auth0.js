const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

const audience =
  process.env.NODE_ENV === "production"
    ? // ? "https://it-project-connected-api.herokuapp.com/"
      process.env.BASE_URL
    : "localhost:3000/api/";

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // jwksUri: `https://dev-8p7irqly.us.auth0.com/.well-known/jwks.json`,
    jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
  }),

  aud: audience,
  // issuer: [`https://dev-8p7irqly.us.auth0.com/`],
  issuer: [process.env.AUTH0_DOMAIN],
  algorithms: ["RS256"],
});

const checkScopes = jwtAuthz(["read:submission", "edit:survey"]);

module.exports = { checkJwt, checkScopes };
