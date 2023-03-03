import React from 'react';
import PropTypes from 'prop-types';

const mockCart = [
  {
    id: 'produto_1',
    price: 12.15,
    quantity: 4,
  },
  {
    id: 'produto_2',
    price: 2.25,
    quantity: 2,
  },
  {
    id: 'produto_3',
    price: 15.17,
    quantity: 2,
  },
];

function TableOrderCheckout({ setNewOrder }) {
  let totalCart = 0;

  const handleRemoveButton = (expensei) => {
    console.log(`REMOVE: ${expensei}`);
    // filter para tirar o elemento com o name
  };

  const updateNewOrderArrays = (productId, quantity) => {
    setNewOrder((prevNewOrderDetails) => ({
      ...prevNewOrderDetails,
      productsId: [...prevNewOrderDetails.productsId, productId],
      quantities: [...prevNewOrderDetails.quantities, quantity],
    }));
  };

  const updateNewOrderTotalPrice = (totalPrice) => {
    setNewOrder((prevNewOrderDetails) => ({
      ...prevNewOrderDetails,
      totalPrice,
    }));
  };

  const fillTableDescription = () => {
    // const { products } = this.props;
    const products = mockCart;
    const tableElement = products.map((element, i) => {
      const {
        id,
        price,
        quantity,
      } = element;
      totalCart += (quantity * price);
      updateNewOrderArrays(id, quantity);
      return (
        <tr key={ i }>
          <td data-testi={ `customer_checkout__element-order-table-item-number-${i}` }>
            { (i + 1) }
          </td>
          <td data-testi={ `customer_checkout__element-order-table-name-${i}` }>
            { id }
          </td>
          <td data-testi={ `customer_checkout__element-order-table-quantity-${i}` }>
            { quantity }
          </td>
          <td data-testi={ `customer_checkout__element-order-table-unit-price-${i}` }>
            { price }
          </td>
          <td data-testi={ `customer_checkout__element-order-table-sub-total-${i}` }>
            { quantity * price }
          </td>
          <td>
            <button
              type="button"
              onClick={ () => handleRemoveButton(id) }
              data-testi={ `customer_checkout__element-order-table-remove-${i}` }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });

    updateNewOrderTotalPrice(totalCart);

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
        { `${totalCart}` }
      </h1>
    </div>
  );
}

TableOrderCheckout.propTypes = {
  setNewOrder: PropTypes.func.isRequired,
};

export default TableOrderCheckout;
