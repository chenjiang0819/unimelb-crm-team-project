var postTestCase = require('../api/api.post.testCase');
var surveyTestCase = require('../api/api.survey.testCase');
var submissionTestCase = require('../api/api.submissions.testCase');

postTestCase.addCompleteCase.forEach((item, index)=>{
  item._id = index.toString();
});

surveyTestCase.addCompleteCase.forEach((item, index)=>{
  item._id = index.toString();
});

submissionTestCase.addCompleteCase._id = "1";
submissionTestCase.addCompleteCase = [submissionTestCase.addCompleteCase];

exports.getPostList = function () {
  console.log('to db get post list');
  return postTestCase.addCompleteCase;
};

exports.getPostById = function (id) {
  console.log('get a post by post_id');
  if (id === 1) {
    return postTestCase.addCompleteCase[0];
  } else {
    return {};
  }
};

exports.addAPost = function (params) {
  console.log('insert a data into db');
  return params;
}

exports.updateAPost = function (id, params) {
  console.log('update a data into db');
  if (Object.keys(this.getPostById(id)).length === 0) {
    return {};
  }
  params._id = "1";
  return params;
}

exports.delAPostById = function (id) {
  console.log('del a post by post_id');
  if (id === 1) {
    return postTestCase.addCompleteCase[0];
  } else {
    return {};
  }
}

exports.getSurveyList = function () {
  console.log('to db get survey list');
  return surveyTestCase.addCompleteCase;
};

exports.getSurveyById = function (id) {
  console.log('get a survey by survey_id');
  if (id === 1) {
    return surveyTestCase.addCompleteCase[0];
  } else {
    return {};
  }
};

exports.addASurvey = function (params) {
  console.log('insert a data into db');
  return params;
}

exports.updateASurvey = function (id, params) {
  console.log('update a data into db');
  if (Object.keys(this.getSurveyById(id)).length === 0) {
    return {};
  }
  params._id = "1";
  return params;
}

exports.getSubmissionsList = function () {
  console.log('to db get submission list');
  return submissionTestCase.addCompleteCase;
}

exports.getSubmissionById = function (id) {
  console.log('get a submission by submission_id');
  if (id === 1) {
    return submissionTestCase.addCompleteCase[0];
  } else {
    return {};
  }
}

exports.addASubmission = function (params) {
  console.log('insert a data into db');
  return params;
}