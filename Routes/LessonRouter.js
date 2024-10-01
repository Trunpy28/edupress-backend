import express from 'express';
import { createLesson, getAllLessons, getLessonById, updateLesson, deleteLesson } from '../Controllers/LessonController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createLesson);
router.get('/', getAllLessons);
router.get('/:id', getLessonById);
router.put('/:id', authMiddleware, updateLesson);
router.delete('/:id', authMiddleware, deleteLesson);

export default router;
