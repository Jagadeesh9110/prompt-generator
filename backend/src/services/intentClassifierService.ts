import { geminiFlash } from '../config/gemini';

interface IntentClassification {
    category: string;
    subcase: string;
    modelType: string;
    flags: {
        isJson: boolean;
        isMultimodal: boolean;
        isSearch: boolean;
    };
    confidence: number;
}

export const classifyIntent = async (text: string): Promise<IntentClassification> => {
    try {
        const model = geminiFlash;

        const systemPrompt = `
      You are an advanced Intent Classifier for a Prompt Engineering Platform.
      Analyze the user's input and classify it into the following structure:
      
      Categories: Development, Reasoning, Writing, Business, Documentation, Data/AI, Multimodal, Productivity, Agents, General Purpose.
      
      Output strictly in JSON format:
      {
        "category": "string",
        "subcase": "string (specific task type)",
        "modelType": "reasoning" | "creative" | "structured" | "multimodal" | "search",
        "flags": {
          "isJson": boolean (does user want structured output?),
          "isMultimodal": boolean (does it involve images/video?),
          "isSearch": boolean (does it need live web data?)
        },
        "confidence": number (0-1)
      }
      
      User Input: "${text}"
    `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean up markdown code blocks if present
        const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanJson) as IntentClassification;
    } catch (error) {
        console.error('Error in classifyIntent:', error);
        throw new Error('Failed to classify intent');
    }
};
