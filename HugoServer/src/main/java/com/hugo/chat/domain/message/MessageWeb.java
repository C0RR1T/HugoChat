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
        try {
            return ResponseEntity.ok().body(service.createMessage(message));
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("")
    public ResponseEntity<Collection<MessageDTO>> getAllMessages() {
        return ResponseEntity.ok().body(service.getAllMessages());
    }

    @GetMapping("/new/{timestamp}")
    public ResponseEntity<Collection<MessageDTO>> getNewMessages(@PathVariable("timestamp") String timestamp) {
        try {
            return ResponseEntity.ok().body(service.getNewMessages(timestamp));
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
        }
    }
}
