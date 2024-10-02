import jwt from 'jsonwebtoken';

// Middleware to verify access token
export const authMiddleware = (req, res, next) => {   
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// export const verifyAdmin = (req, res, next) => {
//     const userRole = req.user.role;
//     if (userRole === "Admin") {
//         next();
//     }
//     else {
//         return res.status(403).json({ message: 'You do not have permission to access this resource' });
//     }
// }
