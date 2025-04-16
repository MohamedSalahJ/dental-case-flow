
package com.dentalflow.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
    private Long id;
    
    private String invoiceNumber;
    
    @NotBlank(message = "Status is required")
    private String status;
    
    @NotNull(message = "Patient is required")
    private Long patientId;
    
    private String patientName;
    
    @NotNull(message = "Dentist is required")
    private Long dentistId;
    
    private String dentistName;
    
    private Long caseId;
    
    private BigDecimal amount;
    
    private BigDecimal tax;
    
    private BigDecimal total;
    
    private String notes;
    
    @NotNull(message = "Issue date is required")
    private LocalDate issueDate;
    
    @NotNull(message = "Due date is required")
    private LocalDate dueDate;
    
    private LocalDate paidDate;
    
    @NotEmpty(message = "At least one item is required")
    @Valid
    private List<InvoiceItemDTO> items;
    
    private String createdAt;
    private String updatedAt;
}
