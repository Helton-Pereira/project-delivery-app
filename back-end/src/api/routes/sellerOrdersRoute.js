const express = require('express');
const sellerOrdersController = require('../controllers/seller.controller');
const orderController = require('../controllers/orders.controller');
const { validateStatus } = require('../middlewares/validateStatus');

const router = express.Router();

router.get('/', sellerOrdersController.getSalesBySellerId);

router.get('/:id', orderController.getSaleDetails);

router.patch('/update/:id', validateStatus, orderController.updateSaleStatus);

module.exports = router;