import { gemini } from '../config/gemini';
import MultiModelOptimizer, { IMultiModelOptimizer } from '../models/multiModelOptimizerModel';

interface OptimizeInput {
    basePrompt: string;
    category: string;
    subcase: string;
}

interface OptimizedPrompts {
    chatgpt: string;
    claude: string;
    gemini: string;
    llama: string;
    perplexity: string;
    grok_regular: string;
    grok_fun: string;
}

export const optimizeForAllModels = async (input: OptimizeInput): Promise<OptimizedPrompts> => {
    const { basePrompt, category, subcase } = input;

    const systemPrompt = `
    You are an expert Prompt Engineer specializing in multi-model optimization.
    Your task is to rewrite the given BASE PROMPT into 7 distinct versions, each optimized for a specific LLM architecture.
    
    BASE PROMPT:
    "${basePrompt}"
    
    CATEGORY: ${category}
    SUBCASE: ${subcase}
    
    You must output a single valid JSON object with the following keys:
    "chatgpt", "claude", "gemini", "llama", "perplexity", "grok_regular", "grok_fun".
    
    Follow these STRICT optimization rules for each model:
    
    1. **ChatGPT (GPT-4.1 / GPT-5 / o-series)**:
       - No chain-of-thought prompting.
       - Outcome-only instructions.
       - Zero-shot.
       - Strict delimiters.
       - Short, precise structure.
       - If reasoning is needed, assume "reasoning_effort": "medium".
    
    2. **Claude (3.5 / 4.1)**:
       - Rewrite into XML form with <instruction>, <context>, and <output> tags.
       - Use <thinking> tags if complex reasoning is required.
    
    3. **Gemini (1.5 / 2.0)**:
       - Markdown formatted.
       - Clean headers.
       - Clear bullet lists.
       - Multimodal-ready phrasing.
       - Explicit boundaries.
    
    4. **Llama (3.1 / 3.2 Vision)**:
       - JSON-friendly.
       - Avoid system-prompt interfering.
       - No "future reference" tokens.
       - If image needed, insert <|image|> BEFORE the query.
       - No chain-of-thought.
    
    5. **Perplexity pplx-online**:
       - Keyword-dense search directives.
       - Source filters.
       - Time filters.
       - Safety: NEVER ask "give URLs".
    
    6. **Grok 2 (Regular)**:
       - Factual.
       - XML structure preferred.
       - Code formatting strict.
    
    7. **Grok 2 (Fun)**:
       - Allow light humor but keep instructions intact.
       - Engaging tone.
    
    OUTPUT JSON ONLY. NO MARKDOWN BLOCK.
  `;

    try {
        const result = await gemini.generateContent(systemPrompt);
        const response = result.response;
        let text = response.text();

        // Clean up potential markdown code blocks
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const optimized = JSON.parse(text) as OptimizedPrompts;
        return optimized;
    } catch (error: any) {
        console.error('Gemini Optimization Error:', error);
        throw new Error('Failed to optimize prompts: ' + error.message);
    }
};

export const saveOptimizedPrompts = async (data: Partial<IMultiModelOptimizer>): Promise<IMultiModelOptimizer> => {
    const record = new MultiModelOptimizer(data);
    return await record.save();
};

export const getOptimizationById = async (id: string): Promise<IMultiModelOptimizer | null> => {
    return await MultiModelOptimizer.findById(id);
};
