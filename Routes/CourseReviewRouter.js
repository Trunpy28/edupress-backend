import express from 'express';
import { createReview, updateReview, getReviewsByCourse, deleteReview } from '../Controllers/CourseReviewController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createReview);
router.put('/update', authMiddleware, updateReview);
router.get('/:courseId/reviews', getReviewsByCourse);
router.delete('/delete', authMiddleware, deleteReview);

export default router;
