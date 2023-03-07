const { User, Sale } = require('../../database/models');

const getSalesBySellerId = async (email) => {
  const sellers = await User.findOne({ where: { email } });
  console.log(sellers);
  const { id } = sellers.dataValues;
  const sale = await Sale.findAll({ where: { sellerId: id } });
  console.log('Vendas', sale);
  return sale;
};

module.exports = { getSalesBySellerId };