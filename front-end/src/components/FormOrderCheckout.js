import React, { useState } from 'react';
// import PropTypes from 'prop-types';

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

const creatSelerSelect = () => {
  const option = mockSellers.map((seller) => (
    <option key={ seller.name } value={ seller.name }>{seller.name}</option>
  ));
  return option;
};

function TableOrderCheckout() {
  const INITIAL_STATE = {
    seller: '',
    adressCostumer: '',
    numberAdress: 0,
  };

  const [orderDetails, setOrderDetails] = useState(INITIAL_STATE);

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      Form:
      <form>
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
        <label htmlFor="adressCostumer">
          Endereço
          <input
            type="text"
            name="adressCostumer"
            data-testid="customer_checkout__input-address"
            onChange={ handleChanges }
            value={ orderDetails.adressCostumer }
          />
        </label>
        <label htmlFor="numberAdress">
          Numero
          <input
            type="number"
            name="numberAdress"
            data-testid="customer_checkout__input-address-number"
            onChange={ handleChanges }
            value={ orderDetails.numberAdress }
          />
        </label>
      </form>
    </div>
  );
}

// Table.propTypes = {
// };

export default TableOrderCheckout;
