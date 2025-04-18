
package com.dentalflow.controller;

import com.dentalflow.dto.AuthRequestDTO;
import com.dentalflow.dto.AuthResponseDTO;
import com.dentalflow.dto.RegisterRequestDTO;
import com.dentalflow.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }
}
