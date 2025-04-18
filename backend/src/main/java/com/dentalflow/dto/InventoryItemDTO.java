
package com.dentalflow.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemDTO {
    private Long id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    private String description;
    
    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity must be positive")
    private Integer quantity;
    
    @NotNull(message = "Unit price is required")
    @Min(value = 0, message = "Unit price must be positive")
    private BigDecimal unitPrice;
    
    @NotNull(message = "Reorder level is required")
    @Min(value = 0, message = "Reorder level must be positive")
    private Integer reorderLevel;
    
    @NotBlank(message = "Unit is required")
    private String unit;
    
    private Long categoryId;
    private String categoryName;
    
    private Long supplierId;
    private String supplierName;
    
    private String lastOrdered;
    private String createdAt;
    private String updatedAt;
}
