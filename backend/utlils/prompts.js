// utils/prompts.js

const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => {
  return `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, include a short code block.
- Keep formatting very clean.

Return a **pure JSON array** like:

[
  {
    "question": "Question here",
    "answer": "Answer here."
  }
]

Important: Do NOT add any extra text. Only return valid JSON.
`;
};

const conceptExplanation = (question) => {
  return `
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept.
- If the explanation includes a code example, provide a small code block.
- Keep formatting clean and clear.

Return the result as a valid JSON object in the following format:
{
  "title": "Short title here",
  "explanation": "Explanation here."
}

Important: Do NOT add any extra text outside the JSON. Only return valid JSON.
`;
};

module.exports = { questionAnswerPrompt, conceptExplanation };
