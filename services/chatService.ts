import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

export class ChatService {
  private chat: Chat;
  private client: GoogleGenAI;

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key is missing in process.env");
    }
    
    this.client = new GoogleGenAI({ apiKey: apiKey || '' });
    
    this.chat = this.client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'أنت مساعد ذكي متطور ومفيد يدعى "رفيق". تتحدث اللغة العربية بطلاقة وفصاحة. إجاباتك دقيقة، مختصرة عند الحاجة، ومفصلة عند الطلب. تنسق إجاباتك بشكل جميل وواضح.',
        temperature: 0.7,
      },
    });
  }

  async sendMessageStream(message: string): Promise<AsyncIterable<GenerateContentResponse>> {
    try {
      return await this.chat.sendMessageStream({ message });
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}