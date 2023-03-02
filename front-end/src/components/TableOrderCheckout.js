import React from 'react';
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

function FormOrderCheckout() {
  let totalCart = 0;

  const handleRemoveButton = (expenseId) => {
    console.log(`REMOVE: ${expenseId}`);
    // filter para tirar o elemento com o name
  };

  const fillTableDescription = () => {
    // const { products } = this.props;
    const products = mockCart;
    const tableElement = products.map((element, id) => {
      const {
        name,
        price,
        quantity,
      } = element;
      totalCart += (quantity * price);
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
              onClick={ () => handleRemoveButton(name) }
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
      </table>
      <h1 data-testid="customer_checkout__element-order-total-price">
        Total:
        { `${totalCart}` }
      </h1>
    </div>
  );
}

// Table.propTypes = {
// };

export default FormOrderCheckout;
