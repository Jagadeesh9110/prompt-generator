const express = require("express");

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static("public"));

let genAI;
let model;

try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
} catch (error) {
  console.error(
    "Error configuring Gemini API. Make sure your API key is set in the .env file.",
    error
  );
  genAI = null;
  model = null;
}

const META_PROMPT_TEMPLATE = `
You are a world-class prompt engineer. Your goal is to transform a user's simple idea into a sophisticated, creative, and highly effective prompt for a large language model.

Core Mission:
Analyze the user's idea and creatively expand upon it. Do not just reformat the user's words; add detail, suggest creative angles, and structure the output according to the "Task, Context, References" framework.

Framework to Follow:

1. Task: Begin with a powerful action verb. Define a compelling Persona for the AI and a precise Format for the output. Be creative with the persona (e.g., instead of "writer," suggest "a cynical but brilliant satirist like Jonathan Swift").
2. Context: Elaborate on the user's context. Add sensory details, define the target audience, specify the tone, and include any constraints or key information that would lead to a better result.
3. References (Optional): If helpful, suggest providing an example to guide the AI. For instance, "Reference the witty and concise style of an Apple product launch announcement." Omit this section if not needed.

Example of a good transformation:
User's Idea: "a blog post about the benefits of remote work"
Your Generated Prompt:
Task:
Act as a seasoned HR consultant and productivity expert. Write a persuasive blog post, formatted with a main title, subheadings for each key benefit, and a concluding summary.

Context:
The target audience is traditional managers who are skeptical of remote work. The tone should be professional, data-driven, yet optimistic. The post must address common concerns like productivity, team culture, and security. It should highlight benefits such as access to a wider talent pool, increased employee satisfaction, and reduced operational costs. The word count should be between 800-1000 words.

References:
For the tone and structure, reference articles from Harvard Business Review.

---

User's Raw Context:
"{user_context}"

---

Final Output Generation:
Now, generate the new prompt based on the user's context above.

CRITICAL FINAL INSTRUCTION: The entire output must be plain text. Absolutely no markdown formatting (no stars, no asterisks, no hash symbols).
`;

app.post("/generate", async (req, res) => {
  if (!model) {
    return res
      .status(500)
      .json({ error: "Gemini API not configured. Check your API key." });
  }

  const { context } = req.body;

  if (!context || context.trim() === "") {
    return res
      .status(400)
      .json({ error: "Please provide some context to generate a prompt." });
  }

  const fullPrompt = META_PROMPT_TEMPLATE.replace("{user_context}", context);

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedPrompt = response.text();

    const cleanedPrompt = generatedPrompt
      .replace(/\*\*([a-zA-Z\s]+):\*\*/g, "$1:")
      .replace(/\*/g, "");

    res.json({ generated_prompt: cleanedPrompt });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res
      .status(500)
      .json({ error: "Failed to generate prompt. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running successfully at http://localhost:${port}`);
});
