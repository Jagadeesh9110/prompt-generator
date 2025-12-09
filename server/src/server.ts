import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db';

import promptRoutes from './routes/promptRoutes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', promptRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'active' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
