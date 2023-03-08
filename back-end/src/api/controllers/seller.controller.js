const sellerService = require('../services/seller.service');
const { verifyToken } = require('../utils/token');

const getSalesBySellerId = async (req, res) => {
  const token = req.headers.authorization;

  const checkToken = verifyToken(token);
  
  try {
    const sales = await sellerService.getSalesBySellerId(checkToken.data.email);
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
};

module.exports = { getSalesBySellerId };