const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jsonwebtoken = require('jsonwebtoken');

const { User, Sale, SaleProduct } = require('../../database/models')
const app = require('../../api/app');
const mocks = require('./mocks/checkout.mocks');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /customer/checkout integration tests', async () => {

  afterEach(sinon.restore)

  describe('Successful cases', () => {
    it('Returns HTTP status 201 after successful checkout', async () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves(mocks.customerUser)
        .onSecondCall().resolves(mocks.sellerUser)
      sinon.stub(Sale, 'create').resolves(mocks.newSaleRes);
      sinon.stub(SaleProduct, 'create')
        .onFirstCall().resolves( { insertedId: 1} )
        .onSecondCall().resolves( { insertedId: 2} )
      sinon.stub(jsonwebtoken, 'verify').resolves(mocks.tokenPayload);

      const response = await chai
              .request(app)
              .post('/customer/checkout')
              .set({ "Authorization": mocks.token })
              .send(mocks.newSale);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(mocks.newSaleRes.dataValues);
    });
  });

  describe('Failure cases', () => {
    it('Returns an error with HTTP status 401 when no token is passed', async () => {

      const response = await chai
              .request(app)
              .post('/customer/checkout')
              .set({ "Authorization": '' })
              .send(mocks.newSale);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal( { message: "Token not found" } );
    });
  });

});