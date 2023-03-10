import { useContext } from 'react';
import DeliveryAppContext from '../context/DeliveryAppContext';
import conversions from '../utils/conversions';

function TableCheckout() {
  let totalCart = 0;

  const { cart, setCart } = useContext(DeliveryAppContext);

  const handleRemoveButton = (id) => {
    const newCart = cart.filter((items) => items.id !== id);
    setCart(newCart);
  };

  const fillTableDescription = () => {
    const products = cart;
    const tableElement = products.map((element, i) => {
      const {
        id,
        name,
        price,
        quantity,
      } = element;
      totalCart += (quantity * price);
      return (
        <tr key={ i }>
          <td data-testid={ `customer_checkout__element-order-table-item-number-${i}` }>
            { (i + 1) }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-name-${i}` }>
            { name }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-quantity-${i}` }>
            { quantity }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }>
            { conversions.convertPrice(price) }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }>
            { conversions.convertPrice(quantity * price) }
          </td>
          <td>
            <button
              type="button"
              onClick={ () => handleRemoveButton(id) }
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            >
              Excluir
            </button>
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
            <th>Quantiade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>{fillTableDescription()}</tbody>
      </table>
      <h1 data-testid="customer_checkout__element-order-total-price">
        Total:
        { `${conversions.convertPrice(totalCart)}` }
      </h1>
    </div>
  );
}

export default TableCheckout;
