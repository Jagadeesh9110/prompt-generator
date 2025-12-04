import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_do_not_use_in_production';

export const generateToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
