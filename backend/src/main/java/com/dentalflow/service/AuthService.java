package com.dentalflow.service;

import com.dentalflow.config.JwtConfig;
import com.dentalflow.dto.AuthRequestDTO;
import com.dentalflow.dto.AuthResponseDTO;
import com.dentalflow.dto.RegisterRequestDTO;
import com.dentalflow.dto.UserDTO;
import com.dentalflow.model.User;
import com.dentalflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final JwtConfig jwtConfig;
    private final PasswordEncoder passwordEncoder;
    
    public AuthResponseDTO register(RegisterRequestDTO registerRequest) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
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
        
        // Generate JWT token
        String token = jwtConfig.generateToken(savedUser.getUsername(), savedUser.getRole());
        
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
        // Find user by email or username
        Optional<User> userOptional;
        
        if (loginRequest.getUsername().contains("@")) {
            // If contains @, assume it's an email
            userOptional = userRepository.findByEmail(loginRequest.getUsername());
        } else {
            // Otherwise use as username
            userOptional = userRepository.findByUsername(loginRequest.getUsername());
        }
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }
        
        User user = userOptional.get();
        
        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Generate JWT token
        String token = jwtConfig.generateToken(user.getUsername(), user.getRole());
        
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
    }
}
