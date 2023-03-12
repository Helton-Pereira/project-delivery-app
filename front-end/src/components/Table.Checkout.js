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
          <td
            className="checkout-table-item-order"
            data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
          >
            { (i + 1) }
          </td>
          <td
            className="checkout-table-item-name"
            data-testid={ `customer_checkout__element-order-table-name-${i}` }
          >
            { name }
          </td>
          <td
            className="checkout-table-item-quantity"
            data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
          >
            { quantity }
          </td>
          <td
            className="checkout-table-item-price"
            data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
          >
            { `R$ ${conversions.convertPrice(price)}` }
          </td>
          <td
            className="checkout-table-item-subtotal"
            data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
          >
            { `R$ ${conversions.convertPrice(quantity * price)}` }
          </td>
          <td className="checkout-table-item-remove">
            <button
              type="button"
              onClick={ () => handleRemoveButton(id) }
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            >
              Remover
            </button>
          </td>
        </tr>
      );
    });
    return tableElement;
  };

  return (
    <section className="checkout-table">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>{fillTableDescription()}</tbody>
      </table>
      <h3 data-testid="customer_checkout__element-order-total-price">
        { `Total: R$ ${conversions.convertPrice(totalCart)}` }
      </h3>
    </section>
  );
}

export default TableCheckout;
