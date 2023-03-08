const express = require('express');
const customerOrdersController = require('../controllers/orders.controller');
const { validateStatus } = require('../middlewares/validateStatus');

const router = express.Router();

router.get('/', customerOrdersController.getSalesByUserId);

router.get('/:id', customerOrdersController.getSaleDetails);

router.patch('/update/:id', validateStatus, customerOrdersController.updateSaleStatus);

module.exports = router;