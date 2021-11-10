const path = require("path");
const morgan = require("morgan");
const express = require("express");
const debug = require("debug")("app:startup");

module.exports = function (app) {
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug("Morgan enabled...");
  // } else if (process.env.NODE_ENV === "production") {
  //   app.use(express.static(path.join(__dirname, "../../client/build")));
  //   app.get("*", (req, res) => {
  //     res.sendFile(path.join(__dirname + "/../../client/build/index.html"));
  //   });
  }
};
