const { GoogleGenAI } = require('@google/genai')
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const ExplainPrompts = require('../../utlils/prompts')
const { model } = require('mongoose')


const models = ai.models.generateContent({
  model: "gemini-2.0-flash",
})

async function generateContent(prompt) {
  const result = await model.generateContent(prompt)

  return result.response.text()
}

module.exports = generateContent