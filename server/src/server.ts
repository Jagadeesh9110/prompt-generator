import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // <--- IMPORT THIS
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import promptRoutes from './routes/promptRoutes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

// 1. CORS MUST ALLOW CREDENTIALS (Cookies)
app.use(cors({
    origin: 'http://localhost:5173', // Specific Frontend URL required for cookies
    credentials: true
}));

// 2. PARSE JSON & COOKIES
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', promptRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'active' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});