
package com.dentalflow.service;

import com.dentalflow.dto.CaseDTO;
import com.dentalflow.model.Case;
import com.dentalflow.model.Dentist;
import com.dentalflow.model.Patient;
import com.dentalflow.repository.CaseRepository;
import com.dentalflow.repository.DentistRepository;
import com.dentalflow.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CaseService {
    
    private final CaseRepository caseRepository;
    private final PatientRepository patientRepository;
    private final DentistRepository dentistRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public List<CaseDTO> getAllCases(String status) {
        List<Case> cases;
        if (status != null && !status.isEmpty()) {
            cases = caseRepository.findByStatus(status);
        } else {
            cases = caseRepository.findAll();
        }
        return cases.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CaseDTO getCaseById(Long id) {
        return caseRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Case not found with id: " + id));
    }
    
    public CaseDTO createCase(CaseDTO caseDTO) {
        Case caseEntity = convertToEntity(caseDTO);
        Case savedCase = caseRepository.save(caseEntity);
        return convertToDTO(savedCase);
    }
    
    public CaseDTO updateCase(Long id, CaseDTO caseDTO) {
        Case existingCase = caseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Case not found with id: " + id));
        
        Case caseEntity = convertToEntity(caseDTO);
        caseEntity.setId(id);
        caseEntity.setCaseNumber(existingCase.getCaseNumber());
        caseEntity.setCreatedAt(existingCase.getCreatedAt());
        
        Case updatedCase = caseRepository.save(caseEntity);
        return convertToDTO(updatedCase);
    }
    
    public CaseDTO updateStatus(Long id, String status) {
        Case existingCase = caseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Case not found with id: " + id));
        existingCase.setStatus(status);
        Case updatedCase = caseRepository.save(existingCase);
        return convertToDTO(updatedCase);
    }
    
    public void deleteCase(Long id) {
        if (!caseRepository.existsById(id)) {
            throw new EntityNotFoundException("Case not found with id: " + id);
        }
        caseRepository.deleteById(id);
    }
    
    private CaseDTO convertToDTO(Case caseEntity) {
        CaseDTO dto = new CaseDTO();
        BeanUtils.copyProperties(caseEntity, dto);
        
        if (caseEntity.getPatient() != null) {
            dto.setPatientId(caseEntity.getPatient().getId());
            dto.setPatientName(caseEntity.getPatient().getFirstName() + " " + caseEntity.getPatient().getLastName());
        }
        
        if (caseEntity.getDentist() != null) {
            dto.setDentistId(caseEntity.getDentist().getId());
            dto.setDentistName(caseEntity.getDentist().getFirstName() + " " + caseEntity.getDentist().getLastName());
        }
        
        if (caseEntity.getCreatedAt() != null) {
            dto.setCreatedAt(caseEntity.getCreatedAt().format(DATE_FORMATTER));
        }
        
        if (caseEntity.getUpdatedAt() != null) {
            dto.setUpdatedAt(caseEntity.getUpdatedAt().format(DATE_FORMATTER));
        }
        
        return dto;
    }
    
    private Case convertToEntity(CaseDTO dto) {
        Case entity = new Case();
        BeanUtils.copyProperties(dto, entity);
        
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
        
        return entity;
    }
}
