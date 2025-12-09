require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        const key = process.env.GEMINI_API_KEY;
        console.log('Key Loaded:', !!key);
        // Mask the key for safety in logs
        console.log('Key Start:', key ? key.substring(0, 4) + '...' : 'N/A');

        if (!key) {
            console.error(' ERROR: GEMINI_API_KEY is missing in .env');
            return;
        }

        const genAI = new GoogleGenerativeAI(key);

        //  Using the valid model we found
        const modelName = "gemini-2.5-flash";
        const model = genAI.getGenerativeModel({ model: modelName });

        console.log(`Attempting generation with ${modelName}...`);

        const result = await model.generateContent("Say 'Hello from the Backend!' if you can hear me.");
        const response = result.response;
        const text = response.text();

        console.log('\n SUCCESS! API Response:');
        console.log('------------------------------------------------');
        console.log(text);
        console.log('------------------------------------------------');

    } catch (error) {
        console.error('\n FAILED. Error Details:');
        console.error(error.message);
    }
}

testGemini();