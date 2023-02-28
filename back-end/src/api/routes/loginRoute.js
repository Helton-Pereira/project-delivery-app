const express = require('express');
const userController = require('../controllers/user.controller');
const validateEmail = require('../middlewares/validateEmail');

const router = express.Router();

router.post('/', userController.login);

module.exports = router;