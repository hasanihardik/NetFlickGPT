import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API)

// Create a function to get the model
const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
}

export default getGeminiModel

