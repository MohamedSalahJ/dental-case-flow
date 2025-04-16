
package com.dentalflow.controller;

import com.dentalflow.dto.DentistDTO;
import com.dentalflow.service.DentistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentists")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DentistController {
    
    private final DentistService dentistService;
    
    @GetMapping
    public ResponseEntity<List<DentistDTO>> getAllDentists() {
        return ResponseEntity.ok(dentistService.getAllDentists());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DentistDTO> getDentistById(@PathVariable Long id) {
        return ResponseEntity.ok(dentistService.getDentistById(id));
    }
    
    @PostMapping
    public ResponseEntity<DentistDTO> createDentist(@Valid @RequestBody DentistDTO dentistDTO) {
        return new ResponseEntity<>(dentistService.createDentist(dentistDTO), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DentistDTO> updateDentist(@PathVariable Long id, @Valid @RequestBody DentistDTO dentistDTO) {
        return ResponseEntity.ok(dentistService.updateDentist(id, dentistDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDentist(@PathVariable Long id) {
        dentistService.deleteDentist(id);
        return ResponseEntity.noContent().build();
    }
}
