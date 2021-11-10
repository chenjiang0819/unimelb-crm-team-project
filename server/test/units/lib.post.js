const expect = require('chai').expect;
const common = require('../common');
const db = require('../common/db');
const postTestCase = require('../api/api.post.testCase');

describe('getPostList testing', function () {
  it('get post list', () => {
    let body = db.getPostList();
    expect(body).to.be.an('array');
  });
});

describe('getPostById testing', function () {
  it('get post by id exist', () => {
    let body = db.getPostById(1);
    expect(body).to.be.an('object');
    expect(body._id).to.be.an('string');
  });
});

describe('getPostById testing', function () {
  it('get post by id not exist', () => {
    let body = db.getPostById(2);
    expect(Object.keys(body).length).to.be.equal(0);
  });
});

describe('add post testing', function () {
  it('add a post', () => {
    let body = db.addAPost(postTestCase.addCompleteCase[0]);
    expect(body).to.be.an('object');
    expect(body._id).to.be.a('string');
  });
});

describe('update post testing', function () {
  it('update a post', () => {
    let body = db.updateAPost(1, postTestCase.updateCompleteCase[0]);
    expect(body).to.be.an('object');
    expect(body._id).to.be.a('string');
  });
});

describe('delete post ', function () {
  it('delete a post', () => {
    let body = db.delAPostById(1);
    expect(body).to.be.an('object');
    expect(body._id).to.be.a('string');
  });
});