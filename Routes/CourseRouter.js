import express from 'express';
import multer from 'multer';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  createCourseMany,
  getCourseByUrlSlug,
  getTotalCourses
} from '../Controllers/CourseController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';
import { uploadFile, uploadFromBuffer } from '../Services/CloudinaryService.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/get-courses', getCourses);
router.get('/detail/:id', getCourseById);
router.get('/detail/url/:urlSlug', getCourseByUrlSlug);
router.post('/create', authMiddleware, upload.single('image'), uploadFromBuffer, createCourse);
router.post('/create-many', authMiddleware, createCourseMany);
router.put('/update/:id', authMiddleware, updateCourse);
router.delete('/delete/:id', authMiddleware, deleteCourse);
router.get('/total-courses', getTotalCourses);

export default router;
