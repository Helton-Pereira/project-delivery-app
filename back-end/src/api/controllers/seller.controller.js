const sellerService = require('../services/seller.service');
const { verifyToken } = require('../utils/token');

const getSalesBySellerId = async (req, res) => {
  const token = req.headers.authorization;

  const checkToken = await verifyToken(token);
  
  try {
    const sales = await sellerService.getSalesBySellerId(checkToken.email);
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
};

module.exports = { getSalesBySellerId };