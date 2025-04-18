
package com.dentalflow.repository;

import com.dentalflow.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByStatus(String status);
    List<Invoice> findByPatientId(Long patientId);
    List<Invoice> findByDentistId(Long dentistId);
    
    @Query("SELECT SUM(i.total) FROM Invoice i WHERE i.status = ?1")
    BigDecimal getTotalAmountByStatus(String status);
    
    @Query("SELECT COUNT(i) FROM Invoice i WHERE i.status = ?1")
    Long getCountByStatus(String status);
    
    @Query("SELECT i FROM Invoice i WHERE i.dueDate < CURRENT_DATE AND i.status = 'unpaid'")
    List<Invoice> findOverdueInvoices();
    
    @Query("SELECT i.dentist.id as dentistId, i.dentist.firstName as firstName, i.dentist.lastName as lastName, COUNT(i) as invoiceCount, SUM(i.total) as totalAmount " +
           "FROM Invoice i GROUP BY i.dentist.id, i.dentist.firstName, i.dentist.lastName ORDER BY COUNT(i) DESC")
    List<Map<String, Object>> getTopDentistsByInvoiceCount();
    
    @Query("SELECT FUNCTION('YEAR', i.issueDate) as year, FUNCTION('MONTH', i.issueDate) as month, SUM(i.total) as total " +
           "FROM Invoice i WHERE i.issueDate >= ?1 GROUP BY FUNCTION('YEAR', i.issueDate), FUNCTION('MONTH', i.issueDate) " +
           "ORDER BY FUNCTION('YEAR', i.issueDate), FUNCTION('MONTH', i.issueDate)")
    List<Map<String, Object>> getMonthlyRevenue(LocalDate startDate);
}
