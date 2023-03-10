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
            data-testid={
              `customer_order_details__element-order-table-item-number-${i}`
            }
          >
            { (i + 1) }
          </td>
          <td data-testid={ `customer_order_details__element-order-table-name-${i}` }>
            { name }
          </td>
          <td data-testid={ `customer_order_details__element-order-table-quantity-${i}` }>
            { SaleProduct.quantity }
          </td>
          <td
            data-testid={
              `customer_order_details__element-order-table-unit-price-${i}`
            }
          >
            { conversions.convertPrice(price) }
          </td>
          <td
            data-testid={
              `customer_order_details__element-order-table-sub-total-${i}`
            }
          >
            { conversions.convertPrice(SaleProduct.quantity * price) }
          </td>
        </tr>
      );
    });
    return tableElement;
  };

  return (
    <div>
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
      <h2 data-testid="customer_order_details__element-order-total-price">
        Total:
        { `${conversions.convertPrice(totalCart)}` }
      </h2>
    </div>
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
