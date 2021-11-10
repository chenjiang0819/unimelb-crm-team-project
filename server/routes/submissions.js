const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const controller = require("../controllers/submissions");
const { checkJwt, checkScopes } = require("../startup/auth0");

router.get("/", checkJwt, checkScopes, (req, res) =>
	controller.getAllSubmissions(req, res),
);
router.get("/:id", checkJwt, checkScopes, validateObjectId, (req, res) =>
	controller.getSubmissionByID(req, res),
);
router.post("/", (req, res) => controller.addSubmission(req, res));

module.exports = router;
