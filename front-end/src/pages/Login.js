import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import DeliveryAppContext from '../context/DeliveryAppContext';
import { requestLogin, setToken } from '../services/requests';
import isValidEmail from '../utils/validations';

const MIN_PASSWORD_LENGTH = 6;

function Login(props) {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(INITIAL_STATE);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  // const { userDispatch } = useContext(DeliveryAppContext);

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { history } = props;

    try {
      const { token } = await requestLogin('/login', user);
      setToken(token);
      // userDispatch({ type: 'LOGIN', payload: email });
      setErrorMessage('');
      history.push('/customer/products');
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const verifyLoginRequest = () => {
      const { email, password } = user;
      if (isValidEmail(email) && password.length >= MIN_PASSWORD_LENGTH) {
        setIsLoginButtonDisabled(false);
      } else {
        setIsLoginButtonDisabled(true);
      }
    };
    verifyLoginRequest();
  }, [user]);

  return (
    <main>
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
              value={ user.email }
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
              value={ user.password }
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
