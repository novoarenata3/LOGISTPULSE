const OrderModel = require('../models/orderModel');

module.exports = {
  healthCheck: async (req, res) => {
    try {
      await OrderModel.pool.query('SELECT 1');
      res.status(200).json({ status: 'UP', service: 'LOGISTPULSE-API', database: 'CONNECTED' });
    } catch (err) {
      res.status(500).json({ status: 'DOWN', error: err.message });
    }
  },

  createOrder: async (req, res) => {
    const { trackingCode, destination } = req.body;
    if (!trackingCode || !destination) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: trackingCode, destination' });
    }
    try {
      const order = await OrderModel.createOrder(trackingCode, destination);
      res.status(201).json({
        message: 'Pedido logístico registrado',
        data: order
      });
    } catch (err) {
      res.status(500).json({ error: 'Error al registrar pedido', details: err.message });
    }
  },

  listOrders: async (req, res) => {
    try {
      const orders = await OrderModel.getOrders();
      res.status(200).json({ data: orders });
    } catch (err) {
      res.status(500).json({ error: 'Error al listar pedidos', details: err.message });
    }
  }
};
