
package com.dentalflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaseDTO {
    private Long id;
    
    private String caseNumber;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotBlank(message = "Status is required")
    private String status;
    
    private String priority;
    
    @NotNull(message = "Patient is required")
    private Long patientId;
    
    private String patientName;
    
    @NotNull(message = "Dentist is required")
    private Long dentistId;
    
    private String dentistName;
    
    private LocalDate dueDate;
    
    private String createdAt;
    private String updatedAt;
}
