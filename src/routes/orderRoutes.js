const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.get('/orders', controller.listOrders);
router.get('/api/orders', controller.listOrders);
router.post('/orders', controller.createOrder);
router.post('/api/orders', controller.createOrder);

module.exports = router;
