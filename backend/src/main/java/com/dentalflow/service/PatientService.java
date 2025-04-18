
package com.dentalflow.service;

import com.dentalflow.dto.PatientDTO;
import com.dentalflow.model.Dentist;
import com.dentalflow.model.Patient;
import com.dentalflow.repository.DentistRepository;
import com.dentalflow.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {
    
    private final PatientRepository patientRepository;
    private final DentistRepository dentistRepository;
    
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<PatientDTO> getPatientsByDentistId(Long dentistId) {
        return patientRepository.findByDentistId(dentistId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public PatientDTO getPatientById(Long id) {
        return patientRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + id));
    }
    
    public PatientDTO createPatient(PatientDTO patientDTO) {
        Patient patient = convertToEntity(patientDTO);
        Patient savedPatient = patientRepository.save(patient);
        return convertToDTO(savedPatient);
    }
    
    public PatientDTO updatePatient(Long id, PatientDTO patientDTO) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + id));
        
        Patient patient = convertToEntity(patientDTO);
        patient.setId(id);
        patient.setCreatedAt(existingPatient.getCreatedAt());
        
        Patient updatedPatient = patientRepository.save(patient);
        return convertToDTO(updatedPatient);
    }
    
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new EntityNotFoundException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }
    
    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        BeanUtils.copyProperties(patient, dto);
        
        if (patient.getDentist() != null) {
            dto.setDentistId(patient.getDentist().getId());
            dto.setDentistName(patient.getDentist().getFirstName() + " " + patient.getDentist().getLastName());
        }
        
        return dto;
    }
    
    private Patient convertToEntity(PatientDTO dto) {
        Patient entity = new Patient();
        BeanUtils.copyProperties(dto, entity);
        
        if (dto.getDentistId() != null) {
            Dentist dentist = dentistRepository.findById(dto.getDentistId())
                    .orElseThrow(() -> new EntityNotFoundException("Dentist not found with id: " + dto.getDentistId()));
            entity.setDentist(dentist);
        }
        
        return entity;
    }
}
