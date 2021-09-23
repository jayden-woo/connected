const expect = require('chai').expect;
const common = require('../common');
const rp = require('request-promise');
const testCases = require('./api.survey.testCase');

describe('API survey', function () {
  this.timeout(10000);
  /**
   * no role needed
   */
  before(async function () {
    // this.timeout(20000);
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

  for (let i = 0; i < testCases.addCompleteCase.length; i++) {
    it('add right survey index: ' + i, async () => {
      let body = await rp({
        method: 'POST',
        url: common.BASE_URL + '/surveys',
        headers: {
          'authorization': ''     //no token info
        },
        body: testCases.addCompleteCase[i],
        json: true
      });
      expect(body).to.be.an('object');
      expect(body._id).to.be.a('string');
      // survey id 
      survey_id = body._id;
    });
  }

  for (let i = 0; i < testCases.addErrorCase.length; i++) {
    it('add error survey index : ' + i, async () => {
      try {
        let body = await rp({
          method: 'POST',
          url: common.BASE_URL + '/surveys',
          headers: {
            'authorization': ''     //no token info
          },
          body: testCases.addErrorCase[i],
          json: true
        });
      } catch (error) {
        expect(error.statusCode).to.equal(400);
      }
    });
  }

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
        'authorization': ''     //no token info
      },
      body: {
        title: 'title to update'
      },
      json: true
    });
    expect(body).to.be.an('object');
    expect(body.title).to.equal('title to update');
  });

  for (let i = 0; i < testCases.updateCompleteCase.length; i++) {
    it('update right survey index :' + i, async () => {
      let body = await rp({
        method: 'PUT',
        url: common.BASE_URL + '/surveys/' + survey_id,
        headers: {
          'authorization': ''     //no token info
        },
        body: testCases.updateCompleteCase[i],
        json: true
      });
      expect(body).to.be.an('object');
    });
  }

  for (let i = 0; i < testCases.updateErrorCase.length; i++) {
    it('update error survey index :' + i, async () => {
      try {
        let body = await rp({
          method: 'PUT',
          url: common.BASE_URL + '/surveys/' + survey_id,
          headers: {
            'authorization': ''     //no token info
          },
          body: testCases.updateCompleteCase[i],
          json: true
        });
      } catch (error) {
        expect(error.statusCode).to.equal(400);
      }
    });
  }

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