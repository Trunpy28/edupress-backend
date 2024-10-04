import Lesson from '../Models/LessonModel.js';

const createLesson = async (data) => {
    try {
        const lesson = new Lesson(data);
        await lesson.save();
        return lesson;
    } catch (error) {
        throw new Error('Error creating lesson: ' + error.message);
    }
};

const getAllLessons = async (courseId) => {
    try {
        const filter = courseId ? { courseId } : {};
        return await Lesson.find(filter).populate('courseId');
    } catch (error) {
        throw new Error('Error fetching lessons: ' + error.message);
    }
};

const getLessonById = async (id) => {
    try {
        const lesson = await Lesson.findById(id).populate('courseId');
        if (!lesson) throw new Error('Lesson not found');
        return lesson;
    } catch (error) {
        throw new Error('Error fetching lesson: ' + error.message);
    }
};

const updateLesson = async (id, data) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(id, data, { new: true });
        if (!lesson) throw new Error('Lesson not found');
        return lesson;
    } catch (error) {
        throw new Error('Error updating lesson: ' + error.message);
    }
};

const deleteLesson = async (id) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(id);
        if (!lesson) throw new Error('Lesson not found');
        return lesson;
    } catch (error) {
        throw new Error('Error deleting lesson: ' + error.message);
    }
};

export default {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson
};
