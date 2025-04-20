
package com.dentalflow.service;

import com.dentalflow.config.JwtConfig;
import com.dentalflow.dto.AuthRequestDTO;
import com.dentalflow.dto.AuthResponseDTO;
import com.dentalflow.dto.RegisterRequestDTO;
import com.dentalflow.dto.UserDTO;
import com.dentalflow.model.User;
import com.dentalflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final JwtConfig jwtConfig;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    public AuthResponseDTO register(RegisterRequestDTO registerRequest) {
        logger.info("Processing registration for user: {}", registerRequest.getUsername());
        
        // Check if username or email already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            logger.warn("Username already exists: {}", registerRequest.getUsername());
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            logger.warn("Email already exists: {}", registerRequest.getEmail());
            throw new RuntimeException("Email already exists");
        }
        
        // Create new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Hash the password
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setRole(registerRequest.getRole());
        
        User savedUser = userRepository.save(user);
        logger.info("User saved successfully: {}", savedUser.getUsername());
        
        // Generate JWT token
        String token = jwtConfig.generateToken(savedUser.getUsername(), savedUser.getRole());
        logger.info("JWT token generated for user: {}", savedUser.getUsername());
        
        // Create response
        UserDTO userDto = new UserDTO(
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            savedUser.getFirstName(),
            savedUser.getLastName(),
            savedUser.getRole()
        );
        
        return new AuthResponseDTO(token, userDto);
    }
    
    public AuthResponseDTO login(AuthRequestDTO loginRequest) {
        logger.info("Processing login for user: {}", loginRequest.getUsername());
        
        try {
            // Authenticate user using DaoAuthenticationProvider
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.info("Authentication successful for user: {}", loginRequest.getUsername());
            
            // Find the user to create the response
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseGet(() -> userRepository.findByEmail(loginRequest.getUsername())
                            .orElseThrow(() -> new UsernameNotFoundException("User not found")));
            
            // Generate JWT token
            String token = jwtConfig.generateToken(user.getUsername(), user.getRole());
            logger.info("JWT token generated for user: {}", user.getUsername());
            
            // Create response
            UserDTO userDto = new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
            );
            
            return new AuthResponseDTO(token, userDto);
        } catch (Exception e) {
            logger.error("Authentication failed for user: {}", loginRequest.getUsername(), e);
            throw e;
        }
    }
}
