import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import intentRoutes from './routes/intentClassifierRoutes';
import templateRoutes from './routes/templateRoutes';
import promptAdaptationRoutes from './routes/promptAdaptationRoutes';
import multiModelOptimizerRoutes from './routes/multiModelOptimizerRoutes';
import evaluationRoutes from './routes/evaluationRoutes';

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
app.use('/api/prompt-adaptation', promptAdaptationRoutes);
app.use('/api/multi-model-optimize', multiModelOptimizerRoutes);
app.use('/api/evaluation', evaluationRoutes);

// Basic health check
app.get('/', (req: Request, res: Response) => {
    res.send('Multi-LLM Prompt Intelligence Platform API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
