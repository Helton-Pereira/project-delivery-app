import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import DeliveryAppContext from '../context/DeliveryAppContext';

const MIN_PASSWORD_LENGTH = 7;

function Login() {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(INITIAL_STATE);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  // const { userDispatch } = useContext(DeliveryAppContext);

  const isValidEmail = (inputEmail) => String(inputEmail).toLowerCase().match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // const handleLoginClickButton = (event) => {
  //   event.preventDefault();
  //   // const { history } = props;
  //   const { email } = user;
  //   userDispatch({ type: 'LOGIN', payload: email });
  //   // history.push('/meals');
  // };

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
        <form onSubmit={ () => console.log('clicou') } className="login-form">
          <img src="../images/rockGlass.svg" alt="logo_app" />
          <h1 className="hero-title">
            {'<Recipes App />'}
            {' '}
          </h1>
          <input
            type="email"
            name="email"
            value={ user.email }
            data-testid="email-input"
            onChange={ handleChanges }
            className="form-control input-group mb-2"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ handleChanges }
            className="form-control input-group mb-2"
            placeholder="password"
          />
          <button
            type="submit"
            disabled={ isLoginButtonDisabled }
            data-testid="login-submit-btn"
            className="login-button"
          >
            Entrar
          </button>
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

// - 1: common_login__input-email
// - 2: common_login__input-password
// - 3: common_login__button-login
// - 4: common_login__button-register
// - 5: common_login__element-invalid-email [Elemento oculto (Mensagens de erro)]
