import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import intentRoutes from './routes/intentClassifierRoutes';
import templateRoutes from './routes/templateRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/intent', intentRoutes);
app.use('/api/templates', templateRoutes);

// Basic health check
app.get('/', (req: Request, res: Response) => {
    res.send('Multi-LLM Prompt Intelligence Platform API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
