import { Request, Response } from 'express';
import { compilePrompt } from '../services/promptCompiler';

export const compile = async (req: Request, res: Response) => {
    try {
        const { intent, category } = req.body;

        if (!intent) {
            return res.status(400).json({ error: 'Intent is required' });
        }

        const result = await compilePrompt(intent, category || 'General');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
