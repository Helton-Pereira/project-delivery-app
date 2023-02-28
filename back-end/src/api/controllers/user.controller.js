const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, message } = await userService.login(email, password);

  if (status === 200) {
    return res.status(status);
  } 
  return res.status(status).json({ message });
};

module.exports = { login };