import LessonService from '../Services/LessonService.js';

export const createLesson = async (req, res) => {
    try {
        const lesson = await LessonService.createLesson(req.body);
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllLessons = async (req, res) => {
    const { courseId } = req.query;
    try {
        const lessons = await LessonService.getAllLessons(courseId);
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons: ' + error.message });
    }
};

export const getLessonById = async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await LessonService.getLessonById(id);
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedLesson = await LessonService.updateLesson(id, req.body);
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLesson = await LessonService.deleteLesson(id);
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
