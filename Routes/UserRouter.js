import express from 'express';
import { registerUser, loginUser, refreshUserToken, logoutUser } from '../Controllers/UserController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshUserToken);

export default router;