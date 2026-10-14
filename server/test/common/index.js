/* Historical provider-dependent test helper: disabled unless explicitly enabled. */
const axios = require('axios');
exports.getAccessToken = async () => {
  if (process.env.RUN_REAL_PROVIDER_TESTS !== 'true') throw new Error('Real-provider tests disabled');
  const domain = process.env.AUTH0_DOMAIN;
  const client_id = process.env.AUTH0_TEST_CLIENT_ID;
  const client_secret = process.env.AUTH0_TEST_CLIENT_SECRET;
  const audience = process.env.AUTH0_AUDIENCE;
  if (!domain || !/^[a-z0-9.-]+\.auth0\.com$/i.test(domain) || !client_id || !client_secret || !audience)
    throw new Error('Configure your own test identity provider explicitly');
  const response = await axios.request({method:'POST',url:`https://${domain}/oauth/token`,timeout:5000,
    data:{grant_type:'client_credentials',client_id,client_secret,audience}});
  return response.data.access_token;
};
exports.BASE_URL = process.env.TEST_API_URL || 'http://127.0.0.1:3000/api';
exports.FROUT_BASE_URL = process.env.TEST_FRONTEND_URL || 'http://127.0.0.1:5000';
