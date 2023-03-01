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

const createUser = async ({ name, email, newPassword }) => {
  const userExistsEmail = await User.findOne({ where: { email } });

  const userExistsName = await User.findOne({ where: { name } });

  if (userExistsEmail || userExistsName) {
    return { status: 409, message: 'User already registered' };
  }

  const password = md5(newPassword);

  await User.create({ name, email, password });
  return login(email, newPassword);
};

module.exports = { login, createUser };