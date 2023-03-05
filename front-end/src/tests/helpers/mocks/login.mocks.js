const emailInput = 'common_login__input-email';
const passwordInput = 'common_login__input-password';
const loginButton = 'common_login__button-login';
const registerButton = 'common_login__button-register';
const invalidMessageElement = 'common_login__element-invalid-email';

const validEmail = 'zebirita@email.com';
const validPassword = '$#zebirita#$';

const invalidEmail = 'xxxxxxx';
const invalidPassword = '123';

const loginData = {
  email: validEmail,
  name: 'Cliente Zé Birita',
  role: 'customer',
  token: 'mockedToken',
};

export default {
  emailInput,
  passwordInput,
  loginButton,
  registerButton,
  invalidMessageElement,
  validEmail,
  validPassword,
  invalidEmail,
  invalidPassword,
  loginData,
};
