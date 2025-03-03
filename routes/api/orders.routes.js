import { Router } from 'express';
import OrderManager from '../../services/orderManager.js';

const router = Router();
const orderManager = new OrderManager();

// Create Order (Checkout): POST /api/orders
router.post('/', async (req, res, next) => {
  try {
    const order = await orderManager.create(req.body);
    res.status(201).json({ statusCode: 201, response: order });
  } catch (error) {
    next(error);
  }
});

export default router;
