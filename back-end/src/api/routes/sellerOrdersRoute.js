const express = require('express');
const sellerOrdersController = require('../controllers/seller.controller');
const orderController = require('../controllers/orders.controller');

const router = express.Router();

router.get('/', sellerOrdersController.getSalesBySellerId);

router.get('/:id', orderController.getSaleDetails);

module.exports = router;