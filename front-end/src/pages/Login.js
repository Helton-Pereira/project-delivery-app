import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import browserStorage from 'store';
import DeliveryAppContext from '../context/DeliveryAppContext';
import api from '../services/requests';
import isValidEmail from '../utils/validations';
import redirects from '../utils/redirects';
import { LOGIN_INITIAL_STATE } from '../utils/initialStates';
import { MIN_PASSWORD_LENGTH } from '../utils/constants';
import '../styles/login.css';
import logo from '../images/logo.png';

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

      history.push(redirects[role]);
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
    <main className="login-main">

      <section className="app-logo-container">
        <img src={ logo } alt="logo_app" />
        {/* <h1>NOME DO APP</h1> */}
      </section>

      <form onSubmit={ (event) => handleLogin(event) } className="login-form">
        <label htmlFor="email" className="form-label">
          Login
          <input
            className="form-control"
            id="email"
            type="email"
            name="email"
            value={ loginData.email }
            data-testid="common_login__input-email"
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
            value={ loginData.password }
            data-testid="common_login__input-password"
            onChange={ handleChanges }
            placeholder="***************"
          />
        </label>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={ isLoginButtonDisabled }
          data-testid="common_login__button-login"
        >
          LOGIN
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          data-testid="common_login__button-register"
          onClick={ handleRegisterButton }
        >
          Ainda não tenho conta
        </button>
      </form>

      { errorMessage.length > 0 && (
        <span
          className="error-message"
          data-testid="common_login__element-invalid-email"
        >
          {`Erro: ${errorMessage}`}
        </span>
      ) }

    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
