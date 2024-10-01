import express from 'express';
import { getAllRegistrations, approveRegistration } from '../Controllers/RegisterCourseController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';
const router = express.Router();

router.get('/registrations', getAllRegistrations);
router.put('/registrations/:id', authMiddleware, approveRegistration);

export default router;
