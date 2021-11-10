const express = require("express");
const app = express();

// run with DEBUG=app:* yarn server
const debug = require("debug")("app:startup");

require("./startup/morgan")(app);
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));

module.exports = app;
