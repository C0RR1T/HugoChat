package com.hugo.chat.model.user.dto;

import com.hugo.chat.model.user.User;

import java.util.UUID;

public class UserDTO {
    private UUID id;
    private String name;

    public UserDTO() {
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof UserDTO) {
            UserDTO dto = (UserDTO) obj;
            return dto.getId().equals(this.getId()) && dto.getName().equals(this.getName());
        }
        return false;
    }

    public UserDTO(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static User toUser(UserDTO user) {
        User u = new User();
        u.setName(user.getName());
        u.setId(user.getId());
        return u;
    }
}
