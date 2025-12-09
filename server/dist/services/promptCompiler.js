"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilePrompt = void 0;
const gemini_1 = __importDefault(require("../config/gemini"));
const compilePrompt = async (userIntent, category) => {
    const prompt = `
    Role: You are a Master Prompt Engineer and Architecture Specialist.
    Task: Rewrite the following user intent into optimized, engineered prompts for multiple LLM architectures.

    User Intent: "${userIntent}"
    Category: "${category}"

    Engineering Rules (Strictly Enforce):
    1. OpenAI o1 / o3:
       - Do not request Chain-of-Thought or "step-by-step".
       - Prefer zero-shot prompting.
       - Instructions must be outcome-driven and compact.
    2. Claude 3.5 / 4.1:
       - Prompts use XML tags: <context>, <instruction>, <example>.
       - Long context segments must precede instructions.
       - Hierarchical segmentation is mandatory.
    3. Gemini 1.5 / 2.0:
       - Use Markdown headers (#, ##).
       - Add grounding cues for factual objectives.
       - Structure content in modular sections.
    4. Llama 3.2:
       - For multimodal tasks, the <|image|> token must appear before text.
       - Provide strong instruction blocks due to weaker system prompt influence.
       - Explicit constraints improve stability.
    5. Perplexity:
       - Define Search Scope, Query Keywords, and Time Window.
       - Avoid generic URL requests to reduce hallucination risk.

    Output Schema (Strict JSON, No Markdown formatting):
    {
      "original_intent": "string",
      "category": "string",
      "prompts": {
        "chatgpt": "string",
        "claude": "string",
        "gemini": "string",
        "llama": "string",
        "perplexity": "string"
      }
    }
    
    IMPORTANT: Return ONLY the raw JSON string. Do not wrap in markdown code blocks.
    Temperature: 0.1
  `;
    try {
        const result = await gemini_1.default.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean response of any potential markdown code blocks
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
    }
    catch (error) {
        console.error('Compiler Error:', error);
        throw new Error('Failed to compile prompt');
    }
};
exports.compilePrompt = compilePrompt;
