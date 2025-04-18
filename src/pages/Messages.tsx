
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare, Loader2 } from "lucide-react";
import MessageThread from "../components/messaging/MessageThread";
import messageService, { Contact, Message } from "@/services/messageService";

const Messages = () => {
  const queryClient = useQueryClient();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: contacts, isLoading: isContactsLoading } = useQuery({
    queryKey: ['messageContacts'],
    queryFn: () => messageService.getContacts(),
  });

  const { data: messages } = useQuery({
    queryKey: ['caseMessages', selectedContact?.id],
    queryFn: () => selectedContact 
      ? messageService.getMessagesByCaseId(selectedContact.id) 
      : Promise.resolve([]),
    enabled: !!selectedContact,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => 
      messageService.sendMessage({
        senderId: 'current-user-id',
        receiverId: selectedContact?.id || '',
        content,
        isRead: false,
        caseId: selectedContact?.id
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caseMessages', selectedContact?.id] });
    }
  });

  const filteredContacts = contacts?.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
            
            {isContactsLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">Loading contacts...</span>
              </div>
            ) : (
              <Tabs defaultValue="recent" className="flex-1 flex flex-col">
                <TabsList className="w-full rounded-none border-b bg-transparent px-4">
                  <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
                  <TabsTrigger value="all" className="flex-1">All Contacts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent" className="flex-1 m-0 overflow-auto">
                  <div className="divide-y">
                    {filteredContacts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No contacts found
                      </div>
                    ) : (
                      filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedContact?.id === contact.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedContact(contact)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={contact.avatar || ""} alt={contact.name} />
                                <AvatarFallback className="bg-secondary text-secondary-foreground">
                                  {contact.initials || contact.name.substring(0, 2).toUpperCase()}
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
                                  {contact.timestamp || ""}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {contact.lastMessage || ""}
                              </p>
                            </div>
                            {contact.unread && contact.unread > 0 && (
                              <Badge className="ml-2 bg-primary">
                                {contact.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))
                    )}
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
            )}
          </div>
          
          <div className="lg:col-span-3 border rounded-lg overflow-hidden flex flex-col bg-card">
            {selectedContact ? (
              <MessageThread
                caseId={selectedContact.id}
                messages={messages || []}
                onSendMessage={(content) => {
                  sendMessageMutation.mutate(content);
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a contact to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
