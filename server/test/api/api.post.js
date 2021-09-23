const expect = require('chai').expect;
const common = require('../common');
const rp = require('request-promise');
const testCases = require('./api.post.testCase');

describe('API post', function () {
    this.timeout(20000);
    /**
     * no role needed
     */
    before(async function () {
        // this.timeout(20000);
    });

    it('get post list', async () => {
        let body = await rp({
            method: 'GET',
            url: common.BASE_URL + '/posts',
            headers: {
                'authorization': ''     //no token info
            },
            json: true
        });
        expect(body).to.be.an('array');
    });

    for (let i = 0; i < testCases.addCompleteCase.length; i++) {
        it('add right post index : ' + i, async () => {
            let body = await rp({
                method: 'POST',
                url: common.BASE_URL + '/posts',
                headers: {
                    'authorization': ''     //no token info
                },
                body: testCases.addCompleteCase[i],
                json: true
            });
            expect(body).to.be.an('object');
            expect(body._id).to.be.a('string');
            // give the id
            post_id = body._id;
        });
    }

    for (let i = 0; i < testCases.addErrorCase.length; i++) {
        it('add error post index :' + i, async () => {
            try {
                let body = await rp({
                    method: 'POST',
                    url: common.BASE_URL + '/posts',
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

    it('get a post_id exist post', async () => {
        let body = await rp({
            method: 'GET',
            url: common.BASE_URL + '/posts/' + post_id,
            headers: {
                'authorization': ''     //no token info
            },
            json: true
        });
        expect(body).to.be.an('object');
        expect(body._id).to.be.an('string');
    });

    it('update a post ', async () => {
        let body = await rp({
            method: 'PUT',
            url: common.BASE_URL + '/posts/' + post_id,
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
        it('update right post index :' + i, async () => {
            let body = await rp({
                method: 'PUT',
                url: common.BASE_URL + '/posts/' + post_id,
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
        it('update error post index :' + i, async () => {
            try {
                let body = await rp({
                    method: 'PUT',
                    url: common.BASE_URL + '/posts/' + post_id,
                    headers: {
                        'authorization': ''     //no token info
                    },
                    body: testCases.updateErrorCase[i],
                    json: true
                });
            } catch (error) {
                expect(error.statusCode).to.equal(400);
            }
        });
    }

    it('delete a post', async () => {
        let body = await rp({
            method: 'DELETE',
            url: common.BASE_URL + '/posts/' + post_id,
            headers: {
                'authorization': ''     //no token info
            },
            method: 'DELETE',
            json: true
        });
        expect(body).to.be.an('object');
    });

    it('delete a not exits post', async () => {
        try {
            let body = await rp({
                method: 'DELETE',
                url: common.BASE_URL + '/posts/' + '1111',
                headers: {
                    'authorization': ''     //no token info
                },
                method: 'DELETE',
                json: true
            });
        } catch (error) {
            expect(error.statusCode).to.equal(404);
        }
    });

    it('get a post_id not exist post', async () => {
        try {
            let body = await rp({
                method: 'GET',
                url: common.BASE_URL + '/posts/' + post_id,
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