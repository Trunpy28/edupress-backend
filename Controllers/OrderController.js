import orderService from '../Services/OrderService.js';
const orderController = {
    createOrder: async (req, res) => {
        try {
            const { userId, courseId } = req.body;
            const newOrder = await orderService.createOrder(userId, courseId);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getOrders: async (req, res) => {
        try {
            const orders = await orderService.getOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}

export default orderController;