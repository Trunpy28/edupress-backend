import RegisterCourseModel from '../Models/RegisterCourseModel.js';

const getAllRegistrations = async () => {
    try {
        return await RegisterCourseModel.find()
            .populate('userId', 'userName')
            .populate('courseId', 'name');
    } catch (error) {
        throw new Error('Error fetching registrations: ' + error.message);
    }
};

const updateRegistrationStatus = async (id, status) => {
    try {
        const registration = await RegisterCourseModel.findById(id);
        if (!registration) throw new Error('Registration not found');

        registration.status = status;
        await registration.save();

        return registration;
    } catch (error) {
        throw new Error('Error updating registration status: ' + error.message);
    }
};

export default { getAllRegistrations, updateRegistrationStatus };
