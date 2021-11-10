const expect = require('chai').expect;
const common = require('../common/index');
const rp = require('request-promise');
const testCases = require('./api.survey.testCase');

describe('API survey', function () {
  this.timeout(300000);
  /**
   * get access_token befor to testcase
   */
  before(async function () {
    access_token = await common.getAccessToken();
  });

  it('get survey list', async () => {
    let body = await rp({
      method: 'GET',
      url: common.BASE_URL + '/surveys',
      headers: {
        'authorization': ''     //no token info
      },
      json: true
    });
    expect(body).to.be.an('array');
  });

  it('add some right survey', async () => {
    for (let i = 0; i < testCases.addCompleteCase.length; i++) {
      let body = await rp({
        method: 'POST',
        url: common.BASE_URL + '/surveys',
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        body: testCases.addCompleteCase[i],
        json: true
      });
      expect(body).to.be.an('object');
      expect(body._id).to.be.a('string');
      // survey id 
      survey_id = body._id;
    }
  })

  it('add some error survey', async () => {
    for (let i = 0; i < testCases.addErrorCase.length; i++) {
      try {
        let body = await rp({
          method: 'POST',
          url: common.BASE_URL + '/surveys',
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
          body: testCases.addErrorCase[i],
          json: true
        });
      } catch (error) {
        expect(error.statusCode).to.equal(400);
      }
    }
  })


  it('get a survey_id exist survey', async () => {
    let body = await rp({
      method: 'GET',
      url: common.BASE_URL + '/surveys/' + survey_id,
      headers: {
        'authorization': ''     //no token info
      },
      json: true
    });
    expect(body).to.be.an('object');
    expect(body._id).to.be.an('string');
  });

  it('udpate a survey', async () => {
    let body = await rp({
      method: 'PUT',
      url: common.BASE_URL + '/surveys/' + survey_id,
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      body: {
        title: 'title to update'
      },
      json: true
    });
    expect(body).to.be.an('object');
    expect(body.title).to.equal('title to update');
  });

  it('update error survey', async () => {
    for (let i = 0; i < testCases.addErrorCase.length; i++) {
      try {
        let body = await rp({
          method: 'PUT',
          url: common.BASE_URL + '/surveys/' + survey_id,
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
          body: testCases.addErrorCase[i],
          json: true
        });
      } catch (error) {
        expect(error.statusCode).to.equal(400);
      }
    }
  });

  it('get a survey_id no exist survey', async () => {
    try {
      let body = await rp({
        method: 'GET',
        url: common.BASE_URL + '/surveys/' + '111',
        headers: {
          'authorization': ''     //no token info
        },
        json: true
      });
    } catch (error) {
      expect(error.statusCode).to.equal(404);
    }
  });
});