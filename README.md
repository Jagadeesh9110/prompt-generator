
# AI-Powered Prompt Generator

A simple yet powerful web application that transforms basic ideas into sophisticated, well-structured prompts for Large Language Models (LLMs) using advanced prompt engineering techniques.

*(Optional: Replace this line with a screenshot of your app, like this: `![Screenshot of the Prompt Generator App](https://your-image-url.com/screenshot.png)`)*

---

##  Description

This project is a full-stack application built with a **Node.js** and **Express** back-end and a simple HTML/CSS/JS front-end. It takes a user's simple context or idea and uses the **Google Gemini API** to generate a detailed, high-quality prompt. The core logic is powered by a "meta-prompt" that instructs the AI to act as an expert prompt engineer, following a structured framework (Task, Context, References) to produce creative and effective results.

---

##  Features

-   **Simple & Intuitive UI:** A clean interface for users to input their ideas.
-   **Advanced Prompt Engineering:** Utilizes a sophisticated meta-prompt to generate high-quality, structured prompts.
-   **Creative Expansion:** The AI is instructed to creatively add detail and suggest angles, not just reformat the user's input.
-   **Plain Text Output:** The final prompt is cleaned of any markdown formatting for easy copying and pasting.
-   **Secure API Key Handling:** Uses `dotenv` to keep the Google Gemini API key secure and out of the codebase.

---

## 🛠 Tech Stack

-   **Front-End:** HTML, CSS,  JavaScript
-   **Back-End:** Node.js, Express.js
-   **AI Model:** Google Gemini API (`gemini-1.5-flash-latest`)
-   **Deployment:** Render (or any other Node.js hosting service)

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/prompt-generator-app.git](https://github.com/your-username/prompt-generator-app.git)
    cd prompt-generator-app
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

5.  Open your browser and navigate to `http://localhost:3000`.

---

## Usage

1.  Navigate to the application's URL.
2.  In the text area, type a simple idea or context for the prompt you want to generate (e.g., "a thank you email to my team after a successful project").
3.  Click the "Generate Prompt" button.
4.  The application will display a detailed, well-structured prompt in the results area, ready for you to copy and use with any LLM.
