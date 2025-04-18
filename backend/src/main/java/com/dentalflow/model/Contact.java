
package com.dentalflow.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String role;
    
    @Column
    private String avatar;
    
    @Column
    private String initials;
    
    @Column
    private boolean online;
    
    @Column
    private String lastMessage;
    
    @Column
    private String timestamp;
    
    @Column
    private int unread;
}
