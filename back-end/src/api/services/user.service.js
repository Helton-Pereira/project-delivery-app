const { User } = require('../../database/models');
// import token from '../utils/token';

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { status: 404, message: 'User not found' }
  }
}

module.exports = { login };

