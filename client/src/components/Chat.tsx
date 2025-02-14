import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { ChatMessage } from "@shared/schema";

interface ChatForm {
  message: string;
}

export default function Chat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const form = useForm<ChatForm>();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest('POST', '/api/chat', { message });
      const data = await res.json();
      return data as ChatMessage;
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, data]);
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
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.isAi 
                      ? 'bg-orange-100 text-orange-900' 
                      : 'bg-orange-400 text-white'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-orange-100 p-3 rounded-2xl">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <Input
            {...form.register('message')}
            placeholder="Ask me anything about blockchain..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={chatMutation.isPending}
            className="bg-orange-400 hover:bg-orange-500"
          >
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
