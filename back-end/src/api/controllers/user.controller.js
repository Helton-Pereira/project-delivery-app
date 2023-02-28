const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, message, token, name, role } = await userService.login(email, password);

  if (status === 200) {
    return res.status(status).json({ token, name, role });
  } 
  return res.status(status).json({ message });
};

module.exports = { login };