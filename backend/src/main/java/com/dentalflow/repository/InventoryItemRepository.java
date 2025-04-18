
package com.dentalflow.repository;

import com.dentalflow.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByCategory_Id(Long categoryId);
    List<InventoryItem> findBySupplier_Id(Long supplierId);
    List<InventoryItem> findByQuantityLessThanEqualToReorderLevel();
}
