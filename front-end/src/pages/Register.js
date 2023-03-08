import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import DeliveryAppContext from '../context/DeliveryAppContext';
import api from '../services/requests';
import isValidEmail from '../utils/validations';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

function Register(props) {
  const INITIAL_STATE = {
    name: '',
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

  const handleRegister = async (event) => {
    event.preventDefault();
    const { history } = props;

    try {
      const response = await api.requestLogin('/register', user);
      console.log(response);
      setErrorMessage('');
      //
      history.push('/customer/products');
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const verifyRegisterRequest = () => {
      const { name, email, password } = user;
      if (isValidEmail(email)
      && password.length >= MIN_PASSWORD_LENGTH
      && name.length >= MIN_NAME_LENGTH) {
        setIsLoginButtonDisabled(false);
      } else {
        setIsLoginButtonDisabled(true);
      }
    };
    verifyRegisterRequest();
  }, [user]);

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
              value={ user.name }
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
              value={ user.email }
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
              value={ user.password }
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
