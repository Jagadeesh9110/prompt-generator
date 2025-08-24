# AI-Powered Prompt Generator

A simple yet powerful web application that transforms basic ideas into sophisticated, well-structured prompts for Large Language Models (LLMs) using advanced prompt engineering techniques.

---

## 🚀 Live Demo

You can visit and use the live version of the application here:

**[Visit the Prompt Generator](https://prompt-generator.onrender.com)**

*(Note: Replace the URL above with your actual URL from the Render dashboard.)*

---

## ✨ Features

-   **Simple & Intuitive UI:** A clean interface for users to input their ideas.
-   **Advanced Prompt Engineering:** Utilizes a sophisticated meta-prompt to generate high-quality, structured prompts.
-   **Creative Expansion:** The AI is instructed to creatively add detail and suggest angles, not just reformat the user's input.
-   **Plain Text Output:** The final prompt is cleaned of any markdown formatting for easy copying and pasting.
-   **Secure API Key Handling:** Uses `dotenv` to keep the Google Gemini API key secure and out of the codebase.

---

## 🛠️ Tech Stack

-   **Front-End:** HTML, CSS, Vanilla JavaScript
-   **Back-End:** Node.js, Express.js
-   **AI Model:** Google Gemini API (`gemini-1.5-flash-latest`)
-   **Deployment:** Render

---

## Usage

1.  **Visit the live site** at the link provided in the "Live Demo" section.
2.  In the text area, type a simple idea or context for the prompt you want to generate (e.g., "a thank you email to my team after a successful project").
3.  Click the "Generate Prompt" button.
4.  The application will display a detailed, well-structured prompt in the results area, ready for you to copy and use with any LLM.

---

## ⚙️ Local Setup and Installation (For Developers)

If you want to run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Jagadeesh9110/prompt-generator.git](https://github.com/Jagadeesh9110/prompt-generator.git)
    cd prompt-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a file named `.env` in the root of the project.
    -   Add your Google Gemini API key to this file:
        ```
        GEMINI_API_KEY=YOUR_API_KEY_HERE
        ```

4.  **Run the server:**
    ```bash
    node server.js
    ```

5.  Open your browser and navigate to `http://localhost:3000`
