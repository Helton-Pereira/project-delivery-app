import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/requests';

function FormCheckout({ handleSubmitOrder, setNewOrder }) {
  const INITIAL_STATE = {
    seller: '',
    deliveryAddress: '',
    deliveryNumber: '',
  };

  const [orderDetails, setOrderDetails] = useState(INITIAL_STATE);

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const getSellers = async () => {
      const data = await api.requestData('/sellers');
      setSellers(data);
    };
    getSellers();
  }, []);

  const creatSelerSelect = () => {
    // const sellers = await api.requestData('/seller');
    const option = sellers.map((seller) => (
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
            required
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
            required
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

FormCheckout.propTypes = {
  handleSubmitOrder: PropTypes.func.isRequired,
  setNewOrder: PropTypes.func.isRequired,
};

export default FormCheckout;
