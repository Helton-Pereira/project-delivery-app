export const LOGIN_INITIAL_STATE = {
  email: '',
  password: '',
};

export const REGISTER_INITIAL_STATE = {
  ...LOGIN_INITIAL_STATE,
  name: '',
};

export const USER_INITIAL_STATE = {
  email: '',
  name: '',
  role: '',
  token: '',
};

export const FORM_ADMIN_INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  role: [],
};
