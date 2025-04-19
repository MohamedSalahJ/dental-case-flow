
package com.dentalflow.service;

import com.dentalflow.dto.ReportDTO;
import com.dentalflow.repository.InvoiceRepository;
import com.dentalflow.repository.CaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReportService {
    
    private final InvoiceRepository invoiceRepository;
    private final CaseRepository caseRepository;
    
    public ReportDTO getFinancialReport(int months) {
        ReportDTO report = new ReportDTO();
        
        // Get invoice summary
        Long unpaidCount = invoiceRepository.getCountByStatus("unpaid");
        BigDecimal unpaidTotal = invoiceRepository.getTotalAmountByStatus("unpaid");
        if (unpaidTotal == null) unpaidTotal = BigDecimal.ZERO;
        
        Long overdueCount = (long) invoiceRepository.findOverdueInvoices().size();
        BigDecimal overdueTotal = invoiceRepository.findOverdueInvoices().stream()
                .map(invoice -> invoice.getTotal())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Long paidCount = invoiceRepository.getCountByStatus("paid");
        BigDecimal paidTotal = invoiceRepository.getTotalAmountByStatus("paid");
        if (paidTotal == null) paidTotal = BigDecimal.ZERO;
        
        ReportDTO.InvoiceSummaryDTO summary = new ReportDTO.InvoiceSummaryDTO(
                unpaidCount, unpaidTotal, overdueCount, overdueTotal, paidCount, paidTotal);
        report.setInvoiceSummary(summary);
        
        // Get monthly revenue
        LocalDate startDate = LocalDate.now().minusMonths(months);
        report.setMonthlyRevenue(invoiceRepository.getMonthlyRevenue(startDate));
        
        // Get top dentists
        report.setTopDentists(invoiceRepository.getTopDentistsByInvoiceCount());
        
        return report;
    }
    
    public ReportDTO getCaseReport(int months) {
        // Create a new report DTO
        ReportDTO report = new ReportDTO();
        
        // Get monthly case statistics
        LocalDate startDate = LocalDate.now().minusMonths(months);
        
        // Get top dentists by case count
        report.setTopDentists(invoiceRepository.getTopDentistsByCaseCount());
        
        return report;
    }
    
    public ReportDTO getDentistReport(int months) {
        // Create a new report DTO
        ReportDTO report = new ReportDTO();
        
        // Get dentist performance metrics
        LocalDate startDate = LocalDate.now().minusMonths(months);
        
        // Get top dentists by revenue
        report.setTopDentists(invoiceRepository.getTopDentistsByRevenue(startDate));
        
        return report;
    }
}
