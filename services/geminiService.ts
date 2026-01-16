
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Category, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateAIQuestions = async (
  categories: Category[],
  difficulty: Difficulty,
  count: number
): Promise<Question[]> => {
  const prompt = `Generate ${count} high-quality NCLEX-style critical care nursing exam questions. 
  Categories: ${categories.join(", ")}. 
  Difficulty: ${difficulty}. 
  Ensure questions are clinically accurate and follow standard exam format with 4 options and a detailed rationale.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
              rationale: { type: Type.STRING },
              category: { type: Type.STRING },
              difficulty: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer", "rationale", "category", "difficulty"]
          }
        }
      }
    });

    return JSON.parse(response.text) as Question[];
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};

export const getAIFeedback = async (score: number, total: number, categories: Category[]): Promise<string> => {
  const prompt = `A nursing student scored ${score}/${total} on a critical care exam covering: ${categories.join(", ")}. 
  Provide a professional, encouraging, and detailed summary of their performance. Suggest specific areas for improvement in clinical practice or study.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Keep studying hard! You're making progress.";
  } catch (error) {
    return "Great effort on the exam! Review your rationales to solidify your knowledge.";
  }
};
