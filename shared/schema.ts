import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  isAi: boolean("is_ai").notNull(),
  timestamp: text("timestamp").notNull()
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  message: true,
  isAi: true,
  timestamp: true
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export interface Network {
  name: string;
  chainId: number;
  rpcUrl: string;
}

export const networks: Network[] = [
  {
    name: "Ethereum Mainnet",
    chainId: 1,
    rpcUrl: "https://mainnet.infura.io/v3/your-project-id"
  },
  {
    name: "Polygon",
    chainId: 137,
    rpcUrl: "https://polygon-rpc.com"
  },
  {
    name: "BSC",
    chainId: 56,
    rpcUrl: "https://bsc-dataseed.binance.org"
  }
];
