package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
public class UserWeb {
    private final UserService service;

    public UserWeb(UserService service) {
        this.service = service;
    }

    @PostMapping("/users")
    public ResponseEntity<?> newUser(@RequestBody UserDTO user) {
        try {
            return ResponseEntity.ok().body(service.createUser(user));
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>("Length of the username must be <= 255", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("users/hugo")
    public ResponseEntity<String> hugo() {
        return ResponseEntity.ok().body("Hugo Boss");
    }

    @PutMapping("/users")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO user) {
        try {
            return ResponseEntity.ok().body(service.updateUser(user));
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>("Length of the username must be <= 255", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/rooms/{roomId}/users")
    public ResponseEntity<Collection<UserDTO>> getAllUsers(@PathVariable("roomId") String roomId) {
        return ResponseEntity.ok().body(service.getUsers(roomId));
    }

    @PatchMapping("/rooms/{roomId}/active/{userId}")
    public ResponseEntity<Void> setUserActive(@PathVariable("userId") String id, @PathVariable("roomId") String roomId) {
        try {
            service.setUserActive(id, roomId);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
        }

    }
}
