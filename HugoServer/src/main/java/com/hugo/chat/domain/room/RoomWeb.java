package com.hugo.chat.domain.room;

import com.hugo.chat.model.room.dto.RoomDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/rooms")
public class RoomWeb {
    private final RoomService service;

    public RoomWeb(RoomService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> newRoom(@RequestBody RoomDTO dto, @RequestParam("listed") boolean isListed) {
        try {
            return ResponseEntity.ok().body(service.createRoom(dto, isListed));
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>(i.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<Collection<RoomDTO>> getAllRooms() {
        return ResponseEntity.ok().body(service.getAllRooms());
    }

    @PutMapping
    public ResponseEntity<?> updateRoom(@RequestBody RoomDTO dto) {
        try {
            return ResponseEntity.ok().body(service.updateRoom(dto));
        } catch (NoSuchElementException n) {
            return new ResponseEntity<>(n.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>(i.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
