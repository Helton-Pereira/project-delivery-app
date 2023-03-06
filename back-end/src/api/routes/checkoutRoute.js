const express = require('express');
const saleController = require('../controllers/sale.controller');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, saleController.createSale);

module.exports = router;
