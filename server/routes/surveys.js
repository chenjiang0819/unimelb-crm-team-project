const express = require("express");
const router = express.Router();
const controller = require("../controllers/surveys");
const validateObjectId = require("../middleware/validateObjectId");
const { checkJwt, checkScopes } = require("../startup/auth0");

router.get("/", (req, res) => controller.getAllSurveys(req, res));
router.get("/:id", validateObjectId, (req, res) =>
	controller.getSurveyByID(req, res),
);
router.post("/", checkJwt, checkScopes, (req, res) =>
	controller.addSurvey(req, res),
);
router.put("/:id", checkJwt, checkScopes, validateObjectId, (req, res) =>
	controller.updateSurvey(req, res),
);

module.exports = router;
