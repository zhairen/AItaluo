import { GoogleGenAI } from "@google/genai";
import { TarotCard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTarotReading = async (question: string, cards: TarotCard[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Error: API Key not configured. Please check environment variables.";
  }

  const cardList = cards.map((c, index) => {
    const position = index === 0 ? "Past / Situation" : index === 1 ? "Present / Action" : "Future / Outcome";
    return `- Card ${index + 1} (${position}): ${c.nameCN} (${c.name})`;
  }).join("\n");

  const prompt = `
    Role: You are YiKe (一科), a Modern Tarot Consultant, Psychological Strategist, and Soulmate Advisor. You combine ancient esoteric wisdom with modern psychology (Jungian shadows, cognitive behavioral insights).
    
    User Profile: A seeker looking for clarity, self-awareness, and actionable life strategies.
    
    Task: Provide a professional, deep, and empathetic reading based on the user's question and the cards drawn.
    
    Context:
    User's Question: "${question}"
    
    Cards Drawn:
    ${cardList}
    
    Guidelines:
    1. **Structure**: 
       - **Core Energy**: A brief synthesis of the three cards combined.
       - **Detailed Interpretation**: Analyze each card in its position (Situation, Action, Outcome) specifically relating to the user's question.
       - **Psychological Insight**: Offer a "Soul Reflection" or psychological concept that explains *why* they might be facing this.
       - **Actionable Strategy**: Give 1-2 concrete, practical steps they can take immediately.
    2. **Tone**: Mysterious yet clear, empathetic but objective, sophisticated, and soothing. Avoid fatalism; focus on empowerment and free will.
    3. **Format**: Use Markdown. Use bolding for emphasis. Keep paragraphs short and readable on mobile.
    4. **Language**: Simplified Chinese (zh-CN).
    
    Start the reading directly without pleasantries about being an AI.
  `;

  try {
    // Try the Pro model first for deeper reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });
    return response.text || "无法解读星象，请重试。";
  } catch (error) {
    console.warn("Gemini 3 Pro failed, falling back to Flash...", error);
    try {
      // Fallback to Flash model if Pro fails (often more available/stable)
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });
      return response.text || "无法解读星象，请重试。";
    } catch (fallbackError) {
      console.error("Gemini API Error (Both models failed):", fallbackError);
      return "星象连接受到干扰，请检查网络或稍后再试。 (API Error)";
    }
  }
};