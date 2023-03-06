const { productService } = require('../services');
/* const { mapError } = require('../utils/errorMap'); */

const getAll = async (_req, res) => {
  try {
    const productsAndSellers = await productService.getAll();
    return res.status(200).json(productsAndSellers);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
};

module.exports = { getAll };