const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `
You are MindSpace, a supportive, empathetic AI companion for university students.
You are NOT a medical professional.
If the user expresses self-harm or extreme distress, gently suggest contacting emergency services or campus support.
        `,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    res.json({
      reply:
        response.text ||
        "I'm here with you. Can you tell me more about what's on your mind?",
    });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({
      reply:
        "I'm having a small technical issue, but I'm still here for you.",
    });
  }
});

module.exports = router;
