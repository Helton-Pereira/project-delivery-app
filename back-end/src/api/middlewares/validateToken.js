const { verifyToken } = require('../utils/token');
const { mapError } = require('../utils/errorMap');

const validToken = async (token) => {
  if (!token) {
    return { type: 'TOKEN_NOT_FOUND', message: 'Token not found' };
  }
  const user = await verifyToken(token);
  return user;
};
const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const { type, message } = validToken(authorization);
  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  req.user = message;
  next();
};

module.exports = { validateToken };