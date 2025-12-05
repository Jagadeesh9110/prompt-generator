import { Request, Response } from 'express';
import * as evaluationService from '../services/evaluationService';

export const evaluatePrompt = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Missing required field: prompt' });
        }

        // 1. Evaluate
        const result = await evaluationService.evaluatePrompt(prompt);

        // 2. Save
        const savedRecord = await evaluationService.saveEvaluation({
            prompt,
            score: result.score,
            issuesFound: result.issues_found,
            improvedPrompt: result.improved_prompt
        });

        res.status(200).json({
            success: true,
            data: savedRecord
        });

    } catch (error: any) {
        console.error('Evaluation Controller Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
