
package com.dentalflow.controller;

import com.dentalflow.dto.ReportDTO;
import com.dentalflow.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReportController {
    
    private final ReportService reportService;
    
    @GetMapping("/financial")
    public ResponseEntity<ReportDTO> getFinancialReport(
            @RequestParam(defaultValue = "12") int months) {
        return ResponseEntity.ok(reportService.getFinancialReport(months));
    }
}
