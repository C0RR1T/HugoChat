package com.hugo.chat.domain.room;

import com.hugo.chat.model.room.dto.RoomDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/rooms")
public class RoomWeb {

    @PostMapping
    public ResponseEntity<RoomDTO> newRoom(@RequestBody RoomDTO dto) {
        return null;
    }

    @GetMapping
    public ResponseEntity<Collection<RoomDTO>> getAllRooms() {
        return null;
    }

}
