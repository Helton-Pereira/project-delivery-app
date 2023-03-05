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
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiemViaXJpdGFAZW1haWwuY29tIiwiaWF0IjoxNjc4MDI5MzAyLCJleHAiOjE2NzgwNzI1MDJ9.jSxy6u8ZrllO5FN8NlCwP2yQftYheCFI_QbY_f7j4Z8',
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
