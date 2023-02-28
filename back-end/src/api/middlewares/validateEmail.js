const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!email || !email.match(validEmailRegex)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

module.exports = { validateEmail };