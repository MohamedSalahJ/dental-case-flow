
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  attachments?: { name: string; url: string; type: string }[];
}

interface MessageThreadProps {
  caseId: string;
  messages: Message[];
}

const MessageThread = ({ caseId, messages }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to an API
      console.log("Sending message:", { caseId, content: newMessage });
      setNewMessage("");
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.isCurrentUser && "justify-end")}
          >
            <div className="flex space-x-2 max-w-[80%]">
              {!message.isCurrentUser && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="" alt={message.sender} />
                  <AvatarFallback className="bg-muted-foreground text-background text-xs">
                    {message.senderInitials}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="space-y-1">
                <div className="flex items-baseline space-x-2">
                  {!message.isCurrentUser && (
                    <span className="font-medium text-sm">{message.sender}</span>
                  )}
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <div
                  className={cn(
                    "py-2 px-3 rounded-lg",
                    message.isCurrentUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-background border rounded-lg"
                      >
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center mr-2">
                          {attachment.type.includes("image") ? (
                            "🖼️"
                          ) : attachment.type.includes("pdf") ? (
                            "📄"
                          ) : (
                            "📎"
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.type}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
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
