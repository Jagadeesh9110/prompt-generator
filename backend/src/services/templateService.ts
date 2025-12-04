import Template, { ITemplate } from '../models/templateModel';

// Create
export const createTemplate = async (data: Partial<ITemplate>): Promise<ITemplate> => {
    const template = new Template(data);
    return await template.save();
};

// Get by ID
export const getTemplateById = async (id: string): Promise<ITemplate | null> => {
    return await Template.findById(id);
};

// Get by Category
export const getTemplatesByCategory = async (category: string): Promise<ITemplate[]> => {
    return await Template.find({ category });
};

// Get by Subcase
export const getTemplatesBySubcase = async (category: string, subcase: string): Promise<ITemplate | { fallback: boolean }> => {
    const template = await Template.findOne({ category, subcase });
    if (!template) {
        return { fallback: true };
    }
    return template;
};

// Update
export const updateTemplate = async (id: string, updates: Partial<ITemplate>): Promise<ITemplate | null> => {
    return await Template.findByIdAndUpdate(id, updates, { new: true });
};

// Delete
export const deleteTemplate = async (id: string): Promise<ITemplate | null> => {
    return await Template.findByIdAndDelete(id);
};

// Inject Variables
export const injectVariables = (templateText: string, variables: Record<string, string>): string => {
    let processedText = templateText;
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        processedText = processedText.replace(regex, value);
    }
    return processedText;
};
