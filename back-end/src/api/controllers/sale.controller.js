const saleService = require('../services/sale.service');

const createSale = async (req, res) => {
  const { name, seller, totalPrice, deliveryAddress, deliveryNumber, products, quantities } = req.body;

  const userName = name;
  const sellerName = seller;

  const id = await saleService.createSale({
    userName, sellerName, totalPrice, deliveryAddress, deliveryNumber, products, quantities
  });

  return res.status(201).json({ id });
};

module.exports = { createSale };