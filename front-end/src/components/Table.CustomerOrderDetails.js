import PropTypes from 'prop-types';
import conversions from '../utils/conversions';

function TableCustomerOrderDetails({ productsArray }) {
  let totalCart = 0;

  const fillTableDescription = () => {
    const products = productsArray;
    const tableElement = products.map((product, i) => {
      const {
        name,
        SaleProduct,
      } = product;
      let {
        price,
      } = product;

      price = Number(price, 2);
      totalCart += (SaleProduct.quantity * price);
      return (
        <tr key={ i }>
          <td
            className="customer-order-details-table-item-order"
            data-testid={
              `customer_order_details__element-order-table-item-number-${i}`
            }
          >
            { (i + 1) }
          </td>
          <td
            className="customer-order-details-table-item-name"
            data-testid={ `customer_order_details__element-order-table-name-${i}` }
          >
            { name }
          </td>
          <td
            className="customer-order-details-table-item-quantity"
            data-testid={ `customer_order_details__element-order-table-quantity-${i}` }
          >
            { SaleProduct.quantity }
          </td>
          <td
            className="customer-order-details-table-item-price"
            data-testid={
              `customer_order_details__element-order-table-unit-price-${i}`
            }
          >
            { `R$ ${conversions.convertPrice(price)}` }
          </td>
          <td
            className="customer-order-details-table-item-subtotal"
            data-testid={
              `customer_order_details__element-order-table-sub-total-${i}`
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
    <section className="customer-order-details-table">
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
      <h3 data-testid="customer_order_details__element-order-total-price">
        { `Total: R$ ${conversions.convertPrice(totalCart)}` }
      </h3>
    </section>
  );
}

TableCustomerOrderDetails.propTypes = {
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

export default TableCustomerOrderDetails;
