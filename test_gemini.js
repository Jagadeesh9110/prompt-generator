require('dotenv').config({ path: 'server/.env' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        console.log('API Key present:', !!process.env.GEMINI_API_KEY);
        console.log('Key length:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Hello, strict JSON only. { \"key\": \"value\" }";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log('Success:', text);
    } catch (error) {
        console.error('Error Details:', error);
    }
}

testGemini();
