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
