import PropTypes from 'prop-types';

function TableCustomerOrderDetails({ productsArray }) {
  let totalCart = 0;

  const convertPrice = (price) => price.toFixed(Number(2)).toString().replace(/\./, ',');

  const fillTableDescription = () => {
    // const { products } = this.props;
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
            { convertPrice(price) }
          </td>
          <td
            data-testid={
              `customer_order_details__element-order-table-sub-total-${i}`
            }
          >
            { convertPrice(SaleProduct.quantity * price) }
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
        { `${convertPrice(totalCart)}` }
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
