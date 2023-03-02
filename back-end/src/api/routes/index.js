const express = require('express');
const loginRouter = require('./loginRoute');
const registerRouter = require('./registerRoute');
const productRouter = require('./productRoute');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/register', registerRouter);
routers.use('/customer/products', productRouter);

module.exports = routers;