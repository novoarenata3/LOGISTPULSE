const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.get('/health', controller.healthCheck);
router.post('/api/orders', controller.createOrder);
router.get('/api/orders', controller.listOrders);

module.exports = router;
