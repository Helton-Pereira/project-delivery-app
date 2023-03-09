const adminService = require('../services/admin.service');
const { verifyToken } = require('../utils/token');

const createUserByAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  const token = req.headers.authorization;

  const checkToken = await verifyToken(token);

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

const getAllUsers = async (_req, res) => {
  const users = await adminService.getAllUsers();
  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const checkToken = await verifyToken(token);

  if (checkToken.data.role !== 'administrator') {
    return res.status(400).json({ message: 'User is not an admin' });
  }

  const userDeleted = await adminService.deleteUser(id);

  return res.status(204).json(userDeleted);
};

module.exports = { createUserByAdmin, getAllUsers, deleteUser };
