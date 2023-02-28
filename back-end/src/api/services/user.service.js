const md5 = require('md5');
const { User } = require('../../database/models');
const { generateToken } = require('../utils/token');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { status: 404, message: 'Invalid email' };
  }

  const hashPassword = md5(password);

  const token = generateToken(email);

  const { name, role } = user.dataValues;

  if (hashPassword === user.dataValues.password) {
    return { status: 200, token, name, role };
  }
  return { status: 404, message: 'Invalid password' };
};

module.exports = { login };