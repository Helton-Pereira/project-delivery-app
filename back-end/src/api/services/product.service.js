const { Product } = require('../../database/models');

const getAll = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = { getAll };