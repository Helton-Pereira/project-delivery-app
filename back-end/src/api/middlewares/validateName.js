const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 12 || !name) {
    return res.status(400).json({
      message: '"Name" length must be at least 12 characters long' });
  }
  next();
};

module.exports = { validateName };