require("dotenv").config();
const cors = require("cors");

const corsOptions = {
  origin: process.env.CORS_WHITELIST.split(" "),
  // access-control-allow-credentials: true,
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = function (app) {
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
};
