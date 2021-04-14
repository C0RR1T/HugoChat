package com.hugo.chat.domain.room;

import com.hugo.chat.model.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    @Query(value = "SELECT r.id FROM Room r WHERE r.name = \"main\"")
    Optional<UUID> getMainRoom();
}
