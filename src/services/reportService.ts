
import api from './api';

export interface InvoiceSummary {
  unpaidCount: number;
  unpaidTotal: number;
  overdueCount: number;
  overdueTotal: number;
  paidCount: number;
  paidTotal: number;
}

export interface MonthlyRevenue {
  year: number;
  month: number;
  total: number;
}

export interface TopDentist {
  dentistId: number;
  firstName: string;
  lastName: string;
  invoiceCount: number;
  totalAmount: number;
}

export interface FinancialReport {
  invoiceSummary: InvoiceSummary;
  monthlyRevenue: MonthlyRevenue[];
  topDentists: TopDentist[];
}

const REPORTS_PATH = '/reports';

const reportService = {
  getFinancialReport: async (months: number = 12): Promise<FinancialReport> => {
    try {
      return await api.get<FinancialReport>(`${REPORTS_PATH}/financial?months=${months}`);
    } catch (error) {
      console.error("Error fetching financial report:", error);
      throw error;
    }
  }
};

export default reportService;
