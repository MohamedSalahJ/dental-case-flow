
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare } from "lucide-react";
import MessageThread from "../components/messaging/MessageThread";

const mockContacts = [
  {
    id: "contact-1",
    name: "Dr. Alice Johnson",
    initials: "AJ",
    lastMessage: "Thanks for the update on John's case",
    timestamp: "10:23 AM",
    unread: 2,
    online: true,
  },
  {
    id: "contact-2",
    name: "Dr. Robert Chen",
    initials: "RC",
    lastMessage: "When will the veneer be ready?",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "contact-3",
    name: "Dr. Emily Wilson",
    initials: "EW",
    lastMessage: "I need to reschedule the delivery",
    timestamp: "Yesterday",
    unread: 1,
    online: true,
  },
  {
    id: "contact-4",
    name: "Dr. James Wilson",
    initials: "JW",
    lastMessage: "The implant looks perfect",
    timestamp: "Apr 14",
    unread: 0,
    online: false,
  },
  {
    id: "contact-5",
    name: "Dr. Sarah Brown",
    initials: "SB",
    lastMessage: "Let's discuss the new cases tomorrow",
    timestamp: "Apr 12",
    unread: 0,
    online: false,
  },
];

const mockMessages = [
  {
    id: "msg-1",
    sender: "Dr. Alice Johnson",
    senderInitials: "AJ",
    content: "Hello, I'd like to check on the status of John Smith's crown.",
    timestamp: "Today at 10:23 AM",
    isCurrentUser: false,
  },
  {
    id: "msg-2",
    sender: "Tom Miller",
    senderInitials: "TM",
    content: "Hi Dr. Johnson, we're making good progress. The crown is in the milling stage now.",
    timestamp: "Today at 10:30 AM",
    isCurrentUser: true,
  },
  {
    id: "msg-3",
    sender: "Dr. Alice Johnson",
    senderInitials: "AJ",
    content: "Great! When do you expect it to be ready for delivery?",
    timestamp: "Today at 10:32 AM",
    isCurrentUser: false,
  },
  {
    id: "msg-4",
    sender: "Tom Miller",
    senderInitials: "TM",
    content: "We're on schedule for delivery on April 22nd as planned. I'll send photos once we've completed the glazing.",
    timestamp: "Today at 10:35 AM",
    isCurrentUser: true,
  },
  {
    id: "msg-5",
    sender: "Dr. Alice Johnson",
    senderInitials: "AJ",
    content: "Perfect, thanks for the update!",
    timestamp: "Today at 10:40 AM",
    isCurrentUser: false,
  },
];

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <MainLayout>
      <div className="h-[calc(100vh-9rem)]">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          <div className="lg:col-span-1 border rounded-lg overflow-hidden flex flex-col bg-card">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Tabs defaultValue="recent" className="flex-1 flex flex-col">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="recent" className="flex-1 m-0 overflow-auto">
                <div className="divide-y">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedContact.id === contact.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src="" alt={contact.name} />
                            <AvatarFallback className="bg-secondary text-secondary-foreground">
                              {contact.initials}
                            </AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{contact.name}</p>
                            <p className="text-xs text-muted-foreground flex-shrink-0">
                              {contact.timestamp}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {contact.lastMessage}
                          </p>
                        </div>
                        {contact.unread > 0 && (
                          <Badge className="ml-2 bg-primary">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="all" className="flex-1 m-0">
                <div className="p-8 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    All contacts will appear here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-3 border rounded-lg overflow-hidden flex flex-col bg-card">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="" alt={selectedContact.name} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {selectedContact.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  View Cases
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <MessageThread
                caseId=""
                messages={mockMessages}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
