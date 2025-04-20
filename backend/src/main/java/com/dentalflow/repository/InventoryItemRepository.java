
package com.dentalflow.repository;

import com.dentalflow.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByCategory_Id(Long categoryId);
    List<InventoryItem> findBySupplier_Id(Long supplierId);
    
    // Fixed query method name to use proper Spring Data JPA syntax
    List<InventoryItem> findByQuantityLessThanEqual(Integer reorderLevel);
    
    // Alternative approach using @Query annotation
    @Query("SELECT i FROM InventoryItem i WHERE i.quantity <= i.reorderLevel")
    List<InventoryItem> findLowStockItems();
}
