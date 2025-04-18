
package com.dentalflow.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactDTO {
    private String id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Role is required")
    private String role;
    
    private String avatar;
    private String initials;
    private boolean online;
    private String lastMessage;
    private String timestamp;
    private int unread;
}
