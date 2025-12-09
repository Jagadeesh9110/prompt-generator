import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

// Interface for JWT payload
interface JwtPayload {
    userId: string;
}

// @desc    Protect routes - Check if user is authenticated
export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let token;

        // Get token from cookie
        token = req.cookies.jwt;

        if (!token) {
            res.status(401).json({ message: 'Not authorized, no token' });
            return;
        }

        // Verify token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        // Get user from token (exclude password)
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            res.status(401).json({ message: 'Not authorized, user not found' });
            return;
        }

        // Attach user to request object
        req.user = user;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
