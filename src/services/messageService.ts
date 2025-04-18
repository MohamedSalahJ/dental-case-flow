
import api from './api';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  caseId?: string;
  isRead: boolean;
}

export interface Contact {
  id: string;
  name: string;
  role: 'dentist' | 'technician';
  avatar?: string;
  initials?: string;
  online?: boolean;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
}

const messageService = {
  getContacts: async (): Promise<Contact[]> => {
    try {
      const response = await api.get<Contact[]>('/messages/contacts');
      return response;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      
      // Fallback mock data for testing until backend is fully implemented
      return [
        {
          id: "1",
          name: "Dr. Jane Smith",
          role: "dentist",
          initials: "JS",
          online: true,
          lastMessage: "When will the crown be ready?",
          timestamp: "9:30 AM",
          unread: 2
        },
        {
          id: "2",
          name: "Mike Johnson",
          role: "technician",
          initials: "MJ",
          online: false,
          lastMessage: "The implant model is complete",
          timestamp: "Yesterday",
          unread: 0
        },
      ];
    }
  },

  getMessagesByCaseId: async (caseId: string): Promise<Message[]> => {
    try {
      const response = await api.get<Message[]>(`/messages/case/${caseId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching messages for case ${caseId}:`, error);
      
      // Fallback mock data for testing until backend is fully implemented
      return [
        {
          id: "1",
          senderId: "current-user-id",
          receiverId: caseId,
          content: "Hello, I need to discuss the crown for patient #12345",
          timestamp: new Date().toISOString(),
          isRead: true
        },
        {
          id: "2",
          senderId: caseId,
          receiverId: "current-user-id",
          content: "Sure, what specific details do you need?",
          timestamp: new Date().toISOString(),
          isRead: true
        }
      ];
    }
  },

  sendMessage: async (messageData: Omit<Message, 'id' | 'timestamp'>): Promise<Message> => {
    try {
      const response = await api.post<Message>('/messages', messageData);
      return response;
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Mock response for testing
      return {
        id: Math.random().toString(36).substring(2, 9),
        senderId: messageData.senderId,
        receiverId: messageData.receiverId,
        content: messageData.content,
        timestamp: new Date().toISOString(),
        caseId: messageData.caseId,
        isRead: false
      };
    }
  },
};

export default messageService;
