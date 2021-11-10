const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

const audience =
	process.env.NODE_ENV === "production"
		? "http://localhost:3000/"
		: "localhost:3000/api/";

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://example.auth0.com/.well-known/jwks.json`,
	}),

  aud: audience,
	issuer: [`https://example.auth0.com/`],
	algorithms: ["RS256"],
});

const checkScopes = jwtAuthz(["read:submission", "edit:survey"]);

module.exports = { checkJwt, checkScopes };
