import { gemini } from '../config/gemini';
import Evaluation, { IEvaluation } from '../models/evaluationModel';

interface EvaluationResult {
    score: number;
    issues_found: string[];
    improved_prompt: string;
}

export const evaluatePrompt = async (promptText: string): Promise<EvaluationResult> => {
    try {
        const systemPrompt = `
      You are an expert AI Prompt Evaluator.
      Your task is to evaluate the quality, safety, and effectiveness of the given prompt.
      
      PROMPT TO EVALUATE:
      "${promptText}"
      
      Evaluate based on:
      1. Clarity and Intent
      2. Structural Coherence
      3. Missing Constraints
      4. Hallucination Risk
      5. Model Compatibility
      6. Safety Issues
      
      Output strictly in JSON format:
      {
        "score": number (0-10),
        "issues_found": ["string", "string"],
        "improved_prompt": "string (rewritten version addressing issues)"
      }
      
      OUTPUT JSON ONLY. NO MARKDOWN BLOCK.
    `;

        const result = await gemini.generateContent(systemPrompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const evaluation = JSON.parse(text) as EvaluationResult;
        return evaluation;
    } catch (error: any) {
        console.error('Evaluation Error:', JSON.stringify(error, null, 2));
        throw new Error('Failed to evaluate prompt: ' + error.message);
    }
};

export const saveEvaluation = async (data: Partial<IEvaluation>): Promise<IEvaluation> => {
    const record = new Evaluation(data);
    return await record.save();
};
