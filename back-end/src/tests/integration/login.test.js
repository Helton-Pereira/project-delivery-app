const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jsonwebtoken = require('jsonwebtoken');

const { User } = require('../../database/models')
const app = require('../../api/app');
const mocks = require('./mocks/user.mocks');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /login integration tests', async () => {

  afterEach(sinon.restore)

  describe('Successful cases', () => {
    it('Returns name, role and token with HTTP status 200', async () => {
      sinon.stub(User, "findOne").resolves(mocks.user);
      sinon.stub(jsonwebtoken, 'sign').returns(mocks.token);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: mocks.user.dataValues.email,
                password: '$#zebirita#$'
              });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...mocks.userRes, token: mocks.token });
    })
  });

  describe('Failure cases', () => {
    it('Returns an error with HTTP status 400 when email is invalid', async () => {
      sinon.stub(User, "findOne").resolves(null);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'invalid',
                password: '123456'
              });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: '"email" must be a valid email' });
    });

    it('Returns an error with HTTP status 404 when password is invalid', async () => {
      sinon.stub(User, "findOne").resolves(mocks.user);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: mocks.user.dataValues.email,
                password: 'x'
              });

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Invalid password' });
    });

    it('Returns an error with HTTP status 404 when user is not found', async () => {
      sinon.stub(User, "findOne").resolves(null);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'test@test.com',
                password: '123456'
              });

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email' });
    });
  });
});