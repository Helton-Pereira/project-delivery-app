import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import DeliveryAppContext from '../context/DeliveryAppContext';
import api from '../services/requests';
import isValidEmail from '../utils/validations';
import { REGISTER_INITIAL_STATE } from '../utils/initialStates';
import { MIN_PASSWORD_LENGTH, MIN_NAME_LENGTH } from '../utils/constants';

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
    <main>
      <h1>Cadastro</h1>
      <div className="register-container">
        <form onSubmit={ (event) => handleRegister(event) }>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              type="name"
              name="name"
              value={ registerData.name }
              data-testid="common_register__input-name"
              onChange={ handleChanges }
              placeholder="name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              name="email"
              value={ registerData.email }
              data-testid="common_register__input-email"
              onChange={ handleChanges }
              placeholder="email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              type="password"
              name="password"
              value={ registerData.password }
              data-testid="common_register__input-password"
              onChange={ handleChanges }
              placeholder="password"
            />
          </label>
          <button
            type="submit"
            disabled={ isLoginButtonDisabled }
            data-testid="common_register__button-register"
          >
            Cadastrar
          </button>

          { errorMessage.length > 0
          && (
            <span data-testid="common_register__element-invalid_register">
              {errorMessage}
            </span>
          ) }
        </form>
      </div>
    </main>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Register;
