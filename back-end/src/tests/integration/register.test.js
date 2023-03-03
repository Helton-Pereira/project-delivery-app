const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jsonwebtoken = require('jsonwebtoken');

const { User } = require('../../database/models')
const app = require('../../api/app');
const mocks = require('./mocks/register.mocks');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /register integration tests', async () => {

  afterEach(sinon.restore)

  describe('Successful cases', () => {
    it('Performs login and returns HTTP status 200 after successful user creation', async () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves(null)
        .onSecondCall().resolves(null)
        .onThirdCall().resolves(mocks.newUserCreated);
      sinon.stub(User, 'create');
      sinon.stub(jsonwebtoken, 'sign').returns(mocks.token);

      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: mocks.newUser.name,
                email: mocks.newUser.email,
                password: mocks.unhashedPassword,
              });


      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ ...mocks.newUserRes, token: mocks.token });
    })
  });

  describe('Failure cases', () => {
    it('Returns an error with HTTP status 400 when email is invalid', async () => {
      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: mocks.newUser.name,
                email: 'invalid',
                password: mocks.unhashedPassword,
              });
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: '"email" must be a valid email' });
    });

    it('Returns an error with HTTP status 400 when name is invalid', async () => {
      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: 'invalid',
                email: mocks.newUser.email,
                password: mocks.unhashedPassword,
              });
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: '"Name" length must be at least 12 characters long' });
    });

    it('Returns an error with HTTP status 400 when password is invalid', async () => {
      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: mocks.newUser.name,
                email: mocks.newUser.email,
                password: 'xxx',
              });
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: '"password" length must be at least 6 character long' });
    });

    it('Returns an error with HTTP status 409 when email is already registered', async () => {
      sinon.stub(User, 'findOne').resolves(mocks.alreadyRegisteredUser);

      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: mocks.newUser.name,
                email: mocks.alreadyRegisteredUser.dataValues.email,
                password: mocks.unhashedPassword,
              });
      
      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.deep.equal({ message: 'User already registered' });
    });

    it('Returns an error with HTTP status 409 when name is already registered', async () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves(null)
        .onSecondCall().resolves(mocks.alreadyRegisteredUser)
  
      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: mocks.alreadyRegisteredUser.dataValues.name,
                email: mocks.newUser.email,
                password: mocks.unhashedPassword,
              });
      
      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.deep.equal({ message: 'User already registered' });
    });
  });
});