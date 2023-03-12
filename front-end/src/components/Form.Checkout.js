import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/requests';
import { FORM_CHECKOUT_INITIAL_STATE } from '../utils/initialStates';

function FormCheckout({ handleSubmitOrder, setNewOrder }) {
  const [orderDetails, setOrderDetails] = useState(FORM_CHECKOUT_INITIAL_STATE);

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const getSellers = async () => {
      const data = await api.requestData('/sellers');
      setSellers(data);
    };
    getSellers();
  }, []);

  const creatSelerSelect = () => {
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
    <form onSubmit={ (event) => handleSubmitOrder(event) } className="checkout-form">

      <section className="checkout-user-info">
        <label htmlFor="seller" className="form-label">
          Pessoa Vendedora Responsável:
          <select
            className="form-select checkout-seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
            value={ orderDetails.seller }
            onChange={ handleChanges }
          >
            { creatSelerSelect() }
          </select>
        </label>

        <label htmlFor="deliveryAddress" className="form-label">
          Endereço:
          <input
            className="form-control checkout-address"
            type="text"
            name="deliveryAddress"
            data-testid="customer_checkout__input-address"
            onChange={ handleChanges }
            value={ orderDetails.deliveryAddress }
            placeholder="Avenida Paulista"
            required
          />
        </label>

        <label htmlFor="deliveryNumber" className="form-label">
          Número:
          <input
            className="form-control checkout-address-number"
            type="number"
            name="deliveryNumber"
            data-testid="customer_checkout__input-address-number"
            onChange={ handleChanges }
            value={ orderDetails.deliveryNumber }
            placeholder="123"
            required
          />
        </label>
      </section>

      <button
        type="submit"
        className="btn btn-primary"
        data-testid="customer_checkout__button-submit-order"
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

FormCheckout.propTypes = {
  handleSubmitOrder: PropTypes.func.isRequired,
  setNewOrder: PropTypes.func.isRequired,
};

export default FormCheckout;
