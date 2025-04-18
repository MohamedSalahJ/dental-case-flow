
package com.dentalflow.service;

import com.dentalflow.dto.InventoryItemDTO;
import com.dentalflow.model.InventoryCategory;
import com.dentalflow.model.InventoryItem;
import com.dentalflow.model.Supplier;
import com.dentalflow.repository.InventoryCategoryRepository;
import com.dentalflow.repository.InventoryItemRepository;
import com.dentalflow.repository.SupplierRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService {
    
    private final InventoryItemRepository itemRepository;
    private final InventoryCategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    public List<InventoryItemDTO> getAllItems() {
        List<InventoryItem> items = itemRepository.findAll();
        return items.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public InventoryItemDTO getItemById(Long id) {
        return itemRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Inventory item not found with id: " + id));
    }
    
    @Transactional
    public InventoryItemDTO createItem(InventoryItemDTO itemDTO) {
        InventoryItem item = convertToEntity(itemDTO);
        InventoryItem savedItem = itemRepository.save(item);
        return convertToDTO(savedItem);
    }
    
    @Transactional
    public InventoryItemDTO updateItem(Long id, InventoryItemDTO itemDTO) {
        InventoryItem existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory item not found with id: " + id));
        
        InventoryItem updatedItem = convertToEntity(itemDTO);
        updatedItem.setId(existingItem.getId());
        updatedItem.setCreatedAt(existingItem.getCreatedAt());
        
        InventoryItem savedItem = itemRepository.save(updatedItem);
        return convertToDTO(savedItem);
    }
    
    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new EntityNotFoundException("Inventory item not found with id: " + id);
        }
        itemRepository.deleteById(id);
    }
    
    private InventoryItemDTO convertToDTO(InventoryItem item) {
        InventoryItemDTO dto = new InventoryItemDTO();
        BeanUtils.copyProperties(item, dto);
        
        if (item.getCategory() != null) {
            dto.setCategoryId(item.getCategory().getId());
            dto.setCategoryName(item.getCategory().getName());
        }
        
        if (item.getSupplier() != null) {
            dto.setSupplierId(item.getSupplier().getId());
            dto.setSupplierName(item.getSupplier().getName());
        }
        
        if (item.getLastOrdered() != null) {
            dto.setLastOrdered(item.getLastOrdered().format(DATE_FORMATTER));
        }
        
        if (item.getCreatedAt() != null) {
            dto.setCreatedAt(item.getCreatedAt().toString());
        }
        
        if (item.getUpdatedAt() != null) {
            dto.setUpdatedAt(item.getUpdatedAt().toString());
        }
        
        return dto;
    }
    
    private InventoryItem convertToEntity(InventoryItemDTO dto) {
        InventoryItem entity = new InventoryItem();
        BeanUtils.copyProperties(dto, entity);
        
        if (dto.getCategoryId() != null) {
            InventoryCategory category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + dto.getCategoryId()));
            entity.setCategory(category);
        }
        
        if (dto.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                    .orElseThrow(() -> new EntityNotFoundException("Supplier not found with id: " + dto.getSupplierId()));
            entity.setSupplier(supplier);
        }
        
        if (dto.getLastOrdered() != null && !dto.getLastOrdered().isEmpty()) {
            entity.setLastOrdered(LocalDate.parse(dto.getLastOrdered(), DATE_FORMATTER));
        }
        
        return entity;
    }
}
