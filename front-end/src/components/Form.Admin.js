import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/requests';
import isValidEmail from '../utils/validations';
import { MIN_PASSWORD_LENGTH, roles, MIN_NAME_LENGTH } from '../utils/constants';
import { FORM_ADMIN_INITIAL_STATE } from '../utils/initialStates';

function FormAdmin({ setUsers }) {
  const [newUser, setNewUser] = useState({ ...FORM_ADMIN_INITIAL_STATE, role: roles[0] });

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [sucessMessage, setSucessMessage] = useState('');

  const handleSubmitNewUser = async (event) => {
    event.preventDefault();

    try {
      const userCreated = await api.requestLogin('/admin/manage', newUser);
      setErrorMessage('');
      setSucessMessage(`USUÁRIO: ${newUser.name} ADICONADO COM SUCESSO!`);
      setNewUser({ ...FORM_ADMIN_INITIAL_STATE, role: roles[0] });
      setUsers((prev) => ([...prev, userCreated]));
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const creatRolesSelect = () => {
    const option = roles.map((role) => (
      <option key={ role } value={ role }>{role}</option>
    ));
    return (option);
  };

  const handleChanges = ({ target }) => {
    setSucessMessage('');
    const { name, value } = target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const verifyNewUserRequest = () => {
      const { name, email, password } = newUser;
      if (isValidEmail(email)
      && password.length >= MIN_PASSWORD_LENGTH
      && name.length >= MIN_NAME_LENGTH) {
        setIsSubmitButtonDisabled(false);
      } else {
        setIsSubmitButtonDisabled(true);
      }
    };
    verifyNewUserRequest();
  }, [newUser]);

  return (
    <div>
      { errorMessage.length > 0
          && (
            <span data-testid="admin_manage__element-invalid-register">
              {errorMessage}
            </span>
          ) }
      Adicionar novo Usuário:
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
            type="password"
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
            value={ newUser.role }
            onChange={ handleChanges }
          >
            { creatRolesSelect() }
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ isSubmitButtonDisabled }
        >
          CADASTRAR
        </button>
        { sucessMessage.length > 0
          && (
            <span>
              {sucessMessage}
            </span>
          ) }
      </form>
    </div>
  );
}

FormAdmin.propTypes = {
  setUsers: PropTypes.func.isRequired,
};

export default FormAdmin;
