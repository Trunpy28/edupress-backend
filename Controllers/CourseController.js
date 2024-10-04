import CourseService from '../Services/CourseService.js';
import { uploadFile } from '../Services/CloudinaryService.js';

export const getCourses = async (req, res) => {
  try {
    const result = await CourseService.getCourses(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await CourseService.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseByUrlSlug = async (req, res) => {
  try {
    const course = await CourseService.getCourseByUrlSlug(req.params.urlSlug);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not logged in' });
    }
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'You are not allowed to create course' });

    const { name, level, category, price, discountPrice, urlSlug, description } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadFile(req.file);
    }
    const newCourse = await CourseService.createCourse({
      name,
      level,
      category,
      price,
      discountPrice,
      urlSlug,
      description,
      image: imageUrl
    });
    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourseMany = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not logged in' });
    }
    if (req?.user?.role !== 'Admin') return res.status(403).json({ message: 'You are not allowed to create courses' });

    const newCourses = await CourseService.createCourses(req.body);
    res.status(201).json(newCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await CourseService.updateCourse(req.params.id, req.body);
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await CourseService.deleteCourse(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalCourses = async (req, res) => {
  try {
    const totalCourses = await CourseService.getTotalCourses();
    res.status(200).json({ totalCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};