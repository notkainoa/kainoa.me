import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ABOUT, EXPERIENCE, PROJECTS, NAME } from '../constants';

// Construct a system prompt based on the static data
const SYSTEM_INSTRUCTION = `
You are a helpful AI assistant representing ${NAME}.
Here is ${NAME}'s background information:
About: ${ABOUT}
Experience: ${JSON.stringify(EXPERIENCE)}
Projects: ${JSON.stringify(PROJECTS)}

Your goal is to answer questions about ${NAME} based on this data.
Keep answers concise, professional, yet conversational (like a portfolio chat).
If you don't know the answer based on the data provided, say "I don't have that information handy, but you can reach out via email!"
`;

export const streamGeminiResponse = async (
  history: { role: string; text: string }[],
  onChunk: (text: string) => void
) => {
  if (!process.env.API_KEY) {
    onChunk("Error: API_KEY is missing. Please set it to chat.");
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const lastMessage = history[history.length - 1].text;
    const result = await chat.sendMessageStream({ message: lastMessage });

    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n(I'm currently taking a nap. Please try again later.)");
  }
};