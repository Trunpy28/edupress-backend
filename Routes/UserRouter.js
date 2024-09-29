import express from 'express';
import { registerUser, loginUser, refreshUserToken, logoutUser, getUser, deleteUser, createAdmin } from '../Controllers/UserController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshUserToken);
router.get('/', getUser);
router.delete('/delete/:id', authMiddleware, deleteUser);
router.post('/createAdmin', createAdmin);

export default router;