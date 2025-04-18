
package com.dentalflow.service;

import com.dentalflow.dto.AuthRequestDTO;
import com.dentalflow.dto.AuthResponseDTO;
import com.dentalflow.dto.RegisterRequestDTO;
import com.dentalflow.dto.UserDTO;
import com.dentalflow.model.User;
import com.dentalflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    
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
        user.setPassword(registerRequest.getPassword()); // In a real app, you'd hash this
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setRole(registerRequest.getRole());
        
        User savedUser = userRepository.save(user);
        
        // Generate JWT token (simplified for demo)
        String token = "jwt-token-" + savedUser.getId();
        
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
        // Find user by username
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid username or password");
        }
        
        User user = userOptional.get();
        
        // Verify password (simplified, in a real app you'd compare hashed passwords)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
        
        // Generate JWT token (simplified for demo)
        String token = "jwt-token-" + user.getId();
        
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
