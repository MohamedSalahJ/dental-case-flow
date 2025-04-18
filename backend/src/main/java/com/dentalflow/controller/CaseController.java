
package com.dentalflow.controller;

import com.dentalflow.dto.CaseDTO;
import com.dentalflow.service.CaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cases")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CaseController {
    
    private final CaseService caseService;
    
    @GetMapping
    public ResponseEntity<List<CaseDTO>> getAllCases(@RequestParam(required = false) String status) {
        return ResponseEntity.ok(caseService.getAllCases(status));
    }
    
    @GetMapping("/dentist/{dentistId}")
    public ResponseEntity<List<CaseDTO>> getCasesByDentistId(
            @PathVariable Long dentistId,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(caseService.getCasesByDentistId(dentistId, status));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CaseDTO> getCaseById(@PathVariable Long id) {
        return ResponseEntity.ok(caseService.getCaseById(id));
    }
    
    @PostMapping
    public ResponseEntity<CaseDTO> createCase(@Valid @RequestBody CaseDTO caseDTO) {
        return new ResponseEntity<>(caseService.createCase(caseDTO), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CaseDTO> updateCase(@PathVariable Long id, @Valid @RequestBody CaseDTO caseDTO) {
        return ResponseEntity.ok(caseService.updateCase(id, caseDTO));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<CaseDTO> updateCaseStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        if (status == null || status.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(caseService.updateStatus(id, status));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCase(@PathVariable Long id) {
        caseService.deleteCase(id);
        return ResponseEntity.noContent().build();
    }
}
