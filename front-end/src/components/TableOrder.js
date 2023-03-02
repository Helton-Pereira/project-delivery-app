import React, { useState } from 'react';
// import PropTypes from 'prop-types';

const mockCart = [
  {
    name: 'produto_1',
    price: 12.15,
    quantity: 4,
  },
  {
    name: 'produto_2',
    price: 2.25,
    quantity: 2,
  },
  {
    name: 'produto_3',
    price: 15.17,
    quantity: 2,
  },
];

function Table() {
  const INITIAL_STATE = {
    totalCart: 0,
  };
  const [totalCart, setTotalCart] = useState(INITIAL_STATE);

  handleRemoveButton = (expenseId) => {
    console.log(`REMOVE: ${expenseId}`);
  };

  fillTableDescription = () => {
    // const { products } = this.props;
    const products = mockCart;
    const tableElement = products.map((element, id) => {
      const {
        name,
        price,
        quantity,
      } = element;
      setTotalCart((prevValue) => prevValue + (quantity * price));
      return (
        <tr key={ id }>
          <td data-testid={ `customer_checkout__element-order-table-item-number-${id}` }>
            { (id + 1) }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-name-${id}` }>
            { name }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-quantity-${id}` }>
            { quantity }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-unit-price-${id}` }>
            { price }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-sub-total-${id}` }>
            { quantity * price }
          </td>
          <td>
            <button
              type="button"
              onClick={ () => handleRemoveButton(id) }
              data-testid={ `customer_checkout__element-order-table-remove-${id}` }
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
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>{fillTableDescription()}</tbody>
        <h1>
          Total:
          { totalCart }
        </h1>
      </table>
    </div>
  );
}

// Table.propTypes = {
// };

export default Table;
