import express from 'express';
import orderController from '../Controllers/OrderController.js';

const router = express.Router();

router.get('/', orderController.getOrders);

export default router;