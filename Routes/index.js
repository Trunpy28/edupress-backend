import UserRouters from '../Routes/UserRouter.js'
import CourseRouters from '../Routes/CourseRouter.js'
import CourseReviewRouters from '../Routes/CourseReviewRouter.js'

const routes = (app) => {
    app.use('/api/user', UserRouters);
    app.use('/api/course', CourseRouters);
    app.use('/api/course-review', CourseReviewRouters);
}

export default routes;