import React, { useState } from 'react';
import PropTypes from 'prop-types';

const mockSellers = [
  {
    name: 'vendedor_1',
  },
  {
    name: 'vendedor_2',
  },
  {
    name: 'vendedor_3',
  },
];

function FormOrderCheckout({ handleSubmitOrder, setNewOrder }) {
  const INITIAL_STATE = {
    seller: '',
    deliveryAddress: '',
    deliveryNumber: null,
  };

  const [orderDetails, setOrderDetails] = useState(INITIAL_STATE);

  const creatSelerSelect = () => {
    // const sellers = await api.requestData('/seller');
    const option = mockSellers.map((seller) => (
      <option key={ seller.name } value={ seller.name }>{seller.name}</option>
    ));
    return option;
  };

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
    setNewOrder((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
  };

  // const makePostObject = () => {
  //   return ({
  //     name: 'cliente',
  //     seller,

  //   });
  // };

  return (
    <div>
      Form:
      <form onSubmit={ (event) => handleSubmitOrder(event) }>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            name="seller"
            data-testid="customer_checkout__select-seller"
            value={ orderDetails.seller }
            onChange={ handleChanges }
          >
            { creatSelerSelect() }
          </select>
        </label>
        <label htmlFor="deliveryAddress">
          Endereço
          <input
            type="text"
            name="deliveryAddress"
            data-testid="customer_checkout__input-address"
            onChange={ handleChanges }
            value={ orderDetails.deliveryAddress }
          />
        </label>
        <label htmlFor="deliveryNumber">
          Numero
          <input
            type="number"
            name="deliveryNumber"
            data-testid="customer_checkout__input-address-number"
            onChange={ handleChanges }
            value={ orderDetails.deliveryNumber }
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

FormOrderCheckout.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  handleSubmitOrder: PropTypes.func.isRequired,
  setNewOrder: PropTypes.func.isRequired,
};

export default FormOrderCheckout;
