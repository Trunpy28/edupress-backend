import OrderService from '../services/OrderService.js';
export const createOrder = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const newOrder = await OrderService.createOrder(userId, courseId);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const getOrders = async (req, res) => {
    try {
        const orders = await OrderService.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


