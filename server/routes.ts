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
              content: "You are a helpful blockchain AI assistant that helps users understand blockchain concepts and deploy tokens."
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
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
