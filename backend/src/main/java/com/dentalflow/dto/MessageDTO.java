
package com.dentalflow.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private String id;
    
    @NotBlank(message = "Sender ID is required")
    private String senderId;
    
    @NotBlank(message = "Receiver ID is required")
    private String receiverId;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    private String caseId;
    private String timestamp;
    private boolean isRead;
}
