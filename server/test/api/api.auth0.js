const expect = require('chai').expect;
const common = require('../common');
const rp = require('request-promise');

describe('API post', function () {
  this.timeout(20000);
  /**
   * no role needed
   */
  before(async function () {
    // this.timeout(20000);
  });

  it('get user info', async () => {
    let body = await rp({
      method: 'GET',
      url: common.BASE_URL + '/auth0/getUserInfo/' + "google-oauth2|101384514038333635972",
      json: true
    });
    expect(body).to.be.an('object');
  });
});