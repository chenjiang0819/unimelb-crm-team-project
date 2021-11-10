const expect = require('chai').expect;
const common = require('../common');
const db = require('../common/db');
const SurveyTestCase = require('../api/api.survey.testCase');

describe('getSurveyList testing', function () {
  it('get Survey list', () => {
    let body = db.getSurveyList();
    expect(body).to.be.an('array');
  });
});

describe('getSurveyById testing', function () {
  it('get Survey by id exist', () => {
    let body = db.getSurveyById(1);
    expect(body).to.be.an('object');
    expect(body._id).to.be.an('string');
  });
});

describe('getSurveyById testing', function () {
  it('get Survey by id not exist', () => {
    let body = db.getSurveyById(2);
    expect(Object.keys(body).length).to.be.equal(0);
  });
});

describe('add Survey testing', function () {
  it('add a Survey', () => {
    let body = db.addASurvey(SurveyTestCase.addCompleteCase[0]);
    expect(body).to.be.an('object');
    expect(body._id).to.be.a('string');
  });
});

describe('update Survey testing', function () {
  it('update a Survey', () => {
    let body = db.updateASurvey(1, SurveyTestCase.addCompleteCase[0]);
    expect(body).to.be.an('object');
    expect(body._id).to.be.a('string');
  });
});
