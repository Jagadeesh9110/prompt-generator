import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as templateService from '../src/services/templateService';

dotenv.config();

const test = async () => {
    try {
        console.log('Testing Template Engine Service...');

        // Connect to DB
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/prompt-generator';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Create Template
        const newTemplate = await templateService.createTemplate({
            name: 'Test Template',
            category: 'Development',
            subcase: 'Code Generation',
            templateText: 'Generate a {{language}} script for {{task}}.',
            syntaxProfile: 'generic',
            variables: ['language', 'task']
        });
        console.log('Created Template:', newTemplate.name);

        // 2. Get by ID
        const fetchedTemplate = await templateService.getTemplateById((newTemplate as any)._id);
        console.log('Fetched by ID:', fetchedTemplate?.name);

        // 3. Inject Variables
        if (fetchedTemplate) {
            const injected = templateService.injectVariables(fetchedTemplate.templateText, {
                language: 'Python',
                task: 'web scraping'
            });
            console.log('Injected Text:', injected);

            if (injected === 'Generate a Python script for web scraping.') {
                console.log('SUCCESS: Variable injection working.');
            } else {
                console.log('ERROR: Variable injection failed.');
            }
        }

        // 4. Delete
        await templateService.deleteTemplate((newTemplate as any)._id);
        console.log('Deleted Template');

        // Disconnect
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error: any) {
        console.error('Test Failed:', error.message);
        await mongoose.disconnect();
    }
};

test();
