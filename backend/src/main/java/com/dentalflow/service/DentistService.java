
package com.dentalflow.service;

import com.dentalflow.dto.DentistDTO;
import com.dentalflow.model.Dentist;
import com.dentalflow.repository.DentistRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DentistService {
    
    private final DentistRepository dentistRepository;
    
    public List<DentistDTO> getAllDentists() {
        return dentistRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public DentistDTO getDentistById(Long id) {
        return dentistRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Dentist not found with id: " + id));
    }
    
    public DentistDTO createDentist(DentistDTO dentistDTO) {
        Dentist dentist = convertToEntity(dentistDTO);
        Dentist savedDentist = dentistRepository.save(dentist);
        return convertToDTO(savedDentist);
    }
    
    public DentistDTO updateDentist(Long id, DentistDTO dentistDTO) {
        Dentist existingDentist = dentistRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Dentist not found with id: " + id));
        
        Dentist dentist = convertToEntity(dentistDTO);
        dentist.setId(id);
        dentist.setCreatedAt(existingDentist.getCreatedAt());
        
        Dentist updatedDentist = dentistRepository.save(dentist);
        return convertToDTO(updatedDentist);
    }
    
    public void deleteDentist(Long id) {
        if (!dentistRepository.existsById(id)) {
            throw new EntityNotFoundException("Dentist not found with id: " + id);
        }
        dentistRepository.deleteById(id);
    }
    
    private DentistDTO convertToDTO(Dentist dentist) {
        DentistDTO dto = new DentistDTO();
        BeanUtils.copyProperties(dentist, dto);
        return dto;
    }
    
    private Dentist convertToEntity(DentistDTO dto) {
        Dentist entity = new Dentist();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }
}
