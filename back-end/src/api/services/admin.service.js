const md5 = require('md5');
const { User } = require('../../database/models');
const { generateToken } = require('../utils/token');

const login = async (_email, password) => {
  const user = await User.findOne({ where: { email: _email } });
  if (!user) {
    return { status: 404, message: 'Invalid email' };
  }

  const hashPassword = md5(password);

  const { name, email, role, id } = user.dataValues;

  const token = generateToken({ _email, role });

  if (hashPassword === user.dataValues.password) {
    return { status: 200, id, name, email, role, token };
  }
  return { status: 404, message: 'Invalid password' };
};

const createUserByAdmin = async ({ name, email, newPassword, role }) => {
  const userExistsEmail = await User.findOne({ where: { email } });

  const userExistsName = await User.findOne({ where: { name } });

  if (userExistsEmail || userExistsName) {
    return { status: 409, message: 'User already registered' };
  }

  const password = md5(newPassword);

  await User.create({ name, email, password, role });
  return login(email, newPassword);
};

module.exports = { login, createUserByAdmin };