import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as evaluationService from '../src/services/evaluationService';

dotenv.config();

const test = async () => {
    try {
        console.log('Testing Evaluation Service...');

        // Connect to DB
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/prompt-generator';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Define Input
        const prompt = 'Tell me a joke about AI.';
        console.log(`Evaluating Prompt: "${prompt}"`);

        // 2. Run Evaluation
        const result = await evaluationService.evaluatePrompt(prompt);

        console.log('Evaluation Result:');
        console.log(JSON.stringify(result, null, 2));

        // 3. Verify Structure
        if (result.score !== undefined && result.issues_found && result.improved_prompt) {
            console.log('SUCCESS: Evaluation result has correct structure.');
        } else {
            console.log('ERROR: Evaluation result missing fields.');
        }

        // 4. Save Record
        const saved = await evaluationService.saveEvaluation({
            prompt,
            score: result.score,
            issuesFound: result.issues_found,
            improvedPrompt: result.improved_prompt
        });
        console.log('Saved Evaluation Record ID:', saved._id);

        // Cleanup
        await mongoose.connection.collection('evaluations').deleteOne({ _id: saved._id });
        console.log('Cleaned up test record');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error: any) {
        console.error('Test Failed:', error.message);
        await mongoose.disconnect();
    }
};

test();
