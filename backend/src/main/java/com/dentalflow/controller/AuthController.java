
package com.dentalflow.controller;

import com.dentalflow.dto.AuthRequestDTO;
import com.dentalflow.dto.AuthResponseDTO;
import com.dentalflow.dto.RegisterRequestDTO;
import com.dentalflow.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO registerRequest) {
        logger.info("Registration request received for username: {}", registerRequest.getUsername());
        try {
            AuthResponseDTO response = authService.register(registerRequest);
            logger.info("Registration successful for username: {}", registerRequest.getUsername());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Registration failed for username: {}", registerRequest.getUsername(), e);
            throw e;
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO loginRequest) {
        logger.info("Login request received for username: {}", loginRequest.getUsername());
        try {
            AuthResponseDTO response = authService.login(loginRequest);
            logger.info("Login successful for username: {}", loginRequest.getUsername());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            logger.error("Invalid credentials for username: {}", loginRequest.getUsername());
            throw new RuntimeException("Invalid credentials");
        } catch (UsernameNotFoundException e) {
            logger.error("User not found for username: {}", loginRequest.getUsername());
            throw new RuntimeException("User not found");
        } catch (Exception e) {
            logger.error("Login failed for username: {}", loginRequest.getUsername(), e);
            throw e;
        }
    }
}
