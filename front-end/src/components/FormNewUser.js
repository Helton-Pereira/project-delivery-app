import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import api from '../services/requests';
import roles from '../utils/constants';

function FormNewUser() {
  const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    role: '',
  };
  const [newUser, setNewUser] = useState(INITIAL_STATE);

  const handleSubmitNewUser = async (event) => {
    event.preventDefault();
    // const data = await api.requestData('/sellers');
    console.log('Adicona new User: ');
    console.log(newUser);
  };

  const creatRolesSelect = () => {
    // const sellers = await api.requestData('/seller');
    const option = roles.map((role) => (
      <option key={ role } value={ role }>{seller}</option>
    ));
    return option;
  };

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setNewUser((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
    setNewUser((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      Form:
      <form onSubmit={ (event) => handleSubmitNewUser(event) }>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            data-testid="admin_manage__input-name"
            onChange={ handleChanges }
            value={ newUser.name }
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            data-testid="admin_manage__input-email"
            onChange={ handleChanges }
            value={ newUser.email }
            required
          />
        </label>
        <label htmlFor="deliveryAddress">
          Senha
          <input
            type="email"
            name="password"
            data-testid="admin_manage__input-password"
            onChange={ handleChanges }
            value={ newUser.password }
            required
          />
        </label>
        <label htmlFor="role">
          P. Vendedora Responsável:
          <select
            name="role"
            data-testid="admin_manage__select-role"
            value={ orderDetails.seller }
            onChange={ handleChanges }
          >
            { creatRolesSelect() }
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}

// FormNewUser.propTypes = {
//   handleSubmitOrder: PropTypes.func.isRequired,
//   setNewOrder: PropTypes.func.isRequired,
// };

export default FormNewUser;
