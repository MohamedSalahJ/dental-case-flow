
package com.dentalflow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportDTO {
    private InvoiceSummaryDTO invoiceSummary;
    private List<Map<String, Object>> monthlyRevenue;
    private List<Map<String, Object>> topDentists;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InvoiceSummaryDTO {
        private Long unpaidCount;
        private BigDecimal unpaidTotal;
        private Long overdueCount;
        private BigDecimal overdueTotal;
        private Long paidCount;
        private BigDecimal paidTotal;
    }
}
