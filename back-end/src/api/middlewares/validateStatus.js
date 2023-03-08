const validateStatus = (req, res, next) => {
  const { status } = req.body;
  const allStatus = ['Preparando', 'Em Trânsito', 'Entregue'];

  if (!allStatus.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  next();
};

module.exports = { validateStatus };