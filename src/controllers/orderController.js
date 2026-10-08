const OrderModel = require('../models/orderModel');

module.exports = {
  listOrders: async (req, res) => {
    try {
      const orders = await OrderModel.getOrders();
      res.status(200).json({ status: 'OK', service: 'LOGISTPULSE', data: orders });
    } catch (err) {
      res.status(500).json({ error: 'Error al listar pedidos', details: err.message });
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
  }
};
