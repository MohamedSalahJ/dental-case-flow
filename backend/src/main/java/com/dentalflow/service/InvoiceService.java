
package com.dentalflow.service;

import com.dentalflow.dto.InvoiceDTO;
import com.dentalflow.dto.InvoiceItemDTO;
import com.dentalflow.model.*;
import com.dentalflow.repository.CaseRepository;
import com.dentalflow.repository.DentistRepository;
import com.dentalflow.repository.InvoiceRepository;
import com.dentalflow.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    
    private final InvoiceRepository invoiceRepository;
    private final PatientRepository patientRepository;
    private final DentistRepository dentistRepository;
    private final CaseRepository caseRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public List<InvoiceDTO> getAllInvoices(String status) {
        List<Invoice> invoices;
        if (status != null && !status.isEmpty()) {
            invoices = invoiceRepository.findByStatus(status);
        } else {
            invoices = invoiceRepository.findAll();
        }
        return invoices.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public InvoiceDTO getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Invoice not found with id: " + id));
    }
    
    @Transactional
    public InvoiceDTO createInvoice(InvoiceDTO invoiceDTO) {
        Invoice invoice = convertToEntity(invoiceDTO);
        calculateTotals(invoice, invoiceDTO.getItems());
        Invoice savedInvoice = invoiceRepository.save(invoice);
        return convertToDTO(savedInvoice);
    }
    
    @Transactional
    public InvoiceDTO updateInvoice(Long id, InvoiceDTO invoiceDTO) {
        Invoice existingInvoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Invoice not found with id: " + id));
        
        Invoice invoice = convertToEntity(invoiceDTO);
        invoice.setId(existingInvoice.getId());
        invoice.setInvoiceNumber(existingInvoice.getInvoiceNumber());
        invoice.setCreatedAt(existingInvoice.getCreatedAt());
        
        // Clear existing items and re-add them
        invoice.getItems().clear();
        calculateTotals(invoice, invoiceDTO.getItems());
        
        Invoice updatedInvoice = invoiceRepository.save(invoice);
        return convertToDTO(updatedInvoice);
    }
    
    public InvoiceDTO updateStatus(Long id, String status) {
        Invoice existingInvoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Invoice not found with id: " + id));
        existingInvoice.setStatus(status);
        Invoice updatedInvoice = invoiceRepository.save(existingInvoice);
        return convertToDTO(updatedInvoice);
    }
    
    public void deleteInvoice(Long id) {
        if (!invoiceRepository.existsById(id)) {
            throw new EntityNotFoundException("Invoice not found with id: " + id);
        }
        invoiceRepository.deleteById(id);
    }
    
    private InvoiceDTO convertToDTO(Invoice invoice) {
        InvoiceDTO dto = new InvoiceDTO();
        BeanUtils.copyProperties(invoice, dto);
        
        if (invoice.getPatient() != null) {
            dto.setPatientId(invoice.getPatient().getId());
            dto.setPatientName(invoice.getPatient().getFirstName() + " " + invoice.getPatient().getLastName());
        }
        
        if (invoice.getDentist() != null) {
            dto.setDentistId(invoice.getDentist().getId());
            dto.setDentistName(invoice.getDentist().getFirstName() + " " + invoice.getDentist().getLastName());
        }
        
        if (invoice.getCaseRef() != null) {
            dto.setCaseId(invoice.getCaseRef().getId());
        }
        
        if (invoice.getCreatedAt() != null) {
            dto.setCreatedAt(invoice.getCreatedAt().format(DATE_FORMATTER));
        }
        
        if (invoice.getUpdatedAt() != null) {
            dto.setUpdatedAt(invoice.getUpdatedAt().format(DATE_FORMATTER));
        }
        
        List<InvoiceItemDTO> itemDTOs = invoice.getItems().stream()
                .map(this::convertItemToDTO)
                .collect(Collectors.toList());
        dto.setItems(itemDTOs);
        
        return dto;
    }
    
    private InvoiceItemDTO convertItemToDTO(InvoiceItem item) {
        InvoiceItemDTO dto = new InvoiceItemDTO();
        BeanUtils.copyProperties(item, dto);
        return dto;
    }
    
    private Invoice convertToEntity(InvoiceDTO dto) {
        Invoice entity = new Invoice();
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
        
        if (dto.getCaseId() != null) {
            Case caseEntity = caseRepository.findById(dto.getCaseId())
                    .orElseThrow(() -> new EntityNotFoundException("Case not found with id: " + dto.getCaseId()));
            entity.setCaseRef(caseEntity);
        }
        
        return entity;
    }
    
    private void calculateTotals(Invoice invoice, List<InvoiceItemDTO> itemDTOs) {
        BigDecimal total = BigDecimal.ZERO;
        
        for (InvoiceItemDTO itemDTO : itemDTOs) {
            InvoiceItem item = new InvoiceItem();
            item.setDescription(itemDTO.getDescription());
            item.setQuantity(itemDTO.getQuantity());
            item.setUnitPrice(itemDTO.getUnitPrice());
            item.setAmount(itemDTO.getUnitPrice().multiply(new BigDecimal(itemDTO.getQuantity())));
            item.setInvoice(invoice);
            
            total = total.add(item.getAmount());
            invoice.getItems().add(item);
        }
        
        invoice.setAmount(total);
        if (invoice.getTax() == null) {
            // Default tax calculation (10%)
            invoice.setTax(total.multiply(new BigDecimal("0.1")).setScale(2, java.math.RoundingMode.HALF_UP));
        }
        invoice.setTotal(invoice.getAmount().add(invoice.getTax()));
    }
}
