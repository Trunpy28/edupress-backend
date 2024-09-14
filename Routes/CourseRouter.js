import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../Controllers/CourseController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/list', getAllCourses);
router.get('/detail/:id', getCourseById);
router.post('/create', authMiddleware, createCourse);
router.put('/update/:id', authMiddleware, updateCourse);
router.delete('/delete/:id', authMiddleware, deleteCourse);

export default router;
