import { Request, Response } from 'express';
import { classifyIntent } from '../services/intentClassifierService';
import Intent from '../models/intentModel';

export const classify = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text input is required' });
        }

        // Call Service
        const classification = await classifyIntent(text);

        // Save to History (Optional but good for tracking)
        const intentRecord = new Intent({
            text,
            category: classification.category,
            subcase: classification.subcase,
            modelType: classification.modelType,
            flags: classification.flags,
            metadata: { confidence: classification.confidence }
        });

        await intentRecord.save();

        return res.status(200).json({
            success: true,
            data: classification
        });

    } catch (error: any) {
        console.error('Controller Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
