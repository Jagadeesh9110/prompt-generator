import { Request, Response } from 'express';
import * as multiModelOptimizerService from '../services/multiModelOptimizerService';

export const runOptimization = async (req: Request, res: Response) => {
    try {
        const { basePrompt, category, subcase } = req.body;

        if (!basePrompt || !category || !subcase) {
            return res.status(400).json({ success: false, message: 'Missing required fields: basePrompt, category, subcase' });
        }

        // 1. Run Optimization
        const optimized = await multiModelOptimizerService.optimizeForAllModels({
            basePrompt,
            category,
            subcase
        });

        // 2. Save Results
        const savedRecord = await multiModelOptimizerService.saveOptimizedPrompts({
            basePrompt,
            category,
            subcase,
            optimized
        });

        res.status(200).json({
            success: true,
            data: savedRecord
        });

    } catch (error: any) {
        console.error('Optimization Controller Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOptimization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const record = await multiModelOptimizerService.getOptimizationById(id);

        if (!record) {
            return res.status(404).json({ success: false, message: 'Optimization record not found' });
        }

        res.status(200).json({ success: true, data: record });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
