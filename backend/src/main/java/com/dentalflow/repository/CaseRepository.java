
package com.dentalflow.repository;

import com.dentalflow.model.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaseRepository extends JpaRepository<Case, Long> {
    List<Case> findByStatus(String status);
    List<Case> findByPatientId(Long patientId);
    List<Case> findByDentistId(Long dentistId);
    List<Case> findByDentistIdAndStatus(Long dentistId, String status);
}
