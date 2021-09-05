const expect = require('chai').expect;
const common = require('../common');
const rp = require('request-promise');
const testCases = require('./api.submissions.testCase');
const surveyTestCases = require('./api.survey.testCase');

describe('API submissions', function () {
  // this.timeout(100000);
  /**
   * 在测试用例之前执行，获取不同用户角色的token, 暂时用不到
   */
  before('', async () => {
    this.timeout(5000);
    //先创建一个问卷
    let body = await rp({
      method: 'POST',
      url: common.BASE_URL + '/surveys',
      headers: {
        'authorization': ''     //token验证信息，暂时没有
      },
      body: surveyTestCases.addCompleteCase[0],
      json: true
    });
    survey_id = body._id;
  });

  it('get survey list', async () => {
    let body = await rp({
      method: 'GET',
      url: common.BASE_URL + '/submissions',
      headers: {
        'authorization': ''     //token验证信息，暂时没有
      },
      json: true
    });
    expect(body).to.be.an('array');
  });

  it('add right submissions', async () => {
    let postBody = testCases.addCompleteCase;
    postBody.survey = survey_id;
    let body = await rp({
      method: 'POST',
      url: common.BASE_URL + '/submissions',
      headers: {
        'authorization': ''     //token验证信息，暂时没有
      },
      body: postBody,
      json: true
    });
    expect(body).to.be.an('object');
    expect(body._id).to.be.a('string');
    // id 赋值到全局，供下面使用
    submissions_id = body._id;
  });


  it('add error submissions', async () => {
    for (let i = 0; i < testCases.addErrorCase.length; i++) {
      let postBody = testCases.addErrorCase[i];
      postBody.survey = survey_id;
      try {
        let body = await rp({
          method: 'POST',
          url: common.BASE_URL + '/submissions',
          headers: {
            'authorization': ''     //token验证信息，暂时没有
          },
          body: postBody,
          json: true
        });
      } catch (error) {
        expect(error.statusCode).to.equal(400);
      }
    }

  });

  it('get a submission', async () => {
    let body = await rp({
      method: 'GET',
      url: common.BASE_URL + '/submissions/' + submissions_id,
      headers: {
        'authorization': ''     //token验证信息，暂时没有
      },
      json: true
    });
    expect(body).to.be.an('object');
    expect(body._id).to.be.an('string');
  });

  it('get a submission no exit', async () => {
    try {
      let body = await rp({
        method: 'GET',
        url: common.BASE_URL + '/submissions/' + '111',
        headers: {
          'authorization': ''     //token验证信息，暂时没有
        },
        json: true
      });
    } catch (error) {
      expect(error.statusCode).to.equal(404);
    }
  });

});