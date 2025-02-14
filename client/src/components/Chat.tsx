import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { ChatMessage } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";

interface ChatForm {
  message: string;
}

export default function Chat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const form = useForm<ChatForm>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest('POST', '/api/chat', { message });
      const data = await res.json();
      return data as ChatMessage;
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, data]);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ChatForm) => {
    if (!data.message.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      message: data.message,
      isAi: false,
      timestamp: new Date().toISOString()
    }]);

    form.reset();
    chatMutation.mutate(data.message);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <ScrollArea className="h-[500px] mb-4 p-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'} mb-4`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-md transition-all ${
                    msg.isAi 
                      ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-900' 
                      : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                  }`}
                >
                  {msg.isAi && (
                    <div className="flex items-center gap-2 mb-2 text-orange-600">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">CryptoFriend</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{msg.message}</div>
                </div>
              </motion.div>
            ))}
            {chatMutation.isPending && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-orange-50 p-4 rounded-2xl shadow-md">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                </div>
              </motion.div>
            )}
            <div ref={scrollRef} />
          </AnimatePresence>
        </ScrollArea>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <Input
            {...form.register('message')}
            placeholder="Ask me about tokens, blockchain, or anything crypto! ✨"
            className="flex-1 border-orange-200 focus:ring-orange-400"
          />
          <Button 
            type="submit" 
            disabled={chatMutation.isPending}
            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
