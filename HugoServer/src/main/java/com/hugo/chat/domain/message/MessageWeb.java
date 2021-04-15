package com.hugo.chat.domain.message;

import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/rooms/{roomId}/messages")
public class MessageWeb {
    private final MessageService service;

    public MessageWeb(MessageService service) {
        this.service = service;
    }

    @GetMapping("/latest")
    public ResponseEntity<Collection<MessageDTO>> getOldMessages(@PathVariable("roomId") String roomId, @RequestParam("amount") int amount) {
        return ResponseEntity.ok().body(service.getOldMessages(amount, roomId));
    }

    @GetMapping("/before/{messageId}")
    public ResponseEntity<Collection<MessageDTO>> getMessagesBeforeMessage(@PathVariable("roomId") String roomId, @PathVariable("messageId") String messageId, @RequestParam("amount") int amount) {
        return ResponseEntity.ok().body(service.getOldMessages(messageId, amount, roomId));
    }

    @PostMapping("")
    public ResponseEntity<?> createMessage(@RequestBody MessageDTO message, @PathVariable("roomId") String roomId) {
        System.out.println("hey i better save that new message " + message.getBody());
        try {
            return ResponseEntity.ok().body(service.createMessage(message, roomId));
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>(i.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
