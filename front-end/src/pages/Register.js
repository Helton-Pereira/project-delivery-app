import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import DeliveryAppContext from '../context/DeliveryAppContext';
import api from '../services/requests';
import isValidEmail from '../utils/validations';
import { REGISTER_INITIAL_STATE } from '../utils/initialStates';
import { MIN_PASSWORD_LENGTH, MIN_NAME_LENGTH } from '../utils/constants';
import '../styles/register.css';

function Register(props) {
  const [registerData, setRegisterData] = useState(REGISTER_INITIAL_STATE);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser, setCart } = useContext(DeliveryAppContext);

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const { history } = props;

    try {
      const { name, email, role, token } = await api
        .requestLogin('/register', registerData);

      setErrorMessage('');
      setUser({ name, email, role, token });
      setCart([]);

      history.push('/customer/products');
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const verifyRegisterRequest = () => {
      const { name, email, password } = registerData;
      if (isValidEmail(email)
      && password.length >= MIN_PASSWORD_LENGTH
      && name.length >= MIN_NAME_LENGTH) {
        setIsLoginButtonDisabled(false);
      } else {
        setIsLoginButtonDisabled(true);
      }
    };
    verifyRegisterRequest();
  }, [registerData]);

  return (
    <main className="register-main">

      <h1>Cadastro</h1>

      <form onSubmit={ (event) => handleRegister(event) } className="register-form">
        <label htmlFor="name" className="form-label">
          Nome
          <input
            className="form-control"
            id="name"
            type="name"
            name="name"
            value={ registerData.name }
            data-testid="common_register__input-name"
            onChange={ handleChanges }
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email" className="form-label">
          Email
          <input
            className="form-control"
            id="email"
            type="email"
            name="email"
            value={ registerData.email }
            data-testid="common_register__input-email"
            onChange={ handleChanges }
            placeholder="user@mail.com"
          />
        </label>

        <label htmlFor="password" className="form-label">
          Senha
          <input
            className="form-control"
            id="password"
            type="password"
            name="password"
            value={ registerData.password }
            data-testid="common_register__input-password"
            onChange={ handleChanges }
            placeholder="***************"
          />
        </label>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={ isLoginButtonDisabled }
          data-testid="common_register__button-register"
        >
          CADASTRAR
        </button>
      </form>

      { errorMessage.length > 0 && (
        <span
          className="error-message"
          data-testid="common_register__element-invalid_register"
        >
          {`Erro: ${errorMessage}`}
        </span>
      ) }

    </main>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Register;
