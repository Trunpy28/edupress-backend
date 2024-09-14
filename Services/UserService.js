import bcrypt from 'bcrypt';
import User from '../Models/User.js';
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from './TokenService.js';

const register = async (userName, email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
        throw new Error('User already exists with this username or email');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            userName,
            email,
            passwordHash: hashedPassword
        });
        await user.save();
        return {
            userName,
            email,
        };
    } catch (error) {
        throw new Error('Registration failed: ' + error.message);
    }
};

const login = async (userName, password) => {
    try {
        const user = await User.findOne({ userName });
        if (!user) throw new Error('User not found');

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) throw new Error('Invalid password');

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

const refreshToken = async (refreshToken) => {
    try {
        const decoded = validateRefreshToken(refreshToken);
        if (!decoded) throw new Error('Invalid refresh token');

        const user = await User.findById(decoded.id);
        if (!user) throw new Error('User not found');

        const newAccessToken = generateAccessToken(user);

        return { accessToken: newAccessToken };
    } catch (error) {
        throw new Error('Token refresh failed: ' + error.message);
    }
};

export default { register, login, refreshToken };