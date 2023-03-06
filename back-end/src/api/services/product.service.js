const { Product, User } = require('../../database/models');

const getAll = async () => {
  const products = await Product.findAll();
  const sellers = await User.findAll(
    { where: { role: 'seller' }, attributes: { exclude: 'password' } } );
  return { products, sellers };
};

module.exports = { getAll };