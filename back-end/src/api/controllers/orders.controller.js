const ordersService = require('../services/orders.service');
const { verifyToken } = require('../utils/token');

const errorMessage = 'An error has occurred';

const getSales = async (_req, res) => {
  try {
    const sales = await ordersService.getSales();
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: errorMessage });
  }
};

const getSaleDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const saleDetails = await ordersService.getSaleDetails(id);
    return res.status(200).json(saleDetails);
  } catch (error) {
    res.status(500).json({ message: errorMessage });
  }
};

const getSalesByUserId = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const checkToken = verifyToken(token);
  
  try {
    const sales = await ordersService.getSalesByUserId(checkToken.data);
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: errorMessage });
  }
};

const updateSaleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    await ordersService.updateSaleStatus(id, status);
    return res.status(200).json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: errorMessage });
  }
};

module.exports = { getSales, getSaleDetails, getSalesByUserId, updateSaleStatus };