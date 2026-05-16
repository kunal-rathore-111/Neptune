
if (!process.env.GOOGLE_API_KEY) throw new Error("GOOGLE_API_KEY not found in environment config")

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


if (!process.env.GROQ_API) throw new Error('GROQ_API not found in environment config');

export const groqAPI = process.env.GROQ_API;