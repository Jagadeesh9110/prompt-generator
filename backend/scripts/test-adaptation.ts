import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as templateService from '../src/services/templateService';
import * as promptAdaptationService from '../src/services/promptAdaptationService';

dotenv.config();

const test = async () => {
    try {
        console.log('Testing Prompt Adaptation Service...');

        // Connect to DB
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/prompt-generator';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Create a Template
        const template = await templateService.createTemplate({
            name: 'Adaptation Test Template',
            category: 'Development',
            subcase: 'Debugging',
            templateText: 'Fix the bug in this code:\n<context>{{user_context}}</context>\nError: {{error_message}}',
            syntaxProfile: 'generic',
            variables: ['user_context', 'error_message']
        });
        console.log('Created Template:', template.name);

        // 2. Build Base Prompt
        const userContext = 'function add(a, b) { return a - b; }';
        const variables = {
            user_context: userContext,
            error_message: 'It subtracts instead of adds'
        };

        const { basePrompt } = promptAdaptationService.buildBasePrompt({
            templateText: template.templateText,
            variables,
            userContext,
            category: 'Development',
            subcase: 'Debugging'
        });

        console.log('Base Prompt:\n', basePrompt);

        // 3. Verify <data> wrapping
        if (basePrompt.includes('<data>') && basePrompt.includes('</data>')) {
            console.log('SUCCESS: User context wrapped in <data> tags.');
        } else {
            console.log('WARNING: User context NOT wrapped in <data> tags.');
        }

        // 4. Save Record
        const saved = await promptAdaptationService.saveAdaptedPrompt({
            templateId: (template as any)._id,
            userContext,
            injectedVariables: variables,
            basePrompt
        });
        console.log('Saved Adaptation Record ID:', saved._id);

        // Cleanup
        await templateService.deleteTemplate((template as any)._id);
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error: any) {
        console.error('Test Failed:', error.message);
        await mongoose.disconnect();
    }
};

test();
