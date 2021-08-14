const mongoose = require("mongoose");

module.exports = function () {
  const db =
    "mongodb+srv://IT-PROJECT:CONNECTED@team-connected.94ydr.mongodb.net/CRM?retryWrites=true&w=majority";

  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connecting to MongoDB..."));
};
