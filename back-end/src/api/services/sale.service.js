const { Sale } = require('../../database/models');
const { User } = require('../../database/models');
const saleProductService = require('./saleProduct.service');


const createSale = async ({ userName, sellerName, totalPrice, deliveryAddress, deliveryNumber, products, quantities }) => {
  const user = await User.findOne({ where: { name: userName }})
  const seller = await User.findOne({ where: { name: sellerName }})

  const sellerId = seller.dataValues.id;
  const userId = user.dataValues.id;

  const result = await Sale.create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber });

  const { id } = result.dataValues;

  await saleProductService.createSaleProduct({id, products, quantities});
  
  return id;
};

module.exports = { createSale };