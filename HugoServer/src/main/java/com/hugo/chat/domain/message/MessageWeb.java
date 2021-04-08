package com.hugo.chat.domain.message;

import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/messages")
public class MessageWeb {
    private MessageService service;

    public MessageWeb(MessageService service) {
        this.service = service;
    }

    @PostMapping("")
    public ResponseEntity<MessageDTO> createMessage(@RequestBody MessageDTO message) {
        return ResponseEntity.ok().body(service.createMessage(message));
    }

    @GetMapping("")
    public ResponseEntity<Collection<MessageDTO>> getAllMessages() {
        return ResponseEntity.ok().body(service.getAllMessages());
    }

    @GetMapping("/new/{id}")
    public ResponseEntity<Collection<MessageDTO>> getNewMessages(@PathVariable("id") String lastMessageID) {
        try {
            return ResponseEntity.ok().body(service.getNewMessages(lastMessageID));
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
        }
    }
}
