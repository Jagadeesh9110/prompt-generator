import dotenv from 'dotenv';
import { classifyIntent } from '../src/services/intentClassifierService';

dotenv.config();

const test = async () => {
    try {
        console.log('Testing Intent Classifier Service...');

        if (!process.env.GEMINI_API_KEY) {
            console.error('ERROR: GEMINI_API_KEY is not set in .env');
            return;
        }

        const text = 'Create a python script to scrape data from a website';
        console.log(`Input: "${text}"`);

        const result = await classifyIntent(text);
        console.log('Result:', JSON.stringify(result, null, 2));

        if (result.category === 'Development' || result.category === 'development') {
            console.log('SUCCESS: Category identified correctly.');
        } else {
            console.log('WARNING: Category might be incorrect.');
        }

    } catch (error: any) {
        console.error('Test Failed Message:', error.message);
        if (error.response) {
            // console.error('API Response Error:', JSON.stringify(error.response, null, 2));
        }
    }
};

test();
