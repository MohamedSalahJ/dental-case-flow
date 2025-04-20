
package com.dentalflow.service;

import com.dentalflow.model.User;
import com.dentalflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Loading user details for: {}", username);
        
        // Try to find by username first
        User user = userRepository.findByUsername(username)
                .orElse(null);

        // If not found by username, try email
        if (user == null) {
            logger.info("User not found by username, trying email: {}", username);
            user = userRepository.findByEmail(username)
                    .orElseThrow(() -> {
                        logger.error("User not found with username or email: {}", username);
                        return new UsernameNotFoundException("User not found with username or email: " + username);
                    });
        }

        logger.info("User found: {}, role: {}", user.getUsername(), user.getRole());
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()))
        );
    }
}
