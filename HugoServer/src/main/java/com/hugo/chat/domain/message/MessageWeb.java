package com.hugo.chat.domain.message;

import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/rooms/{roomId}/messages")
public class MessageWeb {
    private final MessageService service;

    public MessageWeb(MessageService service) {
        this.service = service;
    }

    @GetMapping("/latest")
    public ResponseEntity<Collection<MessageDTO>> getOldMessages(@PathVariable("roomId") String roomId, @RequestParam("amout") int amount) {
        return ResponseEntity.ok().body(service.getOldMessages(String.valueOf(amount), roomId));
    }

    @GetMapping("/before/{messageId}")
    public ResponseEntity<Collection<MessageDTO>> getMessagesBeforeMessage(@PathVariable("roomId") String roomId, @RequestParam("amount") int amount) {
        return ResponseEntity.ok().body(service.get);
    }
}
