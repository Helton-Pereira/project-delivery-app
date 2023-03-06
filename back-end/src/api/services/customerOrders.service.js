const { Product, Sale, User } = require('../../database/models');

const getSales = async () => {
  const sales = await Sale.findAll();
  return sales;
};

const getSaleDetails = async (saleId) => {
  const sale = await Sale.findByPk(saleId, { include: [       
    { model: User, as: 'seller', attributes: ['id', 'name'] },
    { model: Product, as: 'products', through: { attributes: ['quantity'] } },
  ] });

  return sale;
};

module.exports = { getSales, getSaleDetails };