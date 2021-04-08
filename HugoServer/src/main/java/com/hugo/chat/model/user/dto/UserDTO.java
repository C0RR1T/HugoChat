package com.hugo.chat.model.user.dto;

import com.hugo.chat.model.user.User;

import java.util.UUID;

public class UserDTO {
    private UUID id;
    private String username;

    public UserDTO() {
    }

    public UserDTO(UUID id, String username) {
        this.id = id;
        this.username = username;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public static User toUser(UserDTO user) {
        User u = new User();
        u.setName(user.getUsername());
        u.setId(user.getId());
        return u;
    }
}
