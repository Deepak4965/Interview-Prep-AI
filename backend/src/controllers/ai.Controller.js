const { GoogleGenerativeAI } = require("@google/generative-ai");
const ExplainPrompts = require("../../utlils/prompts");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// === Generate Interview Questions ===
async function generateInterviewQuestions(req, res) {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = ExplainPrompts.questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    // ✅ Use supported Gemini model
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean JSON safely
    const cleanedText = text
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch {
      data = [{ question: "AI parsing error", answer: cleanedText }];
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error generating interview questions:", error);
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message || error,
    });
  }
}

// === Generate Concept Explanation ===
async function generateConceptExplanation(req, res) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = ExplainPrompts.conceptExplanation(question);

    // ✅ Use supported Gemini model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanedText = text
      .replace(/^```/i, "")
      .replace(/```$/i, "")
      .trim();

    res.status(200).json({
      title: question,
      explanation: cleanedText,
    });
  } catch (error) {
    console.error("❌ Error generating concept explanation:", error);
    res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message || error,
    });
  }
}

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
