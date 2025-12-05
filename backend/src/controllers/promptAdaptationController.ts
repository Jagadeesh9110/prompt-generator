import { Request, Response } from 'express';
import * as promptAdaptationService from '../services/promptAdaptationService';
import * as templateService from '../services/templateService';

// Build Base Prompt
export const buildBasePrompt = async (req: Request, res: Response) => {
    try {
        const { templateId, variables, category, subcase } = req.body;

        if (!templateId || !variables) {
            return res.status(400).json({ success: false, message: 'Missing required fields: templateId, variables' });
        }

        // 1. Fetch Template
        const template = await templateService.getTemplateById(templateId);
        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }

        // 2. Build Base Prompt
        // We extract user_context from variables for the model record
        const userContext = variables.user_context || '';

        const { basePrompt } = promptAdaptationService.buildBasePrompt({
            templateText: template.templateText,
            variables,
            userContext,
            category: category || template.category,
            subcase: subcase || template.subcase
        });

        // 3. Save Record
        const savedRecord = await promptAdaptationService.saveAdaptedPrompt({
            templateId,
            userContext,
            injectedVariables: variables,
            basePrompt
        });

        res.status(200).json({
            success: true,
            data: {
                basePrompt,
                adaptationId: savedRecord._id
            }
        });

    } catch (error: any) {
        console.error('Adaptation Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Adapted Prompt by ID
export const getAdaptedPrompt = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const prompt = await promptAdaptationService.getAdaptedPromptById(id);

        if (!prompt) {
            return res.status(404).json({ success: false, message: 'Adapted prompt not found' });
        }

        res.status(200).json({ success: true, data: prompt });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
