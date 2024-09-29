import express from 'express';
import { createOrder, getOrders } from '../Controllers/OrderController.js';

const router = express.Router();

router.get('/', getOrders);

export default router;