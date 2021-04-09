package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.dto.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserWeb {
    private final UserService service;

    public UserWeb(UserService service) {
        this.service = service;
    }

    @PostMapping("")
    public ResponseEntity<UserDTO> newUser(@RequestBody UserDTO user) {
        return ResponseEntity.ok().body(service.createUser(user));
    }

    @GetMapping("/hugo")
    public ResponseEntity<String> hugo() {
        return ResponseEntity.ok().body("Hugo Boss");
    }

    @GetMapping("")
    public ResponseEntity<Collection<UserDTO>> getActiveUsers() {
        return ResponseEntity.ok().body(service.getUsers());
    }

    @PutMapping("")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO user) {
        try {
            return ResponseEntity.ok().body(service.updateUser(user));
        } catch (NoSuchElementException n) {
            return ResponseEntity.notFound().build();
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
