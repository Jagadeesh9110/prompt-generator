import { Request, Response } from 'express';
import * as templateService from '../services/templateService';

// Create
export const createTemplate = async (req: Request, res: Response) => {
    try {
        const template = await templateService.createTemplate(req.body);
        res.status(201).json({ success: true, data: template });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All (Optional, mostly for debugging or admin)
export const getAllTemplates = async (req: Request, res: Response) => {
    try {
        // This could be paginated in a real app
        const templates = await templateService.getTemplatesByCategory(req.query.category as string || ''); // Fallback to empty or handle differently
        // For now, let's just return everything if no category, or filter by category
        // Re-using service method strictly:
        if (req.query.category) {
            const templates = await templateService.getTemplatesByCategory(req.query.category as string);
            return res.status(200).json({ success: true, data: templates });
        }
        // If no category, maybe return empty or implement getAll in service. 
        // For MVP, let's just return 400 if no filter, or implement a generic find.
        // Let's implement a generic find in controller using model directly? NO. Service only.
        // Let's assume for now we only list by category.
        res.status(400).json({ success: false, message: 'Category query parameter required for listing' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get by ID
export const getTemplateById = async (req: Request, res: Response) => {
    try {
        const template = await templateService.getTemplateById(req.params.id);
        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }
        res.status(200).json({ success: true, data: template });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get by Category
export const getTemplatesByCategory = async (req: Request, res: Response) => {
    try {
        const templates = await templateService.getTemplatesByCategory(req.params.category);
        res.status(200).json({ success: true, data: templates });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get by Subcase
export const getTemplateBySubcase = async (req: Request, res: Response) => {
    try {
        const { category, subcase } = req.params;
        const result = await templateService.getTemplatesBySubcase(category, subcase);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update
export const updateTemplate = async (req: Request, res: Response) => {
    try {
        const template = await templateService.updateTemplate(req.params.id, req.body);
        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }
        res.status(200).json({ success: true, data: template });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete
export const deleteTemplate = async (req: Request, res: Response) => {
    try {
        const template = await templateService.deleteTemplate(req.params.id);
        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
