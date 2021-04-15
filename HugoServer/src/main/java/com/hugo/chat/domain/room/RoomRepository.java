package com.hugo.chat.domain.room;

import com.hugo.chat.model.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    /**
     * Get the main room
     */
    @Query(value = "SELECT r.id FROM Room r WHERE r.name = 'main'")
    Optional<UUID> getMainRoom();

    /**
     * Check whether a room exists by its name
     */
    boolean existsByName(String name);

    /**
     * Set the main room id to roomId
     * Should be 00000000-0000-0000-0000-000000000000
     */
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE Room SET id = :roomId WHERE name = 'main'")
    void setMainRoom(@Param("roomId") UUID id);
}
