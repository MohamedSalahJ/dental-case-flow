
package com.dentalflow.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String senderId;
    
    @Column(nullable = false)
    private String receiverId;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Column
    private String caseId;
    
    @Column(nullable = false)
    private boolean isRead;
    
    @CreationTimestamp
    private LocalDateTime timestamp;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
