const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;
if (!domain || !/^[a-z0-9.-]+\.auth0\.com$/i.test(domain) || !audience)
  throw new Error('Configure AUTH0_DOMAIN and AUTH0_AUDIENCE before enabling identity integration');

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${domain}/.well-known/jwks.json`,
	}),

  audience: audience,
	issuer: [`https://${domain}/`],
	algorithms: ["RS256"],
});

const checkScopes = jwtAuthz(["read:submission", "edit:survey"]);

module.exports = { checkJwt, checkScopes };
