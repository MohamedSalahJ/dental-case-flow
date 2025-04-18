
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
}

const messageService = {
  getContacts: async (): Promise<Contact[]> => {
    const response = await api.get<Contact[]>('/messages/contacts');
    return response;
  },

  getMessagesByCaseId: async (caseId: string): Promise<Message[]> => {
    const response = await api.get<Message[]>(`/messages/case/${caseId}`);
    return response;
  },

  sendMessage: async (messageData: Omit<Message, 'id' | 'timestamp'>): Promise<Message> => {
    const response = await api.post<Message>('/messages', messageData);
    return response;
  },
};

export default messageService;
