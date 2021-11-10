const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth0");

router.get("/getUserInfo/:sub", (req, res) => controller.getuserInfo(req, res));
router.get("/users", (req, res) => controller.getAllUsers(req, res));
router.patch("/updateUser", (req, res) => controller.updateUser(req, res));

module.exports = router;
