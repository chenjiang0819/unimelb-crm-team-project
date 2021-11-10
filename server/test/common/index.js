/* testing for local setup */
var axios = require('axios')

var options = {
  method: 'POST',
  url: 'https://example.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: {
    grant_type: 'client_credentials',
    client_id: 'FmU3TIDMMQHe7ANvJuY5zRQbztbsbEVG',
    client_secret: 'REDACTED_CREDENTIAL',
    audience: "http://localhost:3000/"
    // "audience": "localhost:3000/api/",
}
};

exports.getAccessToken = async () => {
  return new Promise((resolve, reject) => {
    axios.request(options).then(response => {
      resolve(response.data.access_token);
    });
  })
}

exports.BASE_URL = 'http://localhost:3000/';
exports.FROUT_BASE_URL = "http://localhost:3000/"

// exports.BASE_URL = 'http://localhost:3000/api';
// exports.BACK_BASE_URL = "http://localhost:5000"
