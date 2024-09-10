import OpenAI from "openai";
import { OPAINAI_KEY } from "./constants/constants";

// Make sure that environment variables are used correctly
// If you're using a .env file, ensure that it's properly loaded using dotenv
// Remove the hardcoded API key and rely on environment variables for security

const openai = new OpenAI({
	apiKey: process.env.REACT_APP_OPENAI_KEY || OPAINAI_KEY,  // use REACT_APP_OPENAI_API_KEY or fallback
	dangerouslyAllowBrowser: true,  // Ensure this is needed only if absolutely required
});

export default openai;
