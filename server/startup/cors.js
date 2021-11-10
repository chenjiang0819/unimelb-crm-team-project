require("dotenv").config();
const cors = require("cors");

const whitelist = process.env.CORS_WHITELIST.split(" ");

module.exports = function (app) {
	app.use(
		cors({
			origin: whitelist,
			// access-control-allow-credentials: true,
			credentials: true,
			optionSuccessStatus: 200,
		}),
	);
};
