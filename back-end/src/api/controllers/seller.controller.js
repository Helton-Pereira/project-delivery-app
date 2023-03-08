const sellerService = require('../services/seller.service');
const { verifyToken } = require('../utils/token');

const getSalesBySellerId = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const checkToken = verifyToken(token);
  console.log(checkToken);
  
  try {
    const sales = await sellerService.getSalesBySellerId(checkToken.data);
    console.log(sales);
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
};

module.exports = { getSalesBySellerId };