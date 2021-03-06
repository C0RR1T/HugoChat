package com.hugo.chat.model.room;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "rooms")
public class Room {
    public static UUID MAIN_ROOM_ID = UUID.fromString("00000000-0000-0000-0000-000000000000");
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(
                            name = "uuid_gen_strategy_class",
                            value = "org.hibernate.id.uuid.CustomVersionOneStrategy"
                    )
            }
    )
    private UUID id;
    private String name;
    private boolean isListed;

    public Room() {
    }

    public Room(UUID id, String name, boolean isListed) {
        this.id = id;
        this.name = name;
        this.isListed = isListed;
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

    public static UUID getMainRoomId() {
        return MAIN_ROOM_ID;
    }

    public static void setMainRoomId(UUID mainRoomId) {
        MAIN_ROOM_ID = mainRoomId;
    }

    public boolean isListed() {
        return isListed;
    }

    public void setListed(boolean listed) {
        isListed = listed;
    }
}
