
import axios, { AxiosRequestConfig } from 'axios';
import { toast } from '@/components/ui/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    
    if (error.response) {
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        toast({
          variant: "destructive",
          title: "Session expired",
          description: "Please log in again to continue.",
        });
      } else {
        const errorMessage = error.response.data?.message || 'Something went wrong';
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      }
    } else if (error.request) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Unable to connect to the server. Please check your internet connection.",
      });
    }
    
    return Promise.reject(error);
  }
);

const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    api.get<T>(url, config).then(response => response.data),
  
  post: <T>(url: string, data: any, config?: AxiosRequestConfig) => 
    api.post<T>(url, data, config).then(response => response.data),
  
  put: <T>(url: string, data: any, config?: AxiosRequestConfig) => 
    api.put<T>(url, data, config).then(response => response.data),
  
  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    api.delete<T>(url, config).then(response => response.data),
};

export default apiService;
