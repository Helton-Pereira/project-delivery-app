const express = require('express');
const sellerController = require('../controllers/seller.controller');

const router = express.Router();

router.get('/', sellerController.getSalesBySellerId);

module.exports = router;