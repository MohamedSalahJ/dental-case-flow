
package com.dentalflow.service;

import com.dentalflow.dto.AppointmentDTO;
import com.dentalflow.model.Appointment;
import com.dentalflow.model.Case;
import com.dentalflow.model.Dentist;
import com.dentalflow.model.Patient;
import com.dentalflow.repository.AppointmentRepository;
import com.dentalflow.repository.CaseRepository;
import com.dentalflow.repository.DentistRepository;
import com.dentalflow.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DentistRepository dentistRepository;
    private final CaseRepository caseRepository;
    
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByDentistId(Long dentistId) {
        return appointmentRepository.findByDentistId(dentistId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDate(date).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByDentistAndDate(Long dentistId, LocalDate date) {
        return appointmentRepository.findByDentistIdAndAppointmentDate(dentistId, date).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByDentistAndDateRange(Long dentistId, LocalDate startDate, LocalDate endDate) {
        return appointmentRepository.findByDentistIdAndAppointmentDateBetween(dentistId, startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public AppointmentDTO getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
    }
    
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        Appointment appointment = convertToEntity(appointmentDTO);
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(savedAppointment);
    }
    
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
        
        Appointment appointment = convertToEntity(appointmentDTO);
        appointment.setId(id);
        appointment.setCreatedAt(existingAppointment.getCreatedAt());
        
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(updatedAppointment);
    }
    
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }
    
    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        
        dto.setId(appointment.getId());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        dto.setAppointmentType(appointment.getAppointmentType());
        dto.setNotes(appointment.getNotes());
        dto.setStatus(appointment.getStatus());
        
        if (appointment.getPatient() != null) {
            dto.setPatientId(appointment.getPatient().getId());
            dto.setPatientName(appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName());
        }
        
        if (appointment.getDentist() != null) {
            dto.setDentistId(appointment.getDentist().getId());
            dto.setDentistName(appointment.getDentist().getFirstName() + " " + appointment.getDentist().getLastName());
        }
        
        if (appointment.getRelatedCase() != null) {
            dto.setCaseId(appointment.getRelatedCase().getId());
            dto.setCaseName(appointment.getRelatedCase().getTitle());
        }
        
        if (appointment.getCreatedAt() != null) {
            dto.setCreatedAt(appointment.getCreatedAt().format(DateTimeFormatter.ISO_DATE_TIME));
        }
        
        if (appointment.getUpdatedAt() != null) {
            dto.setUpdatedAt(appointment.getUpdatedAt().format(DateTimeFormatter.ISO_DATE_TIME));
        }
        
        return dto;
    }
    
    private Appointment convertToEntity(AppointmentDTO dto) {
        Appointment entity = new Appointment();
        
        entity.setAppointmentDate(dto.getAppointmentDate());
        entity.setAppointmentTime(dto.getAppointmentTime());
        entity.setAppointmentType(dto.getAppointmentType());
        entity.setNotes(dto.getNotes());
        entity.setStatus(dto.getStatus());
        
        if (dto.getPatientId() != null) {
            Patient patient = patientRepository.findById(dto.getPatientId())
                    .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + dto.getPatientId()));
            entity.setPatient(patient);
        }
        
        if (dto.getDentistId() != null) {
            Dentist dentist = dentistRepository.findById(dto.getDentistId())
                    .orElseThrow(() -> new EntityNotFoundException("Dentist not found with id: " + dto.getDentistId()));
            entity.setDentist(dentist);
        }
        
        if (dto.getCaseId() != null) {
            Case relatedCase = caseRepository.findById(dto.getCaseId())
                    .orElseThrow(() -> new EntityNotFoundException("Case not found with id: " + dto.getCaseId()));
            entity.setRelatedCase(relatedCase);
        }
        
        return entity;
    }
}
