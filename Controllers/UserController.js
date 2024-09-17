import UserService from '../Services/UserService.js';

export const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const user = await UserService.register(userName, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, role } = await UserService.login(email, password);

        // Gửi refresh token qua cookie HttpOnly
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Chỉ gửi qua HTTPS trong môi trường sản xuất
            sameSite: 'Strict',
        });

        if (role === 'Admin') {
            res.status(200).json({ accessToken, role });
        } else {
            res.status(200).json({ accessToken, message: 'User login successful, but no admin access' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logoutUser = (req, res) => {
    try {
        // Xóa cookie refresh token
        res.clearCookie('refresh_token');

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const refreshUserToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token; // Lấy refresh token từ cookie
        const newAccessToken = await UserService.refreshToken(token);
        res.status(200).json(newAccessToken);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
