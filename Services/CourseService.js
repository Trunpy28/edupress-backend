import Course from '../Models/CourseModel.js';
import Lesson from '../Models/LessonModel.js';
import RegisterCourseModel from '../Models/RegisterCourseModel.js';
import mongoose from 'mongoose';
import { createSlug } from '../Utils/CourseUtils.js';

const generateUniqueSlug = async (name) => {
  let slug = createSlug(name);
  let slugExists = await Course.findOne({ urlSlug: slug });
  let counter = 1;
  let newSlug = slug;

  while (slugExists) {
    newSlug = `${slug}-${counter}`;
    slugExists = await Course.findOne({ urlSlug: newSlug });
    counter++;
  }

  return newSlug;
};

const getAllCourses = async () => {
  try {
    return await Course.find();
  } catch (error) {
    throw new Error('Error retrieving courses: ' + error.message);
  }
};

const getCourseById = async (id) => {
  try {
    return await Course.findById(id);
  } catch (error) {
    throw new Error('Error retrieving course by id: ' + error.message);
  }
};

const createCourse = async (data) => {
  try {
    const urlSlug = await generateUniqueSlug(data.name);
    const course = new Course({ ...data, urlSlug });
    return await course.save();
  } catch (error) {
    throw new Error('Error creating course: ' + error.message);
  }
};

const updateCourse = async (id, data) => {
  try {
    let urlSlug;
    if (data.name) {
      urlSlug = await generateUniqueSlug(data.name);
    }
    return await Course.findByIdAndUpdate(
      id,
      { ...data, ...(urlSlug ? { urlSlug } : {}) },
      { new: true }
    );
  } catch (error) {
    throw new Error('Error updating course: ' + error.message);
  }
};

const deleteCourse = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await Lesson.deleteMany({ courseId: id }, { session });
    await RegisterCourseModel.deleteMany({ courseId: id }, { session });
    await Course.findByIdAndDelete(id, { session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error('Error deleting course and related data: ' + error.message);
  }
};

const isCourseConfirmed = async (userId, courseId) => {
  const registration = await RegisterCourse.findOne({
    userId,
    courseId,
    status: 'Confirmed',
  });
  return registration !== null;
};

export default {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
