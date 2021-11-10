require("dotenv").config();
const mongoose = require("mongoose");
const debug = require("debug")("app:db");

module.exports = function () {
  CONNECTION_STRING =
    "mongodb+srv://<username>:<password>@<db>/CRM?retryWrites=true&w=majority";
  MONGO_URL = CONNECTION_STRING
  .replace(
    "<username>",
    process.env.MONGO_USERNAME
  ).replace(
    "<password>",
    process.env.MONGO_PASSWORD
  ).replace(
    "<db>",
    process.env.MONGO_DB
  );

  mongoose.connect(MONGO_URL || "mongodb://localhost", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "CRM",
  });

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("Could not connect to MongoDB...", err);
    process.exit(1);
  });

  db.once("open", () => {
    debug("Mongo connection started on " + db.host + ":" + db.port);
  });
};
