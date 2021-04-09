package com.hugo.chat.domain.message;

import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/messages")
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

    @GetMapping("/old")
    public ResponseEntity<?> getLatestMessages(@RequestParam("amount") String amount) {
        try {
            return ResponseEntity.ok().body(service.getOldMessages(amount));
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>("Amount must be positive", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/old/{messageID}")
    public ResponseEntity<?> getAllMessages(@PathVariable("messageID") String messageID, @RequestParam("amount") String amount) {
        try {
            return ResponseEntity.ok().body(service.getOldMessages(messageID, amount));
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>("Amount must be positive", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/new/{messageID}")
    public ResponseEntity<Collection<MessageDTO>> getNewMessages(@PathVariable("messageID") String messageID) {
        try {
            return ResponseEntity.ok().body(service.getNewMessages(messageID));
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
        }
    }
}
