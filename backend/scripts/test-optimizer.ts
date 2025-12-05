import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as multiModelOptimizerService from '../src/services/multiModelOptimizerService';

dotenv.config();

const test = async () => {
    try {
        console.log('Testing Multi-Model Optimizer Service...');

        // Connect to DB
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/prompt-generator';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Define Input
        const basePrompt = 'Write a function to calculate the factorial of a number.';
        const category = 'Development';
        const subcase = 'Code Generation';

        console.log('Optimizing for all models...');
        console.log('Base Prompt:', basePrompt);

        // 2. Run Optimization
        const optimized = await multiModelOptimizerService.optimizeForAllModels({
            basePrompt,
            category,
            subcase
        });

        console.log('Optimization Results:');
        console.log(JSON.stringify(optimized, null, 2));

        // 3. Verify Keys
        const requiredKeys = ['chatgpt', 'claude', 'gemini', 'llama', 'perplexity', 'grok_regular', 'grok_fun'];
        const missingKeys = requiredKeys.filter(key => !optimized[key as keyof typeof optimized]);

        if (missingKeys.length === 0) {
            console.log('SUCCESS: All model keys present.');
        } else {
            console.log('ERROR: Missing keys:', missingKeys);
        }

        // 4. Save Record
        const saved = await multiModelOptimizerService.saveOptimizedPrompts({
            basePrompt,
            category,
            subcase,
            optimized
        });
        console.log('Saved Optimization Record ID:', saved._id);

        // Cleanup
        // We don't delete the record here to keep it for manual inspection if needed, 
        // or we can delete it. Let's delete it to keep DB clean.
        await mongoose.connection.collection('multimodeloptimizers').deleteOne({ _id: saved._id });
        console.log('Cleaned up test record');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error: any) {
        console.error('Test Failed:', error.message);
        await mongoose.disconnect();
    }
};

test();
