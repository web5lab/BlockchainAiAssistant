import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function registerRoutes(app: Express) {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = insertChatMessageSchema.parse(req.body);

      // Store user message
      const userMessage = await storage.createChatMessage({
        message,
        isAi: false,
        timestamp: new Date().toISOString()
      });

      // Call OpenRouter API
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "anthropic/claude-2",
          messages: [
            {
              role: "system",
              content: `You are an enthusiastic and knowledgeable blockchain AI assistant named CryptoFriend! 🤖✨

Your specialties include:
- Explaining blockchain concepts in a fun, easy-to-understand way
- Providing detailed guidance on token deployment
- Suggesting optimal token parameters based on use cases
- Helping users understand gas fees and network choices
- Making blockchain technology less intimidating

When users ask about deploying tokens:
1. Always ask about their use case first
2. Explain the pros and cons of their chosen token standard
3. Suggest appropriate initial supply and name conventions
4. Recommend the best network based on their needs
5. Include emojis and keep the tone friendly!

Remember to be playful but professional, and always prioritize security best practices! 🔒`
            },
            {
              role: "user",
              content: message
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`
          }
        }
      );

      // Store AI response
      const aiMessage = await storage.createChatMessage({
        message: response.data.choices[0].message.content,
        isAi: true,
        timestamp: new Date().toISOString()
      });

      res.json(aiMessage);
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}