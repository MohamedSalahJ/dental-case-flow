
package com.dentalflow.service;

import com.dentalflow.dto.ContactDTO;
import com.dentalflow.dto.MessageDTO;
import com.dentalflow.model.Contact;
import com.dentalflow.model.Message;
import com.dentalflow.repository.ContactRepository;
import com.dentalflow.repository.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    
    private final MessageRepository messageRepository;
    private final ContactRepository contactRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public List<ContactDTO> getAllContacts() {
        List<Contact> contacts = contactRepository.findAll();
        return contacts.stream()
                .map(this::convertToContactDTO)
                .collect(Collectors.toList());
    }
    
    public List<MessageDTO> getMessagesByCaseId(String caseId) {
        List<Message> messages = messageRepository.findByCaseId(caseId);
        return messages.stream()
                .map(this::convertToMessageDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        Message message = convertToMessageEntity(messageDTO);
        message.setTimestamp(LocalDateTime.now());
        message.setRead(false);
        
        Message savedMessage = messageRepository.save(message);
        return convertToMessageDTO(savedMessage);
    }
    
    private MessageDTO convertToMessageDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        BeanUtils.copyProperties(message, dto);
        dto.setId(message.getId().toString());
        
        if (message.getTimestamp() != null) {
            dto.setTimestamp(message.getTimestamp().format(DATE_FORMATTER));
        }
        
        return dto;
    }
    
    private Message convertToMessageEntity(MessageDTO dto) {
        Message entity = new Message();
        BeanUtils.copyProperties(dto, entity);
        
        if (dto.getId() != null && !dto.getId().isEmpty()) {
            entity.setId(Long.parseLong(dto.getId()));
        }
        
        return entity;
    }
    
    private ContactDTO convertToContactDTO(Contact contact) {
        ContactDTO dto = new ContactDTO();
        BeanUtils.copyProperties(contact, dto);
        dto.setId(contact.getId().toString());
        return dto;
    }
}
