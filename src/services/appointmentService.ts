
import api from './api';

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

const appointmentService = {
  getAll: async (): Promise<Appointment[]> => {
    try {
      return await api.get<Appointment[]>('/appointments');
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      throw error;
    }
  },

  getByDentistId: async (dentistId: number): Promise<Appointment[]> => {
    try {
      return await api.get<Appointment[]>(`/appointments/dentist/${dentistId}`);
    } catch (error) {
      console.error(`Failed to fetch appointments for dentist ${dentistId}:`, error);
      throw error;
    }
  },

  getByPatientId: async (patientId: number): Promise<Appointment[]> => {
    try {
      return await api.get<Appointment[]>(`/appointments/patient/${patientId}`);
    } catch (error) {
      console.error(`Failed to fetch appointments for patient ${patientId}:`, error);
      throw error;
    }
  },

  getByDate: async (date: string): Promise<Appointment[]> => {
    try {
      return await api.get<Appointment[]>(`/appointments/date/${date}`);
    } catch (error) {
      console.error(`Failed to fetch appointments for date ${date}:`, error);
      throw error;
    }
  },

  getByDentistAndDate: async (dentistId: number, date: string): Promise<Appointment[]> => {
    try {
      return await api.get<Appointment[]>(`/appointments/dentist/${dentistId}/date/${date}`);
    } catch (error) {
      console.error(`Failed to fetch appointments for dentist ${dentistId} on date ${date}:`, error);
      throw error;
    }
  },

  getByDentistAndDateRange: async (dentistId: number, startDate: string, endDate: string): Promise<Appointment[]> => {
    try {
      return await api.get<Appointment[]>(`/appointments/dentist/${dentistId}/date-range?startDate=${startDate}&endDate=${endDate}`);
    } catch (error) {
      console.error(`Failed to fetch appointments for dentist ${dentistId} between ${startDate} and ${endDate}:`, error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Appointment> => {
    try {
      return await api.get<Appointment>(`/appointments/${id}`);
    } catch (error) {
      console.error(`Failed to fetch appointment with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (appointment: AppointmentCreateRequest): Promise<Appointment> => {
    try {
      return await api.post<Appointment>('/appointments', appointment);
    } catch (error) {
      console.error("Failed to create appointment:", error);
      throw error;
    }
  },

  update: async (id: number, appointment: Partial<Appointment>): Promise<Appointment> => {
    try {
      return await api.put<Appointment>(`/appointments/${id}`, appointment);
    } catch (error) {
      console.error(`Failed to update appointment ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/appointments/${id}`);
    } catch (error) {
      console.error(`Failed to delete appointment ${id}:`, error);
      throw error;
    }
  }
};

export default appointmentService;
