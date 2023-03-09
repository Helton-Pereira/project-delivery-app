const { User, Sale } = require('../../database/models');

const getSalesBySellerId = async (email) => {
  const sellers = await User.findOne({ where: { email } });
  const { id } = sellers.dataValues;
  const sale = await Sale.findAll({ where: { sellerId: id } });
  return sale;
};

module.exports = { getSalesBySellerId };