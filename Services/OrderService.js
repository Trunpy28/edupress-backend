import Order from '../models/OrderModel.js';
import Course from '../models/CourseModel.js';

const createOrder = async (userId, courseId) => {
    try {
        const course = await Course.findById(courseId);
        if (!course) throw new Error('Course not found');
        const price = course.price;
        const discount = course.discount || 0;
        const total = price - (price * discount / 100);
        if (total < 0) throw new Error('Invalid total price');

        const newOrder = await Order.create({
            user: userId,
            course: courseId,
            price,
            discount,
            total,
            createdAt: new Date(),
        });
        return newOrder;
    } catch (error) {
        throw new Error('Failed to create order: ' + error.message);
    }
}
const getOrders = async () => {
    try {
        const orders = await Order.find()
            .populate('user', 'userName email')
            .populate('course', 'title price');

        if (!orders) throw new Error('Order not found');
        return orders;
    } catch (error) {
        throw new Error('Failed to get orders: ' + error.message);
    }
}

export default {
    createOrder,
    getOrders
}
