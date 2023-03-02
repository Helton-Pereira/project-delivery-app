const { productService } = require('../services');
/* const { mapError } = require('../utils/errorMap'); */

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
}

module.exports = { getAll };