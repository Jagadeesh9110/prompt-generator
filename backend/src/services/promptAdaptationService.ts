import PromptAdaptation, { IPromptAdaptation } from '../models/promptAdaptationModel';
import { injectVariables } from './templateService';

interface BuildBasePromptInput {
    templateText: string;
    variables: Record<string, string>;
    userContext: string;
    category: string;
    subcase: string;
}

interface BuildBasePromptOutput {
    basePrompt: string;
}

// Build Base Prompt
export const buildBasePrompt = (input: BuildBasePromptInput): BuildBasePromptOutput => {
    const { templateText, variables, userContext } = input;

    // 1. Inject Variables into Template
    // We wrap user_context in <data> tags if it exists in variables
    const processedVariables = { ...variables };
    if (processedVariables.user_context) {
        processedVariables.user_context = `<data>\n${processedVariables.user_context}\n</data>`;
    }

    let basePrompt = injectVariables(templateText, processedVariables);

    return { basePrompt };
};

// Save Adapted Prompt
export const saveAdaptedPrompt = async (data: Partial<IPromptAdaptation>): Promise<IPromptAdaptation> => {
    const record = new PromptAdaptation(data);
    return await record.save();
};

// Get Adapted Prompt by ID
export const getAdaptedPromptById = async (id: string): Promise<IPromptAdaptation | null> => {
    return await PromptAdaptation.findById(id);
};
