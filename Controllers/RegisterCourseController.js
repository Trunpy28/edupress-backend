import RegisterCourseService from '../Services/RegisterCourseService.js';

export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await RegisterCourseService.getAllRegistrations();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approveRegistration = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Confirmed', 'Cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const updatedRegistration = await RegisterCourseService.updateRegistrationStatus(id, status);
        res.status(200).json(updatedRegistration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNewRegistrations = async (req, res) => {
    try {
        const newRegistrations = await RegisterCourseService.getNewRegistrations();
        res.status(200).json({ newRegistrations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};