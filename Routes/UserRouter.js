import express from 'express';
import { registerUser, loginUser, loginUserName, refreshUserToken, logoutUser, getUserProfile, updateAvatar, updateUserProfile, getUser, deleteUser, getTotalUsers } from '../Controllers/UserController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/login-user-name', loginUserName);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshUserToken);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/getUser', getUser);
router.put('/updateAvatar', authMiddleware, upload.single('avatarFile'), updateAvatar);
router.put('/update', authMiddleware, updateUserProfile);
router.delete('/delete/:id', deleteUser);
router.get('/total-users', getTotalUsers);

export default router;