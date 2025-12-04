# Multi-LLM Prompt Intelligence Platform (2025)

## 0. Product Overview
The Anti-Gravity Prompt Intelligence Engine is a compiler that transforms raw human intent into optimized, model-specific prompts for all major LLM architectures.
It uses Gemini API for all internal processing (classification, rewriting, evaluation).

## 1. High-Level Architecture
- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **AI Engine**: Gemini API (Flash / Pro / 2.0)

## 2. Core Modules
1. **Intent Classifier**: Detects category, subcase, complexity.
2. **Template Engine**: Retrieves and adapts templates.
3. **Prompt Adaptation**: Injects variables into a base prompt.
4. **Multi-Model Optimizer**: Rewrites base prompt for ChatGPT, Claude, Gemini, Llama, Perplexity, Grok.
5. **Structured Output Engine**: Generates JSON schemas.
6. **Evaluation Engine**: Scores and improves prompts.

## 3. Model-Specific Optimization Rules
- **OpenAI o1/o3**: No CoT, direct instructions, strict delimiters.
- **Claude 3.5/4.1**: XML-native, <instruction>, <context>, <thinking>.
- **Gemini**: Markdown, structured lists, multimodal-friendly.
- **Llama 3.1/3.2**: <|image|> before text, pythonic tool calling.
- **Perplexity**: Keyword-rich search queries, domain filters.
- **Grok**: Regular (structured) vs Fun (spicy) modes.

## 4. System Flow
User Input -> Intent Classifier -> Template Retrieval -> Base Prompt -> Optimizer -> Evaluation -> Final Output.

## 5. Research Context
(See "The Architecture of Intelligence: A Comprehensive Technical Analysis of Prompt Engineering in 2025" for detailed prompting strategies)
