
import api from './api';

// Types for authentication requests and responses
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

const authService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },

  getCurrentUser: (): AuthResponse['user'] | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // This is a simplified approach. In a real app, you'd decode the JWT token
      // or make an API call to fetch the current user info
      const userJson = localStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      return null;
    }
  }
};

export default authService;
