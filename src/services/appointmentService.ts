import axios from 'axios';
import { Appointment } from '../types/appointment';
import { API_BASE_URL } from './api';

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  dentistId: number;
  dentistName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  notes?: string;
  status: string;
  caseId?: number;
  caseName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentCreateRequest {
  patientId: number;
  dentistId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  notes?: string;
  status: string;
  caseId?: number;
}

export const appointmentService = {
  async getAppointments(): Promise<Appointment[]> {
    const response = await axios.get<Appointment[]>(`${API_BASE_URL}/appointments`);
    return response.data;
  },

  async getDentistAppointments(dentistId: string): Promise<Appointment[]> {
    const response = await axios.get<Appointment[]>(`${API_BASE_URL}/appointments/dentist/${dentistId}`);
    return response.data;
  },

  async getPatientAppointments(patientId: string): Promise<Appointment[]> {
    const response = await axios.get<Appointment[]>(`${API_BASE_URL}/appointments/patient/${patientId}`);
    return response.data;
  },

  async getUpcomingAppointments(): Promise<Appointment[]> {
    const response = await axios.get<Appointment[]>(`${API_BASE_URL}/appointments/upcoming`);
    return response.data;
  },

  async getTodayAppointments(): Promise<Appointment[]> {
    const response = await axios.get<Appointment[]>(`${API_BASE_URL}/appointments/today`);
    return response.data;
  },

  async getWeekAppointments(): Promise<Appointment[]> {
    const response = await axios.get<Appointment[]>(`${API_BASE_URL}/appointments/week`);
    return response.data;
  },

  async createAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    const response = await axios.post<Appointment>(`${API_BASE_URL}/appointments`, appointment);
    return response.data;
  },

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
    const response = await axios.put<Appointment>(`${API_BASE_URL}/appointments/${id}`, appointment);
    return response.data;
  },

  async deleteAppointment(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/appointments/${id}`);
  }
};

export default appointmentService;