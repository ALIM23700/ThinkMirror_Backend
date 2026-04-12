const axios = require("axios");
const Thought = require("../model/Thought");

const analyzeThought = async (req, res) => {
  const { thought } = req.body;

  if (!thought) {
    return res.status(400).json({ error: "Thought is required" });
  }

  try {
    // 🔥 Gemini API Call
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a strict JSON generator.

Return ONLY valid JSON. No markdown. No explanation. No extra text.

Format:
{
  "type": "string",
  "counterArguments": ["string"],
  "advantages": ["string"],
  "riskScore": "number (0-10)",
  "recommendation": "string"
}

Thought: "${thought}"
                `,
              },
            ],
          },
        ],
      }
    );

    // 🔥 Extract AI response safely
    let text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("🧠 RAW AI RESPONSE:\n", text);

    if (!text) {
      return res.status(500).json({
        error: "Empty response from AI",
        debug: response.data,
      });
    }

    // 🔥 Clean markdown if exists
    text = text.replace(/```json|```/g, "").trim();

    // 🔥 Extract JSON block
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      return res.status(500).json({
        error: "No JSON found in AI response",
        raw: text,
      });
    }

    let data;

    try {
      data = JSON.parse(match[0]);
    } catch (err) {
      return res.status(500).json({
        error: "JSON parsing failed",
        raw: match[0],
        message: err.message,
      });
    }

    // 🔥 Save to MongoDB
    const savedThought = await Thought.create({
      text: thought,
      ...data,
    });

    return res.json({
      success: true,
      data: savedThought,
    });

  } catch (error) {
    console.error("❌ FULL ERROR:");

    // 🔥 VERY IMPORTANT DEBUG (REAL REASON WILL SHOW HERE)
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      error: "AI request failed",
      details: error.response?.data || error.message,
    });
  }
};

module.exports = { analyzeThought };