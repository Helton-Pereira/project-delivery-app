import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import browserStorage from 'store';
import DeliveryAppContext from '../context/DeliveryAppContext';
import api from '../services/requests';
import isValidEmail from '../utils/validations';
import redirects from '../utils/redirects';
import { LOGIN_INITIAL_STATE } from '../utils/initialStates';

const MIN_PASSWORD_LENGTH = 6;

function Login(props) {
  const [loginData, setLoginData] = useState(LOGIN_INITIAL_STATE);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser, setCart } = useContext(DeliveryAppContext);

  useEffect(() => {
    const { history } = props;
    const isLogged = browserStorage.get('user');
    if (isLogged) {
      history.push(redirects[isLogged.role]);
      // Como 'user' é limpo SOMENTE durante o LOGOUT, ele continua no local storage se o usuário retornar à tela de login sem querer.
      // Dessa forma, o usuário é redirecionado para a tela de produtos automaticamente.
    }
  }, []);

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { history } = props;

    try {
      const { name, email, role, token } = await api.requestLogin('/login', loginData);

      setErrorMessage('');
      setUser({ name, email, role, token });
      setCart([]);
      api.setToken(token);
      console.log(role);
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleRegisterButton = async (event) => {
    event.preventDefault();
    const { history } = props;
    history.push('/register');
  };

  useEffect(() => {
    const verifyLoginRequest = () => {
      const { email, password } = loginData;
      if (isValidEmail(email) && password.length >= MIN_PASSWORD_LENGTH) {
        setIsLoginButtonDisabled(false);
      } else {
        setIsLoginButtonDisabled(true);
      }
    };
    verifyLoginRequest();
  }, [loginData]);

  return (
    <main>
      {/* <p>zebirita@email.com</p>
      <p>$#zebirita#$</p> */}

      <h1>login</h1>
      <div className="login-container">
        <form onSubmit={ (event) => handleLogin(event) } className="login-form">
          <img src="../images/rockGlass.svg" alt="logo_app" />
          <label htmlFor="email">
            Login
            <input
              id="email"
              type="email"
              name="email"
              value={ loginData.email }
              data-testid="common_login__input-email"
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
              value={ loginData.password }
              data-testid="common_login__input-password"
              onChange={ handleChanges }
              placeholder="password"
            />
          </label>
          <button
            type="submit"
            disabled={ isLoginButtonDisabled }
            data-testid="common_login__button-login"
          >
            Login
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ handleRegisterButton }
          >
            Ainda não tenho conta
          </button>
          { errorMessage.length > 0
          && (
            <span data-testid="common_login__element-invalid-email">{errorMessage}</span>
          ) }
        </form>
      </div>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
