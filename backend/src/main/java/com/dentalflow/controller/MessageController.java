
package com.dentalflow.controller;

import com.dentalflow.dto.ContactDTO;
import com.dentalflow.dto.MessageDTO;
import com.dentalflow.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {
    
    private final MessageService messageService;
    
    @GetMapping("/contacts")
    public ResponseEntity<List<ContactDTO>> getAllContacts() {
        return ResponseEntity.ok(messageService.getAllContacts());
    }
    
    @GetMapping("/case/{caseId}")
    public ResponseEntity<List<MessageDTO>> getMessagesByCaseId(@PathVariable String caseId) {
        return ResponseEntity.ok(messageService.getMessagesByCaseId(caseId));
    }
    
    @PostMapping
    public ResponseEntity<MessageDTO> sendMessage(@Valid @RequestBody MessageDTO messageDTO) {
        return new ResponseEntity<>(messageService.sendMessage(messageDTO), HttpStatus.CREATED);
    }
}
