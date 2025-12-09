import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (
    res: Response,
    userId: string | mongoose.Types.ObjectId
): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
        { userId: userId.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict" as const,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export default generateToken;