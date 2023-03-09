const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jsonwebtoken = require('jsonwebtoken');

const { User, Sale } = require('../../database/models')
const app = require('../../api/app');
const ordersMocks = require('./mocks/sellerOrders.mocks');
const userMocks = require('./mocks/user.mocks')

const { expect } = chai;
chai.use(chaiHttp);

describe('Routes /seller/orders integration tests', async () => {

  afterEach(sinon.restore)

  describe('GET /seller/orders', () => {

    describe('Successful cases', () => {
      it('Returns all orders with HTTP status 200 according to the logged SELLER', async () => {
        sinon.stub(User, "findOne").resolves(userMocks.sellerUser);
        sinon.stub(Sale, "findAll").resolves(ordersMocks.allOrders);
        sinon.stub(jsonwebtoken, 'verify').resolves(ordersMocks.tokenPayload);

        const response = await chai
                .request(app)
                .get('/seller/orders')
                .set({ "Authorization": ordersMocks.token })
        
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(ordersMocks.allOrders);
      })
    });

    describe('Failure cases', () => {
      it('Returns an error with HTTP status 500 when the request fails', async () => {
        sinon.stub(User, "findOne").resolves(userMocks.sellerUser);
        sinon.stub(Sale, "findAll").throws(new Error);
        sinon.stub(jsonwebtoken, 'verify').resolves(ordersMocks.tokenPayload);

        const response = await chai
                .request(app)
                .get('/seller/orders')
                .set({ "Authorization": ordersMocks.token })

        expect(response.status).to.be.equal(500);
        expect(response.body).to.be.deep.equal({ message: 'An error has occurred' });
      })
    });
  });

  describe('GET /seller/orders/:id', () => {

    describe('Successful cases', () => {
      it('Returns a order with HTTP status 200 whose id was passed to URL', async () => {
        sinon.stub(Sale, "findByPk").resolves(ordersMocks.allOrders[0]);

        const response = await chai
                .request(app)
                .get(`/seller/orders/${ordersMocks.allOrders[0].id}`)
        
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(ordersMocks.allOrders[0]);
      })
    });
    
    describe('Failure cases', () => {
      it('Returns an error with HTTP status 500 when the request fails', async () => {
        sinon.stub(Sale, "findByPk").throws(new Error);

        const response = await chai
                .request(app)
                .get(`/seller/orders/${ordersMocks.allOrders[0].id}`)

        expect(response.status).to.be.equal(500);
        expect(response.body).to.be.deep.equal({ message: 'An error has occurred' });
      })
    });
  });
});