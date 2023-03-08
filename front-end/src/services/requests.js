import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOSTNAME || 'localhost'}:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

const requestNewOrder = async (endpoint, body, token) => {
  setToken(token);
  const { data } = await api.post(endpoint, body);
  return data;
};

const updateOrderStatus = async (endpoint, body) => {
  const { data } = await api.patch(endpoint, body);
  return data;
};

export default {
  api,
  requestLogin,
  setToken,
  requestData,
  requestNewOrder,
  updateOrderStatus,
};
