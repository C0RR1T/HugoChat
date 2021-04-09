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
    public ResponseEntity<?> createMessage(@RequestBody MessageDTO message) {
        try {
            return ResponseEntity.ok().body(service.createMessage(message));
        } catch (NoSuchElementException n) {
            return new ResponseEntity<>(n.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>(i.getMessage(), HttpStatus.BAD_REQUEST);
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
}
