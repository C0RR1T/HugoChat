package com.hugo.chat.domain.message;

import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/messages")
public class MessageWeb {
    private final MessageService service;

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

    @GetMapping("/old/{timestamp}")
    public ResponseEntity<?> getAllMessages(@PathVariable("timestamp") String timestamp, @RequestParam("amount") String amount) {
        try {
            return ResponseEntity.ok().body(service.getOldMessages(timestamp, amount));
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>("Amount must be positive", HttpStatus.BAD_REQUEST);
        }
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
