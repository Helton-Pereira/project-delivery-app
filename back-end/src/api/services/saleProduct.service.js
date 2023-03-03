const { SaleProduct } = require('../../database/models');

const createSaleProduct = async ({ id, productsId, quantities }) => {
  const saleOrder = productsId.map((e, i) => {
    const obj = {
      saleId: id,
      productId: productsId[i],
      quantity: quantities[i],
    };
    return obj;
  });

  await Promise.all(
    saleOrder.map((product) => SaleProduct.create(product)),
  );
};

module.exports = { createSaleProduct };