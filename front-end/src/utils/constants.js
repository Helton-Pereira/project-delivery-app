// const ROUTE_LOGIN = 'common_login';
// const ELEMENT_INPUT = 'input-email';
// const ELEMENT_INPUT = 'input-email';

// // - 1: common_login__input-email
// // - 2: common_login__input-password
// // - 3: common_login__button-login
// // - 4: common_login__button-register
// // - 5: common_login__element-invalid-email [Elemento oculto (Mensagens de erro)]

const roles = ['customer', 'seller', 'administrator'];

const statusColors = {
  Pendente: '#CCB800',
  Preparando: '#66CC00',
  Entregue: '#00CC9B',
};

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;
const ID_PAD_START = 4;

export { roles, statusColors, MIN_PASSWORD_LENGTH, MIN_NAME_LENGTH, ID_PAD_START };
