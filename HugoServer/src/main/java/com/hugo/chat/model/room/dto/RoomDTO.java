package com.hugo.chat.model.room.dto;

import com.hugo.chat.model.room.Room;

import java.util.UUID;

public class RoomDTO {

    private UUID id;
    private String name;

    public RoomDTO() {}

    public RoomDTO(UUID id, String name) {
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

    public static RoomDTO toDTO(Room room) {
        return new RoomDTO(room.getId(), room.getName());
    }

    public static Room toRoom(RoomDTO dto) {
        return new Room(dto.getId(), dto.getName());
    }
}
