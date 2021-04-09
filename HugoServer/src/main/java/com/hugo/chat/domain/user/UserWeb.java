package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
public class UserWeb {
    private final UserService service;

    public UserWeb(UserService service) {
        this.service = service;
    }

    @PostMapping("")
    public ResponseEntity<?> newUser(@RequestBody UserDTO user) {
        try {
            return ResponseEntity.ok().body(service.createUser(user));
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>("Length of the username must be <= 255", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/hugo")
    public ResponseEntity<String> hugo() {
        return ResponseEntity.ok().body("Hugo Boss");
    }

    @PutMapping("")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO user) {
        try {
            return ResponseEntity.ok().body(service.updateUser(user));
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException i) {
            return new ResponseEntity<>("Length of the username must be <= 255", HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/active/{userId}")
    public ResponseEntity<Void> setUserActive(@PathVariable("userId") String id) {
        try {
            service.setUserActive(id);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
        }

    }
}
