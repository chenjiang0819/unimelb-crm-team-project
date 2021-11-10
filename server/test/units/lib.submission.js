const expect = require('chai').expect;
const common = require('../common');
const db = require('../common/db');
const SubmissionTestCase = require('../api/api.submissions.testCase');

describe('getSubmissionList testing', function () {
  it('get Submission list', () => {
    let body = db.getSubmissionsList();
    expect(body).to.be.an('array');
  });
});

describe('getSubmissionById testing', function () {
  it('get Submission by id exist', () => {
    let body = db.getSubmissionById(1);
    expect(body).to.be.an('object');
    expect(body._id).to.be.an('string');
  });
});

describe('getSubmissionById testing', function () {
  it('get Submission by id not exist', () => {
    let body = db.getSubmissionById(2);
    expect(Object.keys(body).length).to.be.equal(0);
  });
});

describe('add Submission testing', function () {
  it('add a Submission', () => {
    let body = db.addASubmission(SubmissionTestCase.addCompleteCase[0]);
    expect(body).to.be.an('object');
    expect(body._id).to.be.a('string');
  });
});
