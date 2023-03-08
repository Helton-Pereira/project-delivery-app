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

const getSalesByUserId = async (email) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  const { id } = user.dataValues;
  const sale = await Sale.findAll({ where: { userId: id } });
  return sale;
};

const updateSaleStatus = async (saleId, newStatus) => {
  await Sale.update({ status: newStatus }, { where: { id: saleId } });
};

module.exports = { getSales, getSaleDetails, getSalesByUserId, updateSaleStatus };