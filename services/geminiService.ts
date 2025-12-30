import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure API key is set in environment

let client: GoogleGenAI | null = null;

export const getClient = (): GoogleGenAI => {
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const createChatSession = (systemInstruction: string): Chat => {
  const ai = getClient();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
  });
};

export type StreamGenerator = AsyncGenerator<GenerateContentResponse, void, unknown>;
