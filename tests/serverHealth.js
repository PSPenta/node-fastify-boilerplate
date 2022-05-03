const chai = require('chai');
const { StatusCodes } = require('http-status-codes');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
// eslint-disable-next-line no-unused-vars
const server = require('../app');

chai.use(chaiHttp);
const { expect, request } = chai;

describe('GET /healthz Testing Server Health ', () => {
  it('Server Health', (done) => {
    request(process.env.APP_URL).get('/api/healthz').end((err, res) => {
      expect(res.statusCode).to.be.equal(StatusCodes.OK);
      done();
    });
  });
});
