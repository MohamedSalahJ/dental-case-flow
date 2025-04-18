
package com.dentalflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private Long id;
    
    @NotNull(message = "Patient is required")
    private Long patientId;
    
    private String patientName;
    
    @NotNull(message = "Dentist is required")
    private Long dentistId;
    
    private String dentistName;
    
    @NotNull(message = "Appointment date is required")
    private LocalDate appointmentDate;
    
    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;
    
    @NotBlank(message = "Appointment type is required")
    private String appointmentType;
    
    private String notes;
    
    @NotBlank(message = "Status is required")
    private String status;
    
    private Long caseId;
    
    private String caseName;
    
    private String createdAt;
    private String updatedAt;
}
