const express = require('express');
const customerOrdersController = require('../controllers/orders.controller');

const router = express.Router();

router.get('/', customerOrdersController.getSalesByUserId);

router.get('/:id', customerOrdersController.getSaleDetails);

module.exports = router;