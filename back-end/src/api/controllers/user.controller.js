const userService = require('../services/user.service');

const getSellers = async (_req, res) => {
  try {
    const sellers = await userService.getSellers();
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
};

const login = async (req, res) => {
  const { email: _email, password } = req.body;

  const {
    id,
    status,
    email,
    name,
    role,
    token,
    message,
  } = await userService.login(_email, password);

  if (status === 200) {
    return res.status(status).json({ id, name, email, role, token });
  }

  return res.status(status).json({ message });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newPassword = password;

  const {
    token,
    message,
    status,
    role,
  } = await userService.createUser({ name, email, newPassword });

  if (status === 200) {
    return res.status(201).json({ token, name, role });
  }

  return res.status(status).json({ message });
};

module.exports = { login, createUser, getSellers };