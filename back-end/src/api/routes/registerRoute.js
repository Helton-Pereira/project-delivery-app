const express = require('express');
const userController = require('../controllers/user.controller');
const { validateEmail } = require('../middlewares/validateEmail');
const { validateName } = require('../middlewares/validateName');
const { validatePassword } = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/', validateEmail, validateName, validatePassword, userController.createUser);

module.exports = router;