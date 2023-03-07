const customerOrders = require('../services/customerOrders.service');
const { verifyToken } = require('../utils/token');

const getSales = async (_req, res) => {
  try {
    const sales = await customerOrders.getSales();
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
};

const getSaleDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const saleDetails = await customerOrders.getSaleDetails(id);
    return res.status(200).json(saleDetails);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
};

const getSalesByUserId = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const checkToken = verifyToken(token);
  console.log(checkToken);
  
  try {
    const sales = await customerOrders.getSalesByUserId(checkToken.data);
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  };
}

module.exports = { getSales, getSaleDetails, getSalesByUserId };