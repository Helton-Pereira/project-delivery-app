const { SaleProduct } = require('../../database/models/saleProduct.model');
const { Product } = require('../../database/models/product.model');

const createSaleProduct = async ({id, products, quantities}) => {
  const productIds = await Promise.all(
    products.map(async (productName) => await Product.findOne({ where: { name: productName }}))
  )

  console.log(productIds);
}

module.exports = { createSaleProduct };