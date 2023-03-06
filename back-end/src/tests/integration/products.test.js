const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jsonwebtoken = require('jsonwebtoken');

const { Product } = require('../../database/models')
const app = require('../../api/app');
const mocks = require('./mocks/products.mock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Routes /customer/products integration tests', async () => {

  afterEach(sinon.restore)

  describe('GET /customer/products', () => {
    describe('Successful cases', () => {
      it('Returns all products with HTTP status 200', async () => {
        sinon.stub(Product, "findAll").resolves(mocks.allProducts);
  
        const response = await chai
                .request(app)
                .get('/customer/products')
        
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mocks.allProducts);
      })
    });
    describe('Failure cases', () => {
      it('Returns an error with HTTP status 500 when the request fails', async () => {
        sinon.stub(Product, "findAll").throws(new Error);
  
        const response = await chai
                .request(app)
                .get('/customer/products')
        
        expect(response.status).to.be.equal(500);
        expect(response.body).to.be.deep.equal({ message: 'An error has occurred' });
      })
    });
  });
});