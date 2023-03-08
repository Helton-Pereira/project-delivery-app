const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jsonwebtoken = require('jsonwebtoken');

const { User, Sale } = require('../../database/models')
const app = require('../../api/app');
const ordersMocks = require('./mocks/customerOrders.mocks');
const userMocks = require('./mocks/user.mocks')

const { expect } = chai;
chai.use(chaiHttp);

describe('Routes /customer/orders integration tests', async () => {

  afterEach(sinon.restore)

  describe('GET /customer/orders', () => {
    describe('Successful cases', () => {
      it('Returns all orders with HTTP status 200 according to the logged user', async () => {
        sinon.stub(User, "findOne").resolves(userMocks.user);
        sinon.stub(Sale, "findAll").resolves(ordersMocks.allOrders);
        sinon.stub(jsonwebtoken, 'verify').resolves(ordersMocks.tokenPayload);

        const response = await chai
                .request(app)
                .get('/customer/orders')
                .set({ "Authorization": ordersMocks.token })
        
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(ordersMocks.allOrders);
      })
    });
    describe('Failure cases', () => {
      it('Returns an error with HTTP status 500 when the request fails', async () => {
        sinon.stub(User, "findOne").throws(new Error);
        sinon.stub(Sale, "findAll").resolves(ordersMocks.allOrders);
        sinon.stub(jsonwebtoken, 'verify').resolves(ordersMocks.tokenPayload);

        const response = await chai
                .request(app)
                .get('/customer/orders')
                .set({ "Authorization": ordersMocks.token })

        expect(response.status).to.be.equal(500);
        expect(response.body).to.be.deep.equal({ message: 'An error has occurred' });
      })
    });
  });
});