import { useContext } from 'react';
import DeliveryAppContext from '../context/DeliveryAppContext';
// import orderDatailsMock from '../utils/orderDetailsMock';

function TableOrderDatails() {
  let totalCart = 0;

  const { cart } = useContext(DeliveryAppContext);

  const convertPrice = (price) => price.toFixed(Number(2)).toString().replace(/\./, ',');

  const fillTableDescription = () => {
    // const { products } = this.props;
    const products = cart;
    const tableElement = products.map((element, i) => {
      const {
        name,
        price,
        quantity,
      } = element;
      totalCart += (quantity * price);
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
            { quantity }
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
            { convertPrice(quantity * price) }
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
      <h2 data-testid="customer_checkout__element-order-total-price">
        Total:
        { `${convertPrice(totalCart)}` }
      </h2>
    </div>
  );
}

export default TableOrderDatails;
