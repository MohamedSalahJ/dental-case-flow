
package com.dentalflow.repository;

import com.dentalflow.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDentistId(Long dentistId);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByAppointmentDate(LocalDate date);
    List<Appointment> findByDentistIdAndAppointmentDate(Long dentistId, LocalDate date);
    List<Appointment> findByDentistIdAndAppointmentDateBetween(Long dentistId, LocalDate startDate, LocalDate endDate);
    List<Appointment> findByPatientIdAndAppointmentDateBetween(Long patientId, LocalDate startDate, LocalDate endDate);
    List<Appointment> findByCaseId(Long caseId);
}
