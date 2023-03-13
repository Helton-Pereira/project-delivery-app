import PropTypes from 'prop-types';
import conversions from '../utils/conversions';

function TableSellerOrderDetails({ productsArray }) {
  let totalCart = 0;
  const fillTableDescription = () => {
    const products = productsArray;
    const tableElement = products.map((element, i) => {
      const {
        name,
        SaleProduct,
      } = element;
      let {
        price,
      } = element;

      price = Number(price, 2);
      totalCart += (SaleProduct.quantity * price);
      return (
        <tr key={ i }>
          <td
            className="seller-order-details-table-item-order"
            data-testid={
              `seller_order_details__element-order-table-item-number-${i}`
            }
          >
            { (i + 1) }
          </td>
          <td
            className="seller-order-details-table-item-name"
            data-testid={ `seller_order_details__element-order-table-name-${i}` }
          >
            { name }
          </td>
          <td
            className="seller-order-details-table-item-quantity"
            data-testid={ `seller_order_details__element-order-table-quantity-${i}` }
          >
            { SaleProduct.quantity }
          </td>
          <td
            className="seller-order-details-table-item-price"
            data-testid={
              `seller_order_details__element-order-table-unit-price-${i}`
            }
          >
            { `R$ ${conversions.convertPrice(price)}` }
          </td>
          <td
            className="seller-order-details-table-item-subtotal"
            data-testid={
              `seller_order_details__element-order-table-sub-total-${i}`
            }
          >
            { `R$ ${conversions.convertPrice(SaleProduct.quantity * price)}` }
          </td>
        </tr>
      );
    });
    return tableElement;
  };
  return (
    <section className="seller-order-details-table">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>{fillTableDescription()}</tbody>
      </table>
      <h3 data-testid="seller_order_details__element-order-total-price">
        { `Total: R$ ${conversions.convertPrice(totalCart)}` }
      </h3>
    </section>
  );
}

TableSellerOrderDetails.propTypes = {
  productsArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      SaleProduct: PropTypes.shape({
        quantity: PropTypes.number.isRequired,
      }),
    }),
  ).isRequired,
};

export default TableSellerOrderDetails;
