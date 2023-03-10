import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/requests';
import roles from '../utils/constants';
import isValidEmail from '../utils/validations';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

function FormAdmin({ users, setUsers }) {
  const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    role: roles[0],
  };
  const [newUser, setNewUser] = useState(INITIAL_STATE);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [sucessMessage, setSucessMessage] = useState('');

  const handleSubmitNewUser = async (event) => {
    event.preventDefault();

    try {
      const userCreated = await api.requestLogin('/admin/manage', newUser);
      setErrorMessage('');
      setSucessMessage(`USUÁRIO: ${newUser.name} ADICONADO COM SUCESSO!`);
      setNewUser(INITIAL_STATE);
      setUsers((prev) => ([...prev, userCreated]));
      console.log(users);
    } catch (error) {
      console.log(error);
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
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default FormAdmin;
