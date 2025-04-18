
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "@/services/messageService";

interface MessageThreadProps {
  caseId: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const MessageThread = ({ caseId, messages, onSendMessage }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.senderId === 'current-user-id' && "justify-end")}
          >
            <div className="flex space-x-2 max-w-[80%]">
              {message.senderId !== 'current-user-id' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="" alt="Sender" />
                  <AvatarFallback className="bg-muted-foreground text-background text-xs">
                    {message.senderId.slice(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="space-y-1">
                <div
                  className={cn(
                    "py-2 px-3 rounded-lg",
                    message.senderId === 'current-user-id'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="shrink-0" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
