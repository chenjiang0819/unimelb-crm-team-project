const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth0');
// Safe default does not initialize a real provider or fetch signing keys.
if (process.env.ENABLE_AUTH0_MANAGEMENT === 'true') {
  const {checkJwt} = require('../startup/auth0');
  router.use(checkJwt);
}
router.get('/getUserInfo/:sub', controller.getuserInfo);
router.get('/users', controller.getAllUsers);
router.patch('/updateUser', controller.updateUser);
module.exports = router;
