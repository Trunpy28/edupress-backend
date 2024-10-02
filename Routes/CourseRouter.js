import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  createCourseMany,
  getCourseByUrlSlug
} from '../Controllers/CourseController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/get-courses', getCourses);
router.get('/detail/:id', getCourseById);
router.get('/detail/url/:urlSlug', getCourseByUrlSlug);
router.post('/create', authMiddleware, createCourse);
router.post('/create-many', authMiddleware, createCourseMany);
router.put('/update/:id', authMiddleware, updateCourse);
router.delete('/delete/:id', authMiddleware, deleteCourse);

export default router;
