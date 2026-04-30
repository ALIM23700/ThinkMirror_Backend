const axios = require("axios");
const Thought = require("../model/Thought");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const analyzeThought = async (req, res) => {
  const { thought } = req.body;

  if (!thought || typeof thought !== "string") {
    return res.status(400).json({
      error: "Thought is required and must be a string",
    });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const fallback = {
    type: "unclear",
    counterArguments: [],
    advantages: [],
    riskScore: 0,
    recommendation:
      "Input was unclear or AI response failed. Please try again with a clearer thought.",
  };

  await wait(2000); 

  try {
    let response;
    let retries = 3;

    for (let i = 0; i < retries; i++) {
      try {
        response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: `
You are a strict JSON generator.

RULES:
- Return ONLY valid JSON
- No markdown, no explanation, no extra text
- If input is unclear, still return valid JSON with safe defaults
- NEVER fail

OUTPUT FORMAT:
{
  "type": string,
  "counterArguments": string[],
  "advantages": string[],
  "riskScore": number,
  "recommendation": string
}

VALIDATION:
- riskScore must be between 0 and 10
- arrays must always exist (empty if needed)
- all fields must always exist

USER INPUT:
"${thought}"
                `,
                  },
                ],
              },
            ],
            generationConfig: {
              response_mime_type: "application/json",
            },
          }
        );
        break; 
      } catch (err) {
        if (err.response?.status === 503 && i < retries - 1) {
          await wait(5000);
          continue;
        }
        throw err;
      }
    }

    let text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("🧠 RAW AI RESPONSE:\n", text);

    if (!text) {
      return res.status(200).json({
        success: true,
        data: fallback,
        note: "AI returned empty response",
      });
    }

    text = text.replace(/```json|```/g, "").trim();

    let data = fallback;

    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        data = JSON.parse(match[0]);
      }
    } catch (err) {
      console.warn("JSON parsing failed:", err.message);
    }

    data = {
      type: typeof data.type === "string" ? data.type : "unclear",
      counterArguments: Array.isArray(data.counterArguments)
        ? data.counterArguments
        : [],
      advantages: Array.isArray(data.advantages) ? data.advantages : [],
      riskScore:
        typeof data.riskScore === "number"
          ? Math.max(0, Math.min(10, data.riskScore))
          : 0,
      recommendation:
        typeof data.recommendation === "string"
          ? data.recommendation
          : fallback.recommendation,
    };

    const savedThought = await Thought.create({
      text: thought,
      ...data,
      userId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      data: savedThought,
    });
  } catch (error) {
    console.error("❌ AI REQUEST ERROR:");
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      error: "AI request failed",
      data: fallback,
      details: error.response?.data || error.message,
    });
  }
};

module.exports = { analyzeThought };