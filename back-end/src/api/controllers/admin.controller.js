const adminService = require('../services/admin.service');
const { verifyToken } = require('../utils/token');

const createUserByAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  const token = req.headers.authorization;

  const checkToken = verifyToken(token);

  if (checkToken.data.role !== 'administrator') {
    return res.status(400).json({ message: 'User is not an admin' });
  }
  const newPassword = password;

  const {
    message,
    status,
  } = await adminService.createUserByAdmin({ name, email, newPassword, role });

  if (status === 200) {
    return res.status(201).json({ token, name, role });
  }

  return res.status(status).json({ message });
};

module.exports = { createUserByAdmin };