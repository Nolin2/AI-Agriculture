// C:\Users\Admin\backend\ai_service.js

const axios = require("axios");

// 1. FIX: Only load dotenv if the application is NOT in production (i.e., running locally)
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

// Ensure the API Key is read from the environment
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 1. Removed 'export' keyword
const generateAIResponse = async (prompt) => {
    // ⚠️ CRASH WARNING: This code will crash if GEMINI_API_KEY is undefined on startup
    if (!GEMINI_API_KEY) {
        console.error("CRITICAL ERROR: GEMINI_API_KEY is not set in environment variables.");
        return "Error: API Key is missing";
    }

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            {
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    // Note: Using 'Authorization: Bearer <KEY>' is often preferred,
                    // but 'x-goog-api-key' works if that's what the API requires.
                    "x-goog-api-key": GEMINI_API_KEY, 
                },
            }
        );

        // Note: The correct path for the response text is usually response.data.candidates[0].content.parts[0].text
        // Your optional chaining looks correct for safety.
        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    } catch (error) {
        console.error("ERROR:", error.response?.data || error.message);
        return "Error generating response";
    }
};

// --- Add this line to export the function using CommonJS syntax ---
module.exports = {
    generateAIResponse // Export the function we just defined
};
