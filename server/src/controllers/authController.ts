import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: "Password must be at least 6 characters" });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User has already registered" });
            return;
        }

        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();

        generateToken(res, newUser._id.toString());

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt,
            message: "User registered successfully"
        });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({
            message: "Server error during registration",
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            res.status(400).json({ message: "Please provide email and password" });
            return;
        }

        // Find user and include password field (it's excluded by default with select: false)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        // Check password
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        // Generate token and set cookie
        generateToken(res, user._id.toString());

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            message: "Login successful"
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            message: "Server error during login",
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Clear the JWT cookie
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0), // Set expiry to past date
        });
        res.status(200).json({ message: "Logout successful" });

    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({
            message: "Server error during logout",
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}